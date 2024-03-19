import React from "react";
import style from "./SortButtons.module.scss";
import {ConfigProvider, Radio} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {
    changeSortBy,
    showTicketsByCheap,
    showTicketsByOptimal,
    showTicketsBySpeed
} from "../../store/ticketsSlice/ticketsSlice";
import {RootState} from "../../store/store";

export const SortButtons: React.FC<any> = () => {
    const tickets = useSelector((state: RootState) => state.tickets)
    const dispatch = useDispatch()

    const changeSortHandler = (filterValue: string) => {
        dispatch(changeSortBy(filterValue))
        if (filterValue === 'fastest') {
            dispatch(showTicketsBySpeed())
        } else if (filterValue === 'cheapest') {
            dispatch(showTicketsByCheap())
        } else {
            dispatch(showTicketsByOptimal())
        }
    }

    return (
        <section className={style.buttons}>
            <Radio.Group
                value={tickets.sortBy.name}
                onChange={(e) => changeSortHandler(e.target.value)} size={'middle'}
                buttonStyle={'solid'}
                className={style.wrapper}
            >
                <ConfigProvider
                    theme={{
                        components: {
                            Radio: {
                                colorPrimary: '#2196F3',
                            },
                        },
                    }}
                >
                    {tickets.sortOptions.map(el => {
                        return <Radio.Button key={el.name + el.value}
                                             value={el.name}
                                             className={style.button}
                        >{el.value}</Radio.Button>
                    })}
                </ConfigProvider>
            </Radio.Group>

        </section>
    )
}