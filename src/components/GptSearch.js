import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BACK_IMAGE } from '../utils/constants';

const GptSearch = () => {
	return (
		<div>
			<div className="fixed -z-10">
				<img src={BACK_IMAGE} alt="logo" className="absolute top-0 left-0 w-full h-full object-cover" />
			</div>
			<GptSearchBar />
			<GptMovieSuggestions />
		</div>
	);
};

export default GptSearch;
