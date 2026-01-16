import { useEffect } from 'react';
import { setToken } from '../utils/token';
import { useNavigate } from 'react-router-dom';

export default function AuthSuccess() {
  const navigate = useNavigate();
  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    const token = param.get('token');
    if (token) {
      setToken(token);

      setTimeout(() => {
        return navigate('/users');
      }, 300);
    }
  }, []);

  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}
