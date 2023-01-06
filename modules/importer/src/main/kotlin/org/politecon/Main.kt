package org.politecon

import com.fasterxml.jackson.dataformat.xml.XmlMapper
import com.neovisionaries.i18n.CountryCode
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import kotlinx.coroutines.async
import kotlinx.coroutines.runBlocking
import mu.KotlinLogging
import org.politecon.model.*
import org.politecon.model.datapoint.BaseDataPoint
import org.politecon.model.datapoint.DataPointValue
import org.politecon.model.datapoint.SubjectDataPoint
import org.politecon.model.datapoint.population.PopulationDataPoint
import org.politecon.persist.DbCollection
import org.politecon.persist.Storage
import org.politecon.sourceadapter.UnRestApi
import org.politecon.util.getResourceAsText
import java.time.LocalDate
import kotlin.system.measureTimeMillis

private val logger = KotlinLogging.logger {}

/**
 * Starting point for application
 *
 * TODO add DI
 */
fun main() {

    printBanner()

     val http = HttpClient(CIO)
    val xmlMapper = XmlMapper()

    val unRestApi = UnRestApi(http = http, mapper = xmlMapper)

    val startDate = LocalDate.of(1900, 1,1)
    val endDate = LocalDate.of(2022, 12,31)

    val elapsed = measureTimeMillis {
        runBlocking {

            //******* Запрос данных **********
            val povertyJob = async {
                unRestApi.fetchCountryData(
                    subjects = setOf(DataSubject.POPULATION_POVERTY),
                    geoDiscriminators = setOf(Area.ALL),
                    units = DataSubject.POPULATION_POVERTY.allowedUnits,
                    startDate = startDate,
                    endDate = endDate
                )
            }

            val energyDataJob = async {
                unRestApi.fetchEnergyData(
                    countries = setOf(CountryCode.RU, CountryCode.US),
                    commodities = setOf(DataSubject.NATURAL_GAS),
                    dataDimensions = setOf(DataDimension.PRODUCTION, DataDimension.IMPORT),
                    startDate = startDate,
                    endDate = endDate
                )
            }

            val energyData = energyDataJob.await()
            val poverty = povertyJob.await()

            val store = Storage()
            store.store(DbCollection.POPULATION, poverty)
            store.store(DbCollection.COMMODITY, energyData)

            val subjectDataPoints: Set<SubjectDataPoint> = store.get(DbCollection.COMMODITY)
            logger.info { subjectDataPoints.joinToString() }

            val popDataPoints: Set<PopulationDataPoint> = store.get(DbCollection.POPULATION, limit = 50)
            logger.info { popDataPoints.joinToString() }

        }
    }

    logger.info("Application finished in $elapsed ms")
}

private fun printBanner() {
    logger.info("\n" + getResourceAsText("/banner.txt"))
}




