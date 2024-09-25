import React, { useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  render?: (props: any) => React.ReactNode;
  component?: React.FC<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ render, component: Component, ...rest }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('User'));

  useEffect(() => {
    // Handle changes to localStorage in the current tab
    const handleStorageChange = () => {
      setUser(localStorage.getItem('User'));
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Optional: trigger this event when localStorage changes within this tab
    window.addEventListener('localStorageChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChanged', handleStorageChange);
    };
  }, []);

  // Ensure localStorage is directly checked
  const currentUser = localStorage.getItem('User');

  return (
    <Route
      {...rest}
      render={props =>
        currentUser !== null && currentUser.trim() !== '' ? (
          render ? (
            render(props)
          ) : Component ? (
            <Component {...props} />
          ) : null
        ) : (
          <Redirect to="/about" />
        )
      }
    />
  );
};

export default ProtectedRoute;
