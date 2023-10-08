import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BACK_IMAGE } from '../utils/constants';

const GptSearch = () => {
	return (
        <>
        	<div className="fixed -z-10">
				<img className="h-screen w-screen object-cover" src={BACK_IMAGE} alt="logo" />
			</div>
		    <div className=''>
			    <GptSearchBar />
			    <GptMovieSuggestions />
		    </div>
        </>
	);
};

export default GptSearch;
