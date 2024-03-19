import React from "react";
import style from './Checkbox.module.scss';
import {AllFilterNamesType} from "../../../store/filtersSlice/filtersSlice";

type CheckBoxPropsType = {
    label: string,
    filterName: AllFilterNamesType,
    isChecked: boolean,
    changeFilter: (filterValue: boolean)=>void,
}

export const Checkbox: React.FC<CheckBoxPropsType> = ({label, isChecked, changeFilter}) => {
    const onChangeHandler = (isChecked: boolean) => {
        changeFilter(isChecked)
    }

    return <label className={style.container}>
        <span className={style.text}>{label || ''}</span>
        <input type="checkbox" checked={isChecked} onChange={event=>onChangeHandler(event.target.checked)}/>
        <span className={style.checkmark}></span>
    </label>
}