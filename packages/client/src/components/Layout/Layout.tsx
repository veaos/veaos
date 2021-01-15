import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Header } from '../Header/Header';

export const Layout = ({ children, isAuthenticated }) =>
  isAuthenticated ? (
    <div className="grid grid-cols-6 min-h-screen w-full">
      <Navigation />
      <div className="col-span-5 bg-gray-100">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  ) : (
    children
  );
