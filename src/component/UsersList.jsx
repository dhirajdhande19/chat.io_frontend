import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { clearToken, getToken } from '../utils/token.js';

export default function UsersList() {
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await api.get('/users');
        setAllUsers(res.data.users);
      } catch (err) {
        setError('Failed to load users');
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const setUserLoginStatus = () => {
      const token = getToken();
      if (token) {
        setIsLoggedin(true);
      }
    };
    setUserLoginStatus();
  }, []);

  //   function isUser(name) {
  //   return user.name === name;
  // }

  const findUser = (e) => {
    setError('');
    e.preventDefault();

    if (!searchName) {
      return setError('Enter a name to search');
    }
    function searchUser(user) {
      return (
        String(user.name).toLowerCase() == String(searchName).toLowerCase()
      );
    }
    const user = allUsers.find(searchUser);
    if (!user) {
      setError('User not found');
      return;
    }
    setSearchUser(allUsers.find(searchUser));
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Page Header */}
      <form className=" search flex mt-3 gap-3 col-span-4 col-start-2 sm:">
        <input
          onKeyDown={(e) => {
            e.key === 'Enter' && findUser;
          }}
          type="text"
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          className="w-42 h-9 rounded-xl border-2 border-orange-500 text-[14px] pl-2 sm:w-110 sm:h-12"
        />
        <div>
          <button onClick={findUser} className="btn sm:h-12 bg-orange-500">
            Search
          </button>
        </div>
        {/* {console.log(searchName)} */}
        {isLoggedin ? (
          <button
            onClick={() => {
              clearToken();
              return navigate('/');
            }}
            className="btn sm:h-12 bg-orange-500"
          >
            LogOut
          </button>
        ) : (
          <button
            onClick={() => {
              return navigate('/');
            }}
            className="btn sm:h-12 bg-orange-500"
          >
            SignUp
          </button>
        )}
      </form>

      <div className="mb-8 ">
        <h1 className="sm:text-4xl mt-4 text-lg font-bold text-gray-900">
          All Users
        </h1>
        <p className="text-gray-500 mt-1">Start a conversation with anyone</p>
      </div>

      {error && (
        <p className="mb-4 text-red-500 text-lg font-medium">{error}</p>
      )}

      {allUsers?.length === 0 ? (
        <div className="text-gray-400 text-center mt-20 text-lg">
          No users found
        </div>
      ) : searchUser == '' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allUsers?.map((u) => (
            <div
              key={u._id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all p-5 flex items-center justify-between"
            >
              {/* Left side (avatar + name) */}

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                  {u.imageUrl ? (
                    <img
                      src={u.imageUrl}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-orange-500 font-bold text-xl">
                      {u.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {u.name}
                  </p>
                  <p className="text-sm text-gray-400">Chat.io user</p>
                </div>
              </div>

              {/* Chat button */}
              <button
                onClick={() => {
                  return navigate(`/users/${u._id}`);
                }}
                className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-medium shadow-sm transition-all"
              >
                Chat
              </button>
            </div>
          ))}
        </div>
      ) : (
        // <h1>Worked</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            key={searchUser._id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all p-5 flex items-center justify-between"
          >
            {/* Left side (avatar + name) */}

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                {searchUser.imageUrl ? (
                  <img
                    src={searchUser.imageUrl}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-orange-500 font-bold text-xl">
                    {searchUser.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {searchUser.name}
                </p>
                <p className="text-sm text-gray-400">Chat.io user</p>
              </div>
            </div>

            {/* Chat button */}
            <button
              onClick={() => {
                return navigate(`/users/${searchUser._id}`);
              }}
              className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-medium shadow-sm transition-all"
            >
              Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
