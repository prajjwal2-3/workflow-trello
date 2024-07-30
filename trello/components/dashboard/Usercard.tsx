'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import React from 'react';


interface UsercardProps {
  className?: string;
}

const Usercard: React.FC<UsercardProps> = ({ className }) => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <h1 className={className}>
      {user.user?.username}
    </h1>
  );
};

export default Usercard;
