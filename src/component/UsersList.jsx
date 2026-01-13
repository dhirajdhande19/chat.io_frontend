import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function UsersList() {
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">All Users</h1>
        <p className="text-gray-500 mt-1">Start a conversation with anyone</p>
      </div>

      {error && (
        <p className="mb-4 text-red-500 text-lg font-medium">{error}</p>
      )}

      {allUsers.length === 0 ? (
        <div className="text-gray-400 text-center mt-20 text-lg">
          No users found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allUsers.map((u) => (
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
      )}
    </div>
  );
}
