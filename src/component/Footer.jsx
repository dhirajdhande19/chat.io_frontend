

export default function Footer() {
  return (
    <div>
        <div className="info pt-5 sm:pt-1 bg-orange-400 sm:pb-100% sm:grid sm:grid-cols-2 sm:mt-20 sm:px-10">
         <div className="offers sm:mt-10">
            <h1 className="text-lg ">🔹
What Chat.io Offers</h1>
             <ul className="px-5 text-xs sm:text-md mt-2">
                <li>⚡
Real-time messaging using WebSockets</li>
                <li>🟢
Online / Offline status for users</li>
                <li>🔐
Secure authentication with access & refresh tokens</li>
                <li>💬
One-to-one conversations</li>
                <li>📱
Responsive & minimal UI</li>
             </ul>
         </div>
         <div className="works mt-6 sm:mt-10">
            <h1 className="text-lg">🔹 How It Works</h1>
            <ul className="pl-11 pb-5 sm:pb-9 text-xs list-disc">
                <li>Sign up / Log in securely</li>
                <li> See available users and their online status</li>
                <li>Start a chat with any user</li>
                <li>Messages update instantly without refreshing</li>
                <li>Session stays active using refresh tokens</li>
            </ul>
         </div>
       </div>
    </div>
  )
}
