import styles from "./login.module.scss";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./../../redux/actions/actions";
import { CircularProgress } from "@material-ui/core";

const Login = ({ authReducer, fetchUser }) => {
  const email = useRef();
  const password = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    fetchUser({
      email: email.current.value,
      password: password.current.value,
    });

  };
  return (
    <div className={styles.loginContainer}>
      <div className={`${styles.grid__1200} ${styles.wide}`}>
        <div className={`${styles.grid__row} `}>
          <div
            className={`${styles.grid__col} ${styles.l__6} ${styles.m__6} ${styles.s__12}`}
          >
            <div className={styles.login__left}>
              <div className={styles.login__left__logo}>bonjour social</div>
              <span className={styles.login__left__slogan}>
                Connect with friends and the world around you on bonjour social.
              </span>
            </div>
          </div>
          <div
            className={`${styles.grid__col} ${styles.l__6} ${styles.m__6} ${styles.s__12}`}
          >
            <form className={styles.login__right} onSubmit={handleClick}>
              <ul className={styles.right__input__list}>
                <li>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className={styles.right__input__item}
                    ref={email}
                  />
                </li>

                <li>
                  <input
                    type="password"
                    minLength={3}
                    ref={password}
                    required
                    className={styles.right__input__item}
                    placeholder="Password"
                  />
                </li>

                <button
                  type="submit"
                  className={styles.right__input__signIn}
                  disabled={authReducer.isFetching}
                >
                  {authReducer.isFetching ? <CircularProgress color="inherit" /> : "Log In"}
                </button>
                <Link to="/register" className={styles.right__input__signUp}>
                  Create a New account
                </Link>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};
const mapActionsToProps = { fetchUser: fetchUser };
export default connect(mapStateToProps, mapActionsToProps)(Login);
