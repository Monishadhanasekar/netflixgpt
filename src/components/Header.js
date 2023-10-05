import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
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

	return (
		<div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
			<img src={LOGO} className="w-44" alt="logo" />
			{user && (
				<div className="flex">
					<button onClick={handleSignOut} type="submit" className="bg-red-700 p-4 m-4 text-white ">
						Signout
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
