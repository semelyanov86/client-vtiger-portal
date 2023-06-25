import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/auth/login');
  }, [navigate]);
  return <h1>Welcome to customer portal!</h1>;
};
