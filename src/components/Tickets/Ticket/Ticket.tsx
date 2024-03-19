import React from "react";
import style from './Ticket.module.scss';
import {TicketHeader} from "./TicketHeader/TicketHeader";
import {FlightRoute} from "./FlightRoute/FlightRoute";

type TicketPropsType = {
    price: number,
    carrier: string,
    departure: {
        origin: string,
        destination: string,
        date: string,
        duration: number,
        stops: string[]
    },
    arrival: {
        origin: string,
        destination: string,
        date: string,
        duration: number,
        stops: string[]
    }
}

export const Ticket:React.FC<TicketPropsType> = ({price, carrier, departure, arrival}) => {
    const arriveTarget = (stringDate: string, minutes: number) => {
        const millisec = (new Date(stringDate)).getTime()
        return new Date(millisec+(minutes*60000))
    }

    return <section className={style.ticketWrapper}>
        <TicketHeader companyLogo={`http://pics.avs.io/99/36/${carrier}.png`} price={price}/>
        <FlightRoute departure={departure.origin}
                     departureTime={new Date(departure.date)}
                     flightDuration={departure.duration}
                     destination={departure.destination}
                     destinationTime={arriveTarget(departure.date, departure.duration)}
                     transfers={departure.stops}/>
        <FlightRoute departure={arrival.origin}
                     departureTime={new Date(arrival.date)}
                     flightDuration={arrival.duration}
                     destination={arrival.destination}
                     destinationTime={arriveTarget(arrival.date, arrival.duration)}
                     transfers={arrival.stops}/>
    </section>
}