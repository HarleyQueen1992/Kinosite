import React from 'react';
import s from './YearsList.module.css'
import { NavLink } from "react-router-dom";

const YearsList = (props) => {

    let yearsList = [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,
                     2009,2008,2007,2006,2005,2004,2003,2002,2001,2000]
    return (
        <div className={s.yearsList} >
            {yearsList.map((year) => <NavLink key={year} to={'/films/?movieYear=' + year} className={s.year + ' ' + (parseInt(props.activeYear) === year && s.yearActive)} datayears={year}  >{year}</NavLink> )}
        </div>
    )
}

export default YearsList;