import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/token';
import { io } from 'socket.io-client';
import api from '../api/axios';
import ChatBox from './ChatBox';
import ChatForm from './ChatForm';

export default function ChatPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = getToken();

  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [error, setError] = useState('');

  if (!token) {
    return navigate('/auth', { replace: true });
  }

  // fetch previous chats
  useEffect(() => {
    const getPrevChats = async () => {
      const res = await api.get(`/chats/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // sort by order oldest -> newest
      const sortedChats = res.data.chats.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setChats(sortedChats);
    };
    getPrevChats();
  }, [id, token]);

  // socket setup
  useEffect(() => {
    const s = io('http://localhost:8000', { auth: { token } });

    s.on('connect', () => {
      console.log('Socket connection established');
      // init chat
      s.emit('chat-init', id);
    });

    s.on('user-status', (data) => {
      if (data.userId === id) {
        setIsOnline(data.online);
      }
    });

    s.on('connect_error', (err) => {
      console.error('error: ', err.message);
      setError(err.message);
    });

    // listen for incoming messages
    s.on('chat message', (data) => {
      setChats((prev) => [...prev, { ...data, createdAt: new Date() }]);
    });

    setSocket(s);

    return () => {
      s.disconnect();
      console.log('Socket connection disconnected');
    };
  }, [id, token]);

  return (
    <>
      <ChatBox chats={chats} />
      <ChatForm
        socket={socket}
        id={id}
        isOnline={isOnline}
        error={error}
        setError={setError}
        setChats={setChats}
      />
    </>
  );
}
