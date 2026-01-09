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
    <>
      <h1>All Users / Friends</h1>

      {error && <p className="text-red-500 text-xl">{error}</p>}

      {allUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {allUsers.map((u) => (
            <li key={u._id}>
              {u.name} <br />
              <img height={150} src={u.imageUrl} alt="user-pfp" />
              <button
                className="bg-sky-500 hover:bg-sky-700 text-white cursor-pointer p-1 border-r-4"
                onClick={() => navigate(`/users/${u._id}`)}
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
