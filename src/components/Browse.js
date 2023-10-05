import React from 'react';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useNowplayingMovies from '../hooks/useNowPlayingMovies';

const Browse = () => {
	useNowplayingMovies();

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
