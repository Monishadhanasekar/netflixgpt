import React from 'react';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useNowplayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';

const Browse = () => {
	useNowplayingMovies();
	usePopularMovies();
	useTopRatedMovies();
	useUpcomingMovies();

	return (
		<div>
			<Header />
			<MainContainer />
			<SecondaryContainer />
			Browse
		</div>
	);
};

export default Browse;
