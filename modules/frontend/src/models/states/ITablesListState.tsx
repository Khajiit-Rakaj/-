import {ITableListEntityModel} from "../ITableListEntityModel";
import {IFetchableState} from "./IFetchableState";

export interface ITablesListState extends IFetchableState{
    tables: ITableListEntityModel[]
    activeTable?: string
}

export const initialState : ITablesListState = {
    loading: false,
    tables: [],
    
}