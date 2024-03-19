import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchSearchId, getTickets} from "./ticketsActions";

type SortOptionType = { name: string, value: string }
type TicketFromServerType = {
    price: number,
    carrier: string,
    segments: {
        origin: string,
        destination: string,
        date: string,
        duration: number,
        stops: string[],
    }[]
}

export type TicketsSliceStateType = {
    isLoading: boolean,
    error: { message: string | null, isError: boolean, title: string, count: number },
    sortBy: SortOptionType,
    sortOptions: SortOptionType[],
    tickets: TicketFromServerType[],
    ticketsForShow: TicketFromServerType[],
    searchId: string,
    isAllTickets: boolean,
    ticketsCount: number,
}
const initialState: TicketsSliceStateType = {
    isLoading: false,
    error: {message: null, isError: false, title: '', count: 0},
    sortBy: {name: 'optimal', value: 'Оптимальный'},
    sortOptions: [
        {name: 'fastest', value: 'Самый быстрый'},
        {name: 'cheapest', value: 'Самый дешевый'},
        {name: 'optimal', value: 'Оптимальный'},
    ],
    tickets: [],
    ticketsForShow: [],
    searchId: '',
    isAllTickets: false,
    ticketsCount: 5,
}

type ResponseFromServerWithTicketsType = {
    tickets: TicketFromServerType[],
    stop: boolean
}
export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        changeSortBy: (state, action: PayloadAction<SortOptionType['name']>) => {
            state.sortBy = state.sortOptions.find(el => el.name === action.payload) || {
                name: 'fastest',
                value: 'Самый быстрый'
            }
        },
        showTicketsByCheap: state => {
            const tickets = [...state.tickets]
            state.ticketsForShow = tickets.sort((ticketPrev, ticketNext) => ticketPrev.price - ticketNext.price)
        },
        showTicketsBySpeed: state => {
            const tickets = [...state.tickets]
            state.ticketsForShow = tickets.sort((ticketPrev, ticketNext) => {
                const inFlightPrev = ticketPrev.segments[0].duration + ticketPrev.segments[1].duration
                const inFlightNext = ticketNext.segments[0].duration + ticketNext.segments[1].duration
                return inFlightPrev - inFlightNext
            })
        },
        showTicketsByOptimal: state => {
            state.ticketsForShow = state.tickets
        },
        incrementTicketsCount: state => {
            state.ticketsCount += 5
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchId.fulfilled, (state, action) => {
            state.isLoading = false
            state.error.isError = false
            state.searchId = action.payload
        })
        builder.addCase(fetchSearchId.rejected, (state, action) => {
            state.isLoading = false
            state.error.isError = true
            state.error.message = action.error.message || ''
            state.error.title = 'server error'
            state.error.isError = true
        })
        builder.addCase(fetchSearchId.pending, (state, action) => {
            state.isLoading = true
            state.error.isError = false
        })
        builder.addCase(getTickets.fulfilled, (state, action: PayloadAction<ResponseFromServerWithTicketsType>) => {
            state.tickets = [...state.tickets, ...action.payload.tickets]
            state.error.isError = false
            state.isAllTickets = action.payload.stop
            state.error.count = 0
            state.ticketsForShow = state.tickets
            if (state.sortBy.name === 'fastest') {
                state.ticketsForShow = state.ticketsForShow.sort((ticketPrev, ticketNext) => {
                    const inFlightPrev = ticketPrev.segments[0].duration + ticketPrev.segments[1].duration
                    const inFlightNext = ticketNext.segments[0].duration + ticketNext.segments[1].duration
                    return inFlightPrev - inFlightNext
                })
            } else if (state.sortBy.name === 'cheapest') {
                state.ticketsForShow = state.ticketsForShow.sort((ticketPrev, ticketNext) => ticketPrev.price - ticketNext.price)
            } else if (state.sortBy.name === 'optimal') {
                state.ticketsForShow = state.tickets
            }
        })
        builder.addCase(getTickets.rejected, (state, action) => {
            ++state.error.count
            state.error.isError = true
            state.error.message = action.error.message || ''
            state.error.title = action.error.name || ''
            state.isAllTickets = false
        })
    }
})

export const {
    changeSortBy,
    showTicketsByCheap,
    showTicketsBySpeed,
    showTicketsByOptimal,
    incrementTicketsCount,
} = ticketsSlice.actions