import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import MainMovieMenu from "./Chakra UI Components/MainMovieMenu";
import Carrousel from "../Carrousel/Chackra UI Components/CarouselHome"
import { useDispatch, useSelector } from "react-redux";
import { getHomeAll } from "../../Redux/actions";
import { useAuth } from "../AuthContext/AuthContext";


export default function Home(){

    const dispatch = useDispatch();
    const { carrousels_home, loading } = useSelector( state => state)
    const {user, logout, loadingUser, read} = useAuth()
        
    useEffect( () =>{ if (!carrousels_home.allCarruselsMovies) dispatch(getHomeAll()) } , [] );

    if(!loading){
        var movieCarrousel = carrousels_home.allCarruselsMovies;
        var SeriesCarrousel = carrousels_home.allCarruselsSeries;

        if(movieCarrousel){
            var topTrendingMovie = movieCarrousel.trending[0];
        }
    }

    if(loadingUser) return null


    return (
        
        <div>
            <NavBar/>
            { loading || !carrousels_home.allCarruselsMovies  ? "Loading" :
            <div>
            <MainMovieMenu
                title={topTrendingMovie.title}
                id={topTrendingMovie.id}
                poster={topTrendingMovie.back_poster}/>
            <Carrousel movies={movieCarrousel.trending}/>
            <Carrousel movies={movieCarrousel.on_theaters}/>
            <Carrousel movies={movieCarrousel.populars}/>
            <Carrousel movies={movieCarrousel.topRated}/>
            <Carrousel movies={movieCarrousel.upComing}/>
            <Carrousel movies={SeriesCarrousel.topRatedSeries}/>
            <Carrousel movies={SeriesCarrousel.latestSeries}/>
            </div>
            }
            <Footer/>
        </div>
    )
}