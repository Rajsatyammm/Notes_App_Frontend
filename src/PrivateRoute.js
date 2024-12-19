// src/PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');

    return (
        // <Login />
        <Route
            {...rest}
            render={(props) =>
                token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
