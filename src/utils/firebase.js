// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD6ArWoRyhORH0v3GZCGZEyE44vfVl7Pi4',
	authDomain: 'netflixgpt-531a1.firebaseapp.com',
	projectId: 'netflixgpt-531a1',
	storageBucket: 'netflixgpt-531a1.appspot.com',
	messagingSenderId: '183429559079',
	appId: '1:183429559079:web:b9f660a26e7e8d991f6f02',
	measurementId: 'G-DZREFT1VJV'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
