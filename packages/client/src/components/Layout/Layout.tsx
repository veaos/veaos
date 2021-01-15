import React from 'react';
import { Navigation } from '../Navigation/Navigation';

export const Layout = ({ children, isAuthenticated }) =>
  isAuthenticated ? (
    <div className="grid grid-cols-6 min-h-screen w-full">
      <Navigation />
      <div className="col-span-5 bg-gray-50 p-6">{children}</div>
    </div>
  ) : (
    children
  );
