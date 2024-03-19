import React from "react";
import {Spin} from "antd";
import style from './LoadingSpin.module.scss';

export const LoadingSpin:React.FC = () => {

    return <div className={style.wrapper}>
        <Spin size="large" />
    </div>
}