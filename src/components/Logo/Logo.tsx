import style from "./Logo.module.scss";
import plane from "../../assets/images/plane.svg";
import planet from "../../assets/images/planet.svg";
import React from "react";


export const Logo:React.FC = () => {
    return <div className={style.logo}>
        <div className={style.wrapper}>
            <img src={plane} className={style.plane} width={40} height={40} alt={'plane'}/>
            <img src={planet} width={70} height={70} className={style.planet} alt={'planet'}/>
        </div>
    </div>
}
