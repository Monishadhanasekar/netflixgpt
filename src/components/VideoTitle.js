import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const VideoTitle = ({ title, overview, date }) => {
	const [ isFullscreen, setIsFullscreen ] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const trailerVideo = useSelector((store => store.movies?.trailerVideo));

	const handlePlayClick = () => {
		setIsFullscreen(true);
	};

	const handleCloseClick = () => {
		setIsFullscreen(false);
	};

	const handleMoreInfoClick = () => {
		setIsModalOpen(true);
	};
	
	const closeInfoModal = () => {
		setIsModalOpen(false);
	};

	if (isFullscreen) {
		return (
			<div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black">
				<iframe
					className="w-screen h-screen"
					src={'https://www.youtube.com/embed/' + trailerVideo?.key + "?&autoplay=1&mute=0"}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				/>
				<button
					className="absolute top-4 right-4 bg-white text-black py-2 px-4 mr-4 text-lg rounded-lg hover:bg-opacity-80"
					onClick={handleCloseClick}
				>
					Close
				</button>
			</div>
		);
	}
	if (isModalOpen) {
		return (
		  <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-opacity-75 backdrop-blur-md">
			<div className="bg-black p-4 rounded-lg w-96 text-white">
			  <h1 className="text-2xl font-bold">{title}</h1>&nbsp;
			  <p className="text-m">Release Date: {date}</p>&nbsp;
			  <p className="text-m">{overview}</p>&nbsp;
			  <button
				className="bg-white text-red-700 py-2 px-4 text-lg rounded-lg hover:bg-opacity-80 mt-4"
				onClick={closeInfoModal}
			  >
				Close
			  </button>
			</div>
		  </div>
		);
	  }


	return (
		<div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
			<h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
			<p className="hidden md:inline-block py-6 text-m w-1/4">{overview}</p>
			<div className="my-4 md:m-0">
				<button
					className="bg-white text-black py-1 md:py-4 px-3 p-3 md:px-10 text-lg rounded-lg hover:bg-opacity-80"
					onClick={handlePlayClick}
				>
					Play
				</button>
				<button onClick={handleMoreInfoClick} className="hidden md:inline-block mx-2 bg-gray-500 text-white p-3 px-10 text-lg rounded-lg hover-bg-opacity-80">
					More Info
				</button>
			</div>
		</div>
	);
};

export default VideoTitle;
