import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';
import { ThreeDots } from 'react-loader-spinner'; // Import the ThreeDots spinner

const GptMovieSuggestions = () => {
	const gpt = useSelector((store) => store.gpt);
	const { movieResults, movieNames } = gpt;
	const isLoading = useSelector((store) => store.gpt.isLoading);

	if (isLoading) {
		// Render the loading spinner while waiting for data
		return (
			<div className="p-4 m-4 bg-black text-white bg-opacity-90">
				<div className="flex justify-center items-center h-16">
					<ThreeDots color="#ffffff" height={40} width={40} />
				</div>
			</div>
		);
	}

	if (!Array.isArray(movieNames)) {
		return null; // Handle the case where movieNames is not an array
	}

	return (
		<div className="p-4 m-4 bg-black text-white bg-opacity-90">
			<div>
				{movieNames.map((movieName, index) => (
					<MovieList key={movieName} title={movieName} movies={movieResults[index]} />
				))}
			</div>
		</div>
	);
};

export default GptMovieSuggestions;
