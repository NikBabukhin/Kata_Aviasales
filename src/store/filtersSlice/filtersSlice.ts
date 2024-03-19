import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterNamesType = 'withoutTransfer' | 'oneTransfer' | 'twoTransfer' | 'threeTransfer'
export type FiltersStateType = {
    personalFilters: { name: FilterNamesType, value: boolean, label: string, transfers: number }[],
    all: boolean,
}

const initialState: FiltersStateType = {
    personalFilters: [
        {name: 'withoutTransfer', label: 'Без пересадок', value: true, transfers: 0},
        {name: 'oneTransfer', label: '1 пересадка', value: true, transfers: 1},
        {name: 'twoTransfer', label: '2 пересадки', value: true, transfers: 2},
        {name: 'threeTransfer', label: '3 пересадки', value: true, transfers: 3},
    ],
    all: true,
}

export type FilterPayloadActionType = {
    filterName: FilterNamesType,
    filterValue: boolean,
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<FilterPayloadActionType>) => {
            state.personalFilters = state.personalFilters.map(el => el.name === action.payload.filterName ? {
                ...el,
                value: action.payload.filterValue
            } : el)
            state.all = state.personalFilters.every((el) => el.value);
        },
        changeAllFilter: (state, action: PayloadAction<boolean>) => {
            state.all = action.payload
            state.personalFilters = state.personalFilters.map(el => ({...el, value: action.payload}))
        }
    }
})

export type AllFilterNamesType = FilterNamesType | 'all'
export const {changeFilter, changeAllFilter} = filterSlice.actions