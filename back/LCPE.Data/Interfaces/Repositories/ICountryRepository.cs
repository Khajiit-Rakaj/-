﻿using LCPE.Data.Queries;
using LCPE.Interfaces.DataModels;

namespace LCPE.Data.Interfaces.Repositories;

public interface ICountryRepository : IBaseRepository<CountryData, CountryQuery>
{
    
}