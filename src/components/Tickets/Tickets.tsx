import React, {useEffect} from "react";
import style from "./Tickets.module.scss";
import {Ticket} from "./Ticket/Ticket";
import {Button, Spin} from "antd";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {getTickets} from "../../store/ticketsSlice/ticketsActions";
import {incrementTicketsCount} from "../../store/ticketsSlice/ticketsSlice";

export const Tickets: React.FC = () => {

    const ticketsArr = useSelector((state: RootState) => state.tickets.ticketsForShow)
    const isAllTickets = useSelector((state: RootState) => state.tickets.isAllTickets)
    const searchId = useSelector((state: RootState) => state.tickets.searchId)
    const ticketsFromServer = useSelector((state: RootState) => state.tickets.tickets)
    const errorCount = useSelector((state: RootState) => state.tickets.error.count)
    const ticketsCount = useSelector((state: RootState) => state.tickets.ticketsCount)
    const transfers = useSelector((state: RootState) => state.filter.personalFilters)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (searchId && !isAllTickets) {
            dispatch(getTickets(searchId))
        }
    }, [searchId, isAllTickets, ticketsFromServer, errorCount, dispatch])


    const showTickets = (maxTickets: number) => {
        const transfersCount = transfers.filter(filter => filter.value).map(el => el.transfers)
        const tickets = []
        const ticketsAfterFiltering = ticketsArr.filter(ticket => {
            const ticketTransfers = {
                departure: ticket.segments[0].stops.length,
                arrive: ticket.segments[1].stops.length,
            }
            return transfersCount.includes(Math.max(ticketTransfers.departure, ticketTransfers.arrive))
        })
        if (ticketsAfterFiltering.length) {
            for (let i = 0; i < maxTickets; i++) {
                tickets.push(<Ticket departure={ticketsAfterFiltering[i].segments[0]}
                                     arrival={ticketsAfterFiltering[i].segments[1]}
                                     price={ticketsAfterFiltering[i].price}
                                     carrier={ticketsAfterFiltering[i].carrier}
                                     key={JSON.stringify(ticketsAfterFiltering[i])}
                />)
            }
        }
        return tickets
    }
    const ticketsForShow = showTickets(ticketsCount)

    return (
        <section className={style.tickets}>
            {!isAllTickets && <Spin/>}
            {ticketsForShow.length ?
                <>{ticketsForShow.length && ticketsForShow}
                    <Button type={'primary'} block className={style.button}
                            onClick={() => dispatch(incrementTicketsCount())}>Показать еще 5 билетов!</Button></>
                : 'Рейсов подходящих под заданные фильтры не найдено'}
        </section>
    )
}