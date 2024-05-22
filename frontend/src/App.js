import React, { useEffect, useState } from "react";
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "./components/MoviesList";
import Header from "./components/Header";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [englishMovies, setEnglishMovies] = useState([]);
    const [nonEnglishMovies, setNonEnglishMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US");
            const data = await response.json();
            setPopularMovies(data.results);
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        if (popularMovies) {
            const english = popularMovies.filter(movie => movie.original_language === 'en');
            const nonEnglish = popularMovies.filter(movie => movie.original_language !== 'en');
            setEnglishMovies(english);
            setNonEnglishMovies(nonEnglish);

            console.log("English Movies:", english);
            console.log("Non-English Movies:", nonEnglish);
        }
    }, [popularMovies]);

    return (
        <>
            <Header />
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link key={movie.id} style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`}>
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie && movie.original_title} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average : ""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    );
};

export default Home;
