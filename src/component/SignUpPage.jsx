import { useState } from 'react';
import api, { baseURL } from '../api/axios';
import { setToken } from '../utils/token';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage({ signUpCancel }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const isValidData = (name, email, password) => {
    setError('');
    if (!name) {
      setError('Name is reqired');
      return false;
    } else if (name && name.length < 2) {
      setError('Name length should be > 2');
      return false;
    } else if (!password) {
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

  const registerUser = async (e) => {
    try {
      setError('');
      e.preventDefault();
      if (!isValidData(name, email, password)) return;

      await api.post(`/auth/register`, {
        name: name,
        email: email,
        password: password,
        imageUrl: image,
      });
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
    <div className="shadow-xl transition delay-150 h-auto bg-orange-50 flex justify-center align-center w-[350px] absolute top-40  rounded-2xl md:left-50 lg:left-160">
      <form onSubmit={registerUser}>
        <h1 className="text-center text-2xl mb-10 mt-5">
          Sign<span className="text-orange-600">Up</span>
        </h1>

        <i
          onClick={signUpCancel}
          className="fa-solid fa-xmark cursor-pointer absolute left-75 top-8"
        ></i>
        {error ? <p className="text-red-500 text-center">{error}</p> : null}
        <div className="userImg">
          {/* Preview */}
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-4 w-24 h-24 object-cover rounded-full mx-auto"
            />
          )}

          <div className="flex justify-center">
            {/* Image Upload */}
            <label className="block mb-2 mt-2 ml-11 text-sm font-medium text-gray-700">
              Upload Profile Image
            </label>
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleImageChange}
              className="block ml-10 w-30 text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100 "
            />
          </div>
        </div>

        <div className="input ml-7">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            name="name"
            className="border-2 border-orange-500 rounded-lg pl-2 focus:border-orange-600 w-75 text-base/9 mt-4"
            placeholder="UserName"
            required
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            className="border-2 border-orange-500 rounded-lg pl-2 focus:border-orange-600 w-75 text-base/9 mt-4"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            className="border-2 border-orange-500 rounded-lg pl-2 focus:border-orange-600 w-75 text-base/9 mt-4"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="bg-orange-500 text-red-50 cursor-pointer rounded-lg p-2 w-75 mt-5"
          >
            SignUp
          </button>

          <div className="or flex justify-center mt-2 text-lg">
            <span className="mx-2 text-gray-500">or</span>
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
            src="google-color.png"
            alt="google-logo"
            className="w-6 h-6 mt-[8px] ml-2"
          />
        </div>
      </form>
    </div>
  );
}
