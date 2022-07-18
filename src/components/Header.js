import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../features/home/authSlice";
import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={classes.header}>
      {isAuth && (
        <ul className={classes.nav}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profiles">Profiles</Link>
          </li>
          <li>
            <Link to="/skills">Skills</Link>
          </li>
          <li>
            <button ><Link to="/" onClick={logoutHandler}>Logout</Link></button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
