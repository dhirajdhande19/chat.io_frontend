import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import UsersPage from './pages/UsersPage';
import ChatBox from './component/ChatBox';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<ChatBox />} />
      </Routes>
    </Router>
  );
}

export default App;
