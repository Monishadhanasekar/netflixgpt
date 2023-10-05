import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BACK_IMAGE } from '../utils/constants';

const Login = () => {
	const [ issigninForm, setIsSigninForm ] = useState(true);
	const [ message, setMessage ] = useState(null);
	const dispatch = useDispatch();
	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);

	const handleButtonClick = () => {
		const message = checkValidData(email.current.value, password.current.value);
		setMessage(message);
		if (message) return;

		if (!issigninForm) {
			//signup logic
			createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
				.then((userCredential) => {
					const user = userCredential.user;
					updateProfile(user, {
						displayName: name.current.value
					})
						.then(() => {
							const { uid, email, displayName } = auth.currentUser;
							dispatch(
								addUser({
									uid: uid,
									email: email,
									displayName: displayName
								})
							);
						})
						.catch((error) => {
							setMessage(error.message);
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setMessage(errorCode + ' ' + errorMessage);
				});
		} else {
			//signin logic
			signInWithEmailAndPassword(auth, email.current.value, password.current.value)
				.then((userCredential) => {
					const user = userCredential.user;
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setMessage(errorMessage);
				});
		}
	};

	const toggleSigninForm = () => {
		setIsSigninForm(!issigninForm);
	};

	return (
		<div>
			<Header />
			<div className="relative w-screen h-screen">
				<img src={BACK_IMAGE} alt="logo" className="absolute top-0 left-0 w-full h-full object-cover" />
				<div className="absolute inset-0 flex items-center justify-center z-10">
					<form
						onSubmit={(e) => e.preventDefault()}
						className="bg-black bg-opacity-80 p-4 md:p-12 rounded-lg w-full max-w-lg"
					>
						<h1 className="text-cyan-50 font-bold text-2xl p-2 pb-6">
							{issigninForm ? 'Sign In' : 'Sign Up'}
						</h1>
						<div className="text-cyan-50">
							{!issigninForm && (
								<input
									ref={name}
									type="text"
									placeholder="Full Name"
									className="p-2 m-2 w-full bg-zinc-700 rounded-sm"
								/>
							)}
							<input
								ref={email}
								type="text"
								placeholder="Email Address"
								className="p-2 m-2 w-full bg-zinc-700 rounded-sm"
							/>
							<input
								ref={password}
								type="password"
								placeholder="Password"
								className="p-2 m-2 w-full bg-zinc-700 rounded-sm"
							/>
							{message && <p className="text-red-500 font-bold p-2 text-lg">{message}</p>}
							<button
								type="submit"
								onClick={handleButtonClick}
								className="p-2 m-2 w-full bg-red-700 text-cyan-50 rounded-sm"
							>
								{issigninForm ? 'Sign In' : 'Sign Up'}
							</button>
							<div className="flex p-4 text-lg">
								<p onClick={toggleSigninForm} className="text-cyan-50 text-opacity-50 cursor-pointer">
									{issigninForm ? 'New to Netflix? Sign up now' : 'Already registered? Sign In now'}
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
