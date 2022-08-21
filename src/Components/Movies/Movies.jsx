import {React, useEffect, useRef, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import MoviePreview from '../MoviePreview/MoviePreview';
import YearsList from '../YearsList/YearsList';
import s from './Movies.module.css'

const Movies = (props) => {
    
    const lastAbortController = useRef(); 

    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();

    const movieYear = searchParams.get('movieYear')

    const keyWord = props.keyWord


    useEffect(() => {

        if (lastAbortController.current) {
            lastAbortController.current.abort();
        }

        const curAbortController = new AbortController();
        lastAbortController.current = curAbortController;

        if (movieYear) {
            setIsFetching(true)
            fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?page=1&keyword=${props.keyWord}&yearFrom=${movieYear}&yearTo=${movieYear}`, {
                method: 'GET', 
                signal: curAbortController.signal,
                headers: { 
                    'X-API-KEY': 'f942ed61-86af-42a7-bab7-91ccf55fcace', 
                    'Content-Type': 'application/json', 
                }, 
                }) 
                .then(res => res.json()) 
                .then(json => {
                    setMovies(json.items);
                    setTotalPages(json.totalPages);
                    props.setCurrentPage(2)
                    setIsFetching(false);
                }) 
                .catch(err => console.log(err))
        } else {
            setIsFetching(true)
            // controller.abort()
            fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?page=1&keyword=${keyWord}`, {
                method: 'GET',
                signal: curAbortController.signal, 
                headers: { 
                    'X-API-KEY': 'f942ed61-86af-42a7-bab7-91ccf55fcace', 
                    'Content-Type': 'application/json', 
                }, 
                }) 
                .then(res => res.json()) 
                .then(json => {
                    setMovies(json.items);
                    setTotalPages(json.totalPages);
                    props.setCurrentPage(2)
                    setIsFetching(false);
                }) 
                .catch(err => console.log(err))
        }
    }, [keyWord, movieYear])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);
        return function () {
          document.removeEventListener("scroll", scrollHandler);
        };
      });

    const scrollHandler = (e) => {

        if (lastAbortController.current) {
            lastAbortController.current.abort();
        }

        const curAbortController = new AbortController();
        lastAbortController.current = curAbortController;

        if ( (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) && !isLoading && props.curruntPage <= totalPages) {
            setIsLoading(true)  
            fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${props.curruntPage}&keyword=${props.keyWord}&yearFrom=${movieYear ? movieYear : '1000'}&yearTo=${movieYear ? movieYear : '3000'}`, {
            method: 'GET', 
            signal: curAbortController.signal, 
            headers: { 
                'X-API-KEY': 'f942ed61-86af-42a7-bab7-91ccf55fcace', 
                'Content-Type': 'application/json', 
            }, 
            }) 
            .then(res => res.json())  
            .then(json => {
                setMovies([...movies, ...json.items]);
                setTotalPages(json.totalPages);
                props.setCurrentPage(props.curruntPage+1);
                setIsLoading(false);
            }) 
            .catch(err => console.log(err))
            }
    };

    return (
        <>
        <YearsList activeYear={movieYear} />
        {isFetching 
        ? ( <div className={s.preloaderBlock} ><span className={s.preloader} > Loading...</span></div>) 
        : (<div className={s.movies} >{movies.map((movie) => <MoviePreview key={movie.kinopoiskId} movie={movie} />)}</div>)}
        </>
    )
}

export default Movies;