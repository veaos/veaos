import React, { useContext } from 'react';
import { Request } from '../utils/request';
import { useQuery } from 'react-query';
import Loader from '../components/Loader/Loader';

interface IUser {
  _id: string;
  email: string;
}

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const { data, isFetched } = useQuery('user', () => Request('/users/me'));

  const isAuthenticated = data && isFetched;

  if (!isFetched) {
    return (
      <div className="fixed w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user: data, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  return { ...authContext };
};
