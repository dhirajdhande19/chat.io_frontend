import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useParams } from 'react-router-dom';
dayjs.extend(relativeTime);

export default function ChatBox({ chats }) {
  const { id } = useParams();
  return (
    <>
      <h2>Your Prev Chats</h2>
      <ul>
        {chats && chats.length > 0 ? (
          chats.map((c) =>
            c.senderId === id ? (
              // incoming messages
              <li
                className="bg-blue-400 text-white p-1"
                key={c._id || crypto.randomUUID()}
              >
                {c.message} - {dayjs(c.createdAt).fromNow()}
              </li>
            ) : (
              // my messages
              <li
                className="bg-emerald-400 text-white p-1"
                key={c._id || crypto.randomUUID()}
              >
                {c.message} - {dayjs(c.createdAt).fromNow()}
              </li>
            )
          )
        ) : (
          <p>Start the convo ?</p>
        )}
      </ul>
    </>
  );
}
