import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const _verifyUser = useSelector((state) => state.userLogin.verifyUser);


    return (
        <Route
            {...restOfProps}
            render={(props) =>
                _verifyUser ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default ProtectedRoute;