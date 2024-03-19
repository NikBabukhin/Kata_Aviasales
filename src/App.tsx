import React, {useEffect} from 'react';
import style from './App.module.scss';
import {Checkboxes} from "./components/Checkboxes/Checkboxes";
import {SortButtons} from "./components/SortButtons/SortButtons";
import {Tickets} from "./components/Tickets/Tickets";
import {Logo} from "./components/Logo/Logo";
import {fetchSearchId} from "./store/ticketsSlice/ticketsActions";
import {RootState, useAppDispatch} from "./store/store";
import {useSelector} from "react-redux";
import {LoadingSpin} from "./components/Loading/LoadingSpin";

export const App = () => {
    const dispatch = useAppDispatch()
    const searchId = useSelector<RootState>(state => state.tickets.searchId)

    useEffect(() => {
        dispatch(fetchSearchId())
    }, [dispatch])

    return (
        <div className={style.app}>
            <Logo/>
            {(!searchId) ? <LoadingSpin/> :
                <>
                    <div className={style.control}>
                        <Checkboxes/>
                    </div>
                    <div className={style.payload}>
                        <SortButtons/>
                        <Tickets/>
                    </div>
                </>
            }
        </div>
    );
}

