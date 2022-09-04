import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './MoviePreview.module.css'

const MoviePreview = (props) => {
    let rating = props.movie.ratingImdb ? props.movie.ratingImdb : props.movie.ratingKinopoisk
    return (
        <div className={s.moviePreviewContainer} >
            <div className={s.movies} >
                <div className={s.movie} >
                    <div className={s.movieCoverInner} >
                            <img className={s.movieCover} src={props.movie.posterUrl} alt="posterUrl" />
                            <NavLink to={'/film/' + props.movie.kinopoiskId } className={s.movieCoverDarkened} ></NavLink> 
                    </div>
                                 
                
                    <div className={s.movieInfo} >
                        <div className={s.movieTitle} >{props.movie.nameRu}</div>
                        <div className={s.movieCategory} >{props.movie.genres.map((genre, index) => (index > 0 ? ', ' : ' ') + genre.genre)}</div>
                        <div className={s.movieAverage  + " " + (
                        rating > 7.5 
                        ? s.movieAverageGreen 
                        : rating > 5 
                            ? s.movieAverageYellow 
                            : s.movieAverageRed ) } >
                        {rating}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MoviePreview;    