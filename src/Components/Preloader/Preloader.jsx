import React from 'react'
import s from './Preloader.module.css'

const Preloader = (props) => {
    return (
        <div className={s.preloaderBlock} >
            <span className={s.preloader} > Loading...</span>
        </div>
    )
}

export default Preloader;