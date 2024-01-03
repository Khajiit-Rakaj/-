import styles from "./Table.module.css"
import DataTable, {TableColumn} from "react-data-table-component"
import DATA from "../../data/corp_finance.json"
import {CorporationFinancials} from "../../types/types"
import React, {useEffect} from "react";
import TableList from "./TableList";
import {useAppSelector} from "../../store/store";
import { buildTableColumnConfig } from "../../utillites/table/tableColumnConfigBuilder";
import {buildTableObject} from "../../utillites/table/tableObjectBuilder";

const columns: TableColumn<CorporationFinancials>[] = [
    {
        name: "Title",
        selector: (row) => row.corporation_name,
        sortable: true,
        reorder: true,
        width: "70px",
    },
    {
        name: "Year",
        selector: (row) => row.year,
        sortable: true,
        reorder: true,
        width: "80px",
    },
    {
        compact: true,
        name: "Currency",
        reorder: true,
        selector: (row) => row.currency,
        sortable: true,
        width: "70px",
    },
    {
        name: "REER",
        selector: (row) => row.real_effective_exchange_rate,
        sortable: true,
        reorder: true,
    },
    {
        name: "NR",
        selector: (row) => row.net_revenue,
        sortable: true,
        reorder: true,
    },
    {
        name: "CPS",
        selector: (row) => row.cost_of_products_sold,
        sortable: true,
        compact: true,
        reorder: true,
        width: "70px",
    },
    {
        name: "GP",
        selector: (row) => row.gross_profit,
        sortable: true,
        reorder: true,
    },
    {
        name: "GM",
        selector: (row) => row.gross_margin,
        sortable: true,
        reorder: true,
    },
    {
        name: "Ebitda",
        selector: (row) => row.ebitda,
        sortable: true,
        reorder: true,
    },
    {
        name: "Ebitda Margin",
        selector: (row) => row.ebitda_margin,
        sortable: true,
        reorder: true,
    },
    {
        name: "NP",
        selector: (row) => row.net_profit,
        sortable: true,
        reorder: true,
    },
    {
        name: "NM",
        selector: (row) => row.net_margin,
        sortable: true,
        reorder: true,
    },
    {
        name: "ITE",
        selector: (row) => row.income_tax_expenses,
        sortable: true,
        reorder: true,
    },
    {
        name: "FC",
        selector: (row) => row.finance_costs,
        sortable: true,
        compact: true,
        reorder: true,
        width: "70px",
    },
    {
        name: "DAA",
        selector: (row) => row.depreciation_and_amortization_of_assets,
        sortable: true,
        reorder: true,
    },
]
const customStyles = {
    headCells: {
        style: {
            paddingLeft: "8px", // override the cell padding for head cells
            paddingRight: "8px",
        },
    },
    cells: {
        style: {
            paddingLeft: "8px", // override the cell padding for data cells
            paddingRight: "8px",
        },
    },
}
const data: any[] = DATA

function Table(): JSX.Element {
    const workTable = useAppSelector((state) => state.workTable);

    console.log(workTable);

    useEffect(() => {
    }, [workTable])

    return (
        <div>
            <table width={"100%"}>
                <tbody>
                <tr>
                    <td>
                        <div>
                            <TableList/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={styles.table}>
                            <DataTable
                                title="Corporation Financials"
                                columns={columns}
                                data={data || []}
                                pagination
                                highlightOnHover
                                customStyles={customStyles}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={styles.table}>
                            <DataTable
                                title={workTable.loading ? 'Fetching' : (workTable.workTable?.name ?? 'Select table')}
                                columns={workTable.workTable && buildTableColumnConfig(workTable.workTable.fields) || []}
                                data={workTable.workTable && buildTableObject(workTable.workTable.values) || []}
                                pagination
                                highlightOnHover
                                customStyles={customStyles}
                            />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table
