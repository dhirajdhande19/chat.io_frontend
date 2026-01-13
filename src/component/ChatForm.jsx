import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function ChatForm({
  socket,
  id,
  error,
  setError,
  isOnline,
  headerOnly = false,
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

    setMessage('');
    setError('');
  };
  if (headerOnly) {
    return (
      <div className="border-b bg-white px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
          <p
            className={`text-sm ${isOnline ? 'text-green-500' : 'text-gray-400'}`}
          >
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t bg-white px-4 py-3">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form
        onSubmit={sendMessage}
        className="flex items-center gap-3 max-w-4xl mx-auto"
      >
        <textarea
          rows={1}
          className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage(e);
            }
          }}
        />

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl">
          Send
        </button>
      </form>
    </div>
  );
}
