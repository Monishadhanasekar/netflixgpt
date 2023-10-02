import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [issigninForm, setIsSigninForm] = useState(true);

    const toggleSigninForm = () =>{
        setIsSigninForm(!issigninForm)
    }
  return (
    <div>
      <Header/>
      <div className='absolute'>
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo"/>
      </div>
      <form className='w-3/12 absolute p-12 bg-black my-40 mx-auto right-0 left-0 bg-opacity-80'>
        <h1 className="text-cyan-50 font-bold text-2xl p-2 pb-6">  {issigninForm ? "Sign In" : "Sign Up"}</h1>
        <div className='text-cyan-50'>
        {!issigninForm && <input type='text' placeholder='Full Name' className='p-2 m-2 w-full bg-zinc-700 rounded-sm'/>}
        <input type='text' placeholder='Email Address' className='p-2 m-2 w-full bg-zinc-700 rounded-sm'/>
        <input type='password' placeholder='Password' className='p-2 m-2 w-full bg-zinc-700 rounded-sm'/>    
        <button type='submit' className='p-2 m-2 w-full bg-red-700 text-cyan-50 rounded-sm'>  {issigninForm ? "Sign In" : "Sign Up"}</button>
        <div className='flex p-4 text-lg'>
        <p onClick={toggleSigninForm} className='text-cyan-50 text-opacity-50 cursor-pointer'> {issigninForm ? "New to Netflix? Sign up now" : "Already registered? Sign In now"}</p>
        </div>
        </div>
      </form>
    </div>
  )
}

export default Login
