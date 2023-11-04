import React from 'react';
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies)
    if(movies == null) return;
    const mainMovie = movies[0];
    console.log("main movie", mainMovie);
    const {original_title, overview, id, release_date} = mainMovie;
	return <div className='pt-[30%] bg-b md:pt-0'>
        <VideoTitle title={original_title} overview={overview} date={release_date}/>
        <VideoBackground movieId={id}/>
    </div>;
};

export default MainContainer;
