import React, {useState} from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import { toggleLoading } from '../utils/gptSlice';

const GptSearchBar = () => {
    const dispatch = useDispatch();
	const langKey = useSelector((store) => store.config.lang);
	console.log('langkey', langKey);
	const searchText = useRef();
    const [isLoading, setIsLoading] = useState(false);

    //search movie in TMDB

    const searchMovieTMDB = async(movie) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        return json.results;
    }

	const handleGptSearchClick = async () => {
		console.log(searchText.current.value);
        dispatch(toggleLoading(true));

		const gptQuery =
			'Act as a Movie Recommendation system and suggest some movies fo the query:' +
			searchText.current.value +
			'. only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Don, Shola, Golmaal, koi Mil Gaya';

		//Make an API call to GPT API and get Movie Results
		const gptResults = await openai.chat.completions.create({
			messages: [ { role: 'user', content: gptQuery } ],
			model: 'gpt-3.5-turbo'
		});
        if(!gptResults.choices){
            
        }
		console.log(gptResults.choices?.[0]?.message?.content);
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

        //For each movie I will search TMDB API
        
        const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));

        const tmdbResults = await Promise.all(promiseArray);
        console.log("tmdbResults", tmdbResults);
        dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
        dispatch(toggleLoading(false));
	};
	return (
		<div className="pt-[50%] md:pt-[10%] flex justify-center">
			<form className="bg-black w-full md:w-1/2 grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
				<input
					ref={searchText}
					type="text"
					className="p-4 m-4 col-span-9"
					placeholder={lang[langKey].gptSearchPlaceholder}
				/>
				<button
					className="py-4 md:py-2 px-2 md:px-4 col-span-3 bg-red-700 text-white rounded-lg m-4"
					onClick={handleGptSearchClick}
				>
					{lang[langKey].search}
				</button>
			</form> 
		</div>
	);
};

export default GptSearchBar;
