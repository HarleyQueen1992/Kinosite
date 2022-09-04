import React from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import s from './Header.module.css'

const Header = (props) => {
    const [searchParams] = useSearchParams();

    const value = searchParams.get('keyWord')
    props.setKeyWord(value ? value : '');

    const navigate = useNavigate();

    const keyWordChange = (e) => {
        props.setKeyWord(e.target.value);
        props.setCurrentPage(1);
        navigate(`/films/?keyWord=${e.target.value}`)
    }
    return (
        <header className={s.header} >
            <NavLink to='/films/' className={s.title} >Kinosite</NavLink>
            <input className={s.searchFilms} onChange={keyWordChange} value={props.keyWord} сtype="text" placeholder='Поиск' />
        </header>
    )
}
export default Header;