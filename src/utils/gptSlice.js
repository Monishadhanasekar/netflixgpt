import { createSlice } from '@reduxjs/toolkit';

const gptSlice = createSlice({
	name: 'gpt',
	initialState: {
		showGptSearch: false,
		gptMovies: null,
		movieNames: null,
		movieResults: null,
		isLoading: false
	},
	reducers: {
		toggleGptSearchView: (state) => {
			state.showGptSearch = !state.showGptSearch;
		},
		addGptMovieResult: (state, action) => {
			const { movieNames, movieResults } = action.payload;
			state.movieNames = movieNames;
			state.movieResults = movieResults;
		},
		toggleLoading: (state, action) => {
			state.isLoading = action.payload;
		}
	}
});

export const { toggleGptSearchView, addGptMovieResult, toggleLoading } = gptSlice.actions;
export default gptSlice.reducer;
