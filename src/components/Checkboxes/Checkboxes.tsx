import React from "react";
import style from "./Checkboxes.module.scss";
import {Checkbox} from "./Checkbox/Checkbox";
import {RootState} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {changeFilter, changeAllFilter} from "../../store/filtersSlice/filtersSlice";

export const Checkboxes: React.FC<any> = () => {
    const filters = useSelector((state: RootState) => state.filter)
    const dispatch = useDispatch()


    return (
        <section className={style.card}>
            <h5 className={style.header}>Количество пересадок</h5>
            <div className={style.checkboxes}>
                <Checkbox label={'Все'} filterName={'all'} isChecked={filters.all} changeFilter={(value: boolean) => {
                    dispatch(changeAllFilter(value))
                }}/>
                {filters.personalFilters.map((el, index) => {
                    const changeFilterValue = (filterValue: boolean) => {
                        dispatch(changeFilter({filterName: el.name, filterValue}))
                    }
                    return <Checkbox
                        key={index + el.toString()}
                        label={el.label}
                        filterName={el.name}
                        isChecked={el.value}
                        changeFilter={changeFilterValue}
                    />
                })}
            </div>
        </section>
    )
}