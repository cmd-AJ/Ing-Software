import React, { useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  render?: (props: any) => React.ReactNode;
  component?: React.FC<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ render, component: Component, ...rest }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('User'));

  useEffect(() => {
    // Update state if localStorage changes
    const handleStorageChange = () => {
      setUser(localStorage.getItem('User'));
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        user !== null && user.trim() !== '' ? (
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
