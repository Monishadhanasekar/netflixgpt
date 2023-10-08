import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
	console.log('supportedlang', SUPPORTED_LANGUAGES);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
	const handleSignOut = () => {
		signOut(auth).then(() => {}).catch((error) => {
			navigate('/error');
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName } = user;
				dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
				navigate('/browse');
			} else {
				dispatch(removeUser());
				navigate('/');
			}
		});
		// unsubscribe when component unmounts
		return () => unsubscribe();
	}, []);

	const handleGptSearchClick = () => {
		dispatch(toggleGptSearchView());
	};

	const handleLanguageChange = (e) => {
		dispatch(changeLanguage(e.target.value));
	};

	return (
		<div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
			<img src={LOGO} className="w-44" alt="logo" />
			{user && (
				<div className="flex p-2">
					{showGptSearch && (
						<select className="p-2 m-5 bg-gray-900 text-white" onChange={handleLanguageChange}>
							{SUPPORTED_LANGUAGES.map((lang) => (
								<option key={lang.identifier} value={lang.identifier}>
									{lang.name}
								</option>
							))}
						</select>
					)}
					<button
						onClick={handleGptSearchClick}
						className="py-2 px-4 mx-4 my-4 bg-purple-800 text-white rounded-lg"
					>
						{showGptSearch ? 'Home page' : 'GPT search'}
					</button>
					<button onClick={handleSignOut} type="submit" className="bg-red-700 p-4 m-4 text-white ">
						Signout
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
