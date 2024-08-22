import React, { useEffect } from 'react';
import useUser from '../lib/useUser';
import { useNavigate } from 'react-router-dom';

interface IProtedctedPageProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtedctedPageProps) {
  const { user, isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate('/');
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
  return <>{children}</>;
}
