import { isEditable } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import s from './MovieInformation.module.css'

const MovieInformation = (props) => {

    const [filmInfo, setFilmInfo] = useState(null);
    const [movieAwards, setMovieAwards] = useState(null)

    const params = useParams();

    useEffect(() => {
        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${params.id}/awards`, {
            method: 'GET', 
            headers: { 
                'X-API-KEY': 'f942ed61-86af-42a7-bab7-91ccf55fcace', 
                'Content-Type': 'application/json', 
            }, 
            }) 
            .then(res => res.json()) 
            .then(json => {
                setMovieAwards(json.items);
            }) 
            .catch(err => console.log(err))

        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${params.id}`, {
            method: 'GET', 
            headers: { 
                'X-API-KEY': 'f942ed61-86af-42a7-bab7-91ccf55fcace', 
                'Content-Type': 'application/json', 
            }, 
            }) 
            .then(res => res.json()) 
            .then(json => {
                setFilmInfo(json);
            }) 
            .catch(err => console.log(err))
    }, [])

    return (<>
            {(filmInfo)
            && <div className={s.movieInformation} >
                <h2 className={s.movieTitle} >{filmInfo.nameRu}</h2>
                <h3 className={s.movieTitleEn} >{filmInfo.nameOriginal}</h3>
                <div className={s.posterAndMovieDetail} >
                    <div className={s.moviePoster} >
                        <img className={s.poster} src={filmInfo.posterUrl} alt="poster movie" />
                    </div>
                    <div className={s.movieDetails} >
                        <div className={s.subtitle} >Рейтинги:</div>
                        <div className={s.raitingList} > 
                            <span className={s.raiting} >IMDb: <span className={s.bold} >{filmInfo.ratingImdb}</span> <span className={s.ratingVoteCount} >({filmInfo.ratingImdbVoteCount})</span> </span>  
                            <span className={s.raiting} >КиноПоиск: <span className={s.bold} >{filmInfo.ratingKinopoisk}</span> <span className={s.ratingVoteCount} >({filmInfo.ratingKinopoiskVoteCount})</span> </span> 
                        </div>
                        {movieAwards.length > 0 
                        && 
                        <>
                            <div className={s.subtitle} >Номинации:</div>
                            <div className={s.listNomination} > 
                                {movieAwards.map((award, index) => <div key={index} className={s.nomination} >{award.nominationName}</div>)}
                            </div>
                        </>}
                        <div className={s.subtitle} >Слоган:</div>
                        <div className={s.slogan} >{filmInfo.slogan}</div>
                        <div className={s.subtitle} >Год выхода:</div>
                        <div>{filmInfo.year}</div>
                    
                        <div className={s.subtitle} >Страна:</div>
                        <div className={s.listCountries} >{filmInfo.countries.map((country, index) => <span key={index} >{index != 0 && ', '}{country.country}</span> )}</div>
                    </div>
                </div>
                <div className={s.descriptionMovie} >
                    <h3>Про что сериал «{filmInfo.nameRu}»</h3>
                    <p>{filmInfo.description}</p>
                </div>
            </div>}
        </>)
}

export default MovieInformation;