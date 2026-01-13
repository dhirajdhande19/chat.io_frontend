import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useParams } from 'react-router-dom';
dayjs.extend(relativeTime);

export default function ChatBox({ chats }) {
  const { id } = useParams();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6">
      <div className="space-y-4 max-w-4xl mx-auto">
        {chats.length > 0 ? (
          chats.map((c) =>
            c.senderId === id ? (
              <div
                key={c._id || crypto.randomUUID()}
                className="flex justify-start"
              >
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm max-w-[70%]">
                  <p>{c.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {dayjs(c.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={c._id || crypto.randomUUID()}
                className="flex justify-end"
              >
                <div className="bg-orange-500 text-white px-4 py-2 rounded-2xl shadow-sm max-w-[70%]">
                  <p>{c.message}</p>
                  <p className="text-xs text-orange-100 mt-1 text-right">
                    {dayjs(c.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            )
          )
        ) : (
          <p className="text-center text-gray-400 mt-20">
            Start the conversation 👋
          </p>
        )}
      </div>
    </div>
  );
}
