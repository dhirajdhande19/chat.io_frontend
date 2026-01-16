import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import UsersPage from './pages/UsersPage';
import ChatPage from './component/ChatPage';
import AuthPage from './component/AuthPage';
import AuthSuccess from './component/AuthSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authsuccess" element={<AuthSuccess />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
