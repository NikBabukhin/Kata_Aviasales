import {configureStore} from '@reduxjs/toolkit'
import {filterSlice} from "./filtersSlice/filtersSlice";
import {ticketsSlice} from "./ticketsSlice/ticketsSlice";
import {useDispatch} from 'react-redux';

export const store = configureStore({
    reducer: {
        tickets: ticketsSlice.reducer,
        filter: filterSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
