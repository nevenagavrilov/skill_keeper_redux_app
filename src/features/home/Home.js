import React from "react";
import classes from "./Home.module.css";
import { useDispatch } from 'react-redux';
import { authActions } from "./authSlice";


const Home = () => {
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(authActions.login());
  };

  return (
    <>
      <section className={classes.home}>
        <h1 className={classes.home}>LOGIN</h1>
        <form>
          <label htmlFor="Username">Username:</label>
          <input type="text" id="Username" name="Username" />
          <label htmlFor="Password">Password:</label>
          <input type="text" id="Password" name="Password" />
          <button type="button" onClick={loginHandler}>LOGIN</button>
        </form>
      </section>
    </>
  );
};

export default Home;
