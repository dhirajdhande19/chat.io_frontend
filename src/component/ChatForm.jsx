import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function ChatForm({
  socket,
  id,
  isOnline,
  error,
  setError,
  setChats,
}) {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    const extractUserInfo = async () => {
      const user = await api.get(`/users/${id}`);
      setUser(user.data);
    };

    extractUserInfo();
  }, [id]);

  const sendMessage = (e) => {
    e.preventDefault();
    setError('');
    if (!message) {
      console.error('error: ', "Message field can't be empty!");
      setError("Message can't be empty!");
      return;
    }

    // send-receive messages
    //console.log({ message, receiverId: id });
    socket.emit('chat message', { message, receiverId: id });

    // optimistic update
    setChats((prev) => [
      ...prev,
      { message, receiverId: id, senderId: 'me', createdAt: new Date() },
    ]);

    setMessage('');
    setError('');
  };

  return (
    <>
      <h1>
        ur chatting with -{' '}
        <span className="text-xl text-purple-500">{user.name}</span>
      </h1>
      {error ? <p className="text-red-500 text-xl">{error}</p> : null}
      {isOnline ? (
        <p className="text-green-400">Online</p>
      ) : (
        <p className="text-shadow-neutral-400">Offline</p>
      )}
      <form onSubmit={sendMessage}>
        <textarea
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage(e);
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="message"
          value={message}
          placeholder="Enter message"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
