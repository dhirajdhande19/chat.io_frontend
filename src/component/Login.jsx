import { useState } from 'react';
import { baseURL } from '../api/axios';
import { setToken } from '../utils/token';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function SignUpPage({ loginCancel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isValidData = (email, password) => {
    setError('');
    if (!password) {
      setError('Password is required');
      return false;
    } else if (password && password.length < 5) {
      setError('Password length should be > 5');
      return false;
    } else if (!email) {
      setError('Email is required');
      return false;
    }

    return true;
  };

  const handleUserLogin = async (e) => {
    try {
      e.preventDefault();
      if (!isValidData(email, password)) return;
      const token = await api.post('/auth/login', {
        email: email,
        password: password,
      });
      setToken(token.data);
      return navigate('/users');
    } catch (e) {
      setError(e?.response?.data?.message);
      console.error(e?.response?.data?.message);
      return;
    }
  };

  return (
    <div className="shadow-xl transition delay-150 h-auto bg-orange-50 flex justify-center w-[350px] absolute top-40 left-8 rounded-2xl md:left-50 lg:left-160">
      <form onSubmit={handleUserLogin}>
        <h1 className="text-center text-2xl mb-10 mt-5">Login</h1>
        <i
          onClick={loginCancel}
          className="fa-solid fa-xmark cursor-pointer absolute left-75 top-8"
        ></i>
        {error ? <p className="text-red-500 text-center">{error}</p> : null}
        <div className="input ml-7">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="border-2 border-orange-500 rounded-lg pl-2 focus:border-orange-600 w-75 text-base/9 mt-4"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="border-2 border-orange-500 rounded-lg pl-2 focus:border-orange-600 w-75 text-base/9 mt-4"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="bg-orange-500 text-red-50 cursor-pointer rounded-lg p-2 w-75 mt-5"
          >
            Login
          </button>

          <div className="or flex justify-center mt-2 text-lg">
            <hr /> or <hr />
          </div>
        </div>

        <div
          onClick={() => {
            window.location.href = `${baseURL}/auth/google`;
          }}
          className="googleLogin cursor-pointer mb-5 mx-7 rounded-2xl border-2 border-gray-300 text-base/9 flex"
        >
          <div className="ml-25 text-gray-600">login with</div>
          <img
            src="../src/assets/google-color.png"
            alt=""
            className="w-6 h-6 mt-[8px] ml-2"
          />
        </div>
      </form>
    </div>
  );
}
