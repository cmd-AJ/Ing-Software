import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  render?: (props: any) => React.ReactNode; // Optional render prop
  component?: React.FC<any>; // Optional component prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ render, component: Component, ...rest }) => {
  const user = localStorage.getItem('User');
  // const user = '86068068'
  return (
    <Route
      {...rest}
      render={props =>
        user !== null && user.trim() !== '' ? (
          render ? (
            render(props) // Use the render prop if provided
          ) : Component ? (
            <Component {...props} /> // Use the component prop if provided
          ) : null
        ) : (
          <Redirect to="/about" />
        )
      }
    />
  );
};

export default ProtectedRoute;
