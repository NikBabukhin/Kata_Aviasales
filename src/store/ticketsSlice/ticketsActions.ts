import {createAsyncThunk} from "@reduxjs/toolkit";

export const SEARCH_ID_URL = 'https://aviasales-test-api.kata.academy/search'
export const SEARCH_TICKETS = 'https://aviasales-test-api.kata.academy/tickets?searchId='

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async () => {
    const response = await fetch(SEARCH_ID_URL)
        .then(response => response.json())
        .catch((err: Error) => {
            throw new Error(err.message)
        })
    return response.searchId
})


export const getTickets = createAsyncThunk('tickets/getTickets', async (searchId: string) => {
    return await fetch(SEARCH_TICKETS + searchId)
        .then(response => response.json())
        .catch((err: Error) => {
            throw new Error(err.message)
        })
})