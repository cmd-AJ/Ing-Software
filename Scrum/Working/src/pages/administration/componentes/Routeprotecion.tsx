import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  render?: (props: any) => React.ReactNode;
  component?: React.FC<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ render, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // const currentUser = localStorage.getItem('User');
        const currentUser = 'hablitado temporalmente'

        // Check for user in localStorage
        return currentUser !== null && currentUser.trim() !== '' ? (
          render ? (
            render(props)
          ) : Component ? (
            <Component {...props} />
          ) : null
        ) : (
          <Redirect to="/about" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
