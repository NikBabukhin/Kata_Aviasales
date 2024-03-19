import React from "react";
import style from "./TicketHeader.module.scss"

type TicketHeaderPropsType = {
    price: number,
    companyLogo: string
}

export const TicketHeader:React.FC<TicketHeaderPropsType> = ({price, companyLogo}) => {
    const correctPrice = price.toString().split("").reverse().join("")
        .replace(/(\d{3})/g, "$1 ").split("")
        .reverse().join("").replace(/^ /, "");

    return <div className={style.header}>
        <span className={style.headerPrice}>{correctPrice} р </span>
        <img src={companyLogo} alt={'Logo'} height={36} width={110}/>
    </div>
}