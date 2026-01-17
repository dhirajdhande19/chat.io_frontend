import { useState } from 'react';

import SignUpPage from './SignUpPage';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

export default function Content() {
  const [Toggle, setToggle] = useState('false');
  const [Toggle2, setToggle2] = useState('false');
  const navigate = useNavigate();
  const signUp = () => {
    setToggle('true');
    let loginId = document.getElementById('login-btn');
    loginId.disabled = true;
  };
  const signUpCancel = () => {
    setToggle('false');
    let loginId = document.getElementById('login-btn');
    loginId.disabled = false;
  };
  const login = () => {
    setToggle2('true');
    let signUpId = document.getElementById('signUp-btn');
    signUpId.disabled = true;
  };
  const loginCancel = () => {
    setToggle2('false');
    let signUpId = document.getElementById('signUp-btn');
    signUpId.disabled = false;
  };

  return (
    <div className="content">
      <div className="hero md:mr-15 sm:grid sm:grid-cols-4 mt-15 px-5 sm:mt-25 sm:px-10">
        <div className="text md:ml-2 sm:col-span-3">
          <h1 className="text-4xl font-medium sm:text-7xl pb-5 ">Chat.io</h1>
          <p className="sm:max-w-100 md:max-w-180 md:text-lg">
            Real-time, secure messaging built for fast and seamless
            conversations.Connect with friends instantly, see whoʼs online, and
            chat without delays — powered by modern web technologies.{' '}
            <button
              className="p-2 text-white px-7 bg-orange-400 cursor-pointer rounded-lg text-sm"
              onClick={() => {
                return navigate('/users');
              }}
            >
              ALL USERS
            </button>
          </p>
          <div className="btn">
            {Toggle == 'true' ? <SignUpPage signUpCancel={signUpCancel} /> : ''}
            {Toggle2 == 'true' ? <Login loginCancel={loginCancel} /> : ''}

            <button
              id="signUp-btn"
              onClick={signUp}
              className="bg-orange-400 p-2 px-7 disabled:cursor-not-allowed mt-5 cursor-pointer rounded-lg text-sm text-red-50"
            >
              SignUp
            </button>
            <span className="px-2"> or </span>
            <button
              id="login-btn"
              onClick={login}
              className="bg-orange-500 disabled:cursor-not-allowed p-2 px-7 mt-5 rounded-lg cursor-pointer text-sm text-blue-50"
            >
              login
            </button>
          </div>
        </div>
        <div className="logo">
          <img
            src="logo.png"
            alt="logo png error"
            className="h-96 sm:h-70 sm:w-64 md:w-100 md: "
          />
        </div>
      </div>
    </div>
  );
}
