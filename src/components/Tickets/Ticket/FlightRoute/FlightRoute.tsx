import React from "react";
import style from './FlightRoute.module.scss';

type FlightRoutePropsType = {
    departure: string,
    departureTime: Date,
    destination: string,
    destinationTime: Date,
    flightDuration: number,
    transfers: string[],
}

export const FlightRoute:React.FC<FlightRoutePropsType> = ({departure, destination, flightDuration, transfers,departureTime, destinationTime, }) => {
    const fromMinutesTime = (time:number) => {
        const hours = Math.trunc(time/60)
        let minutes:number|string = time - Math.trunc(time/60)*60
        if (minutes<10) {
            minutes = '0'+minutes
        }
        return `${hours}ч ${minutes}м`
    }

    const fromDateToTime = (date: Date) => {
        const minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
        const hours = date.getHours()<10?'0'+date.getHours():date.getHours()
        return `${hours}:${minutes}`
    }
    const transferCount = (transfers:string[]) => {
        if (transfers.length===0) {
            return 'Без пересадок'
        } else if(transfers.length===1) {
            return '1 пересадка'
        } else if(transfers.length>1 && transfers.length<5) {
            return `${transfers.length} пересадки`
        } else {
            return `${transfers.length} пересадок`
        }
    }

    return <div className={style.route}>
        <div className={style.wrapper}>
            <h5 className={style.header}>{departure+' - '+destination}</h5>
            <span className={style.value}>{fromDateToTime(departureTime) + ' - ' + fromDateToTime(destinationTime)}</span>
        </div>
        <div className={style.wrapper}>
            <h5 className={style.header}>в пути</h5>
            <span className={style.value}>{fromMinutesTime(flightDuration)}</span>
        </div>
        <div className={style.wrapper}>
            <h5 className={style.header}>{transferCount(transfers)}</h5>
            {(transfers.length && ' --- ' ) && <span className={style.value}>{transfers.join(', ')}</span>}
        </div>
    </div>
}