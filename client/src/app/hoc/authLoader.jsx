import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUserLoadingStatus, loadUser } from "../store/user";

const AuthLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUserLoadingStatus());
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUser());
        }
    }, [isLoggedIn]);
    if (userStatusLoading) {
        return (<div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
                <div className="lds-dual-ring bg-success rounded"></div>
            </div>
        </div>);
    }
    return children;
};

AuthLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthLoader;
