import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Spinner } from '../../../components/Elements';
import { getToken, isExpired } from '../../../lib/token.ts';

type Props = {
  children: React.ReactNode;
};

const WithAuth = (props: Props) => {
  const { children } = props;
  const [isTokenFetchingActive, setTokenFetchingStatus] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenFetchingActive) {
      const token = getToken();

      if (token && !isExpired(token.timeStamp)) {
        setIsAuthenticated(true);
        setTokenFetchingStatus(false);
      } else {
        navigate('/auth/login');
      }
    }
  }, [isTokenFetchingActive, navigate]);

  const renderContent = () => {
    return isAuthenticated ? children : null;
  };

  return <div>{isTokenFetchingActive ? <Spinner /> : renderContent()}</div>;
};

export default WithAuth;
