import styles from "./register.module.scss";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerCall } from "../../apiCalls";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (password.current.value !== passwordAgain.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            registerCall(user);
            navigate("/login");
        }
    };
    return (
        <div className={styles.registerContainer}>
            <div className={`${styles.grid__1200} ${styles.wide}`}>
                <div className={`${styles.grid__row} `}>
                    <div
                        className={`${styles.grid__col} ${styles.l__6} ${styles.m__5} ${styles.s__12}`}
                    >
                        <div className={styles.register__left}>
                            <div className={styles.register__left__logo}>
                                bonjour social
                            </div>
                            <span className={styles.register__left__slogan}>
                                Connect with friends and the world around you on
                                bonjour social.
                            </span>
                        </div>
                    </div>
                    <div
                        className={`${styles.grid__col} ${styles.l__5} ${styles.m__5} ${styles.s__12}`}
                    >
                        <form
                            onSubmit={handleClick}
                            className={styles.register__right}
                        >
                            <ul className={styles.right__input__list}>
                                <li>
                                    <input
                                        required
                                        type="text"
                                        className={styles.right__input__item}
                                        placeholder="Username"
                                        ref={username}
                                    />
                                </li>
                                <li>
                                    <input
                                        required
                                        type="text"
                                        className={styles.right__input__item}
                                        placeholder="Email"
                                        ref={email}
                                    />
                                </li>
                                <li>
                                    <input
                                        required
                                        type="password"
                                        className={styles.right__input__item}
                                        placeholder="Password"
                                        ref={password}
                                    />
                                </li>
                                <li>
                                    <input
                                        required
                                        type="password"
                                        className={styles.right__input__item}
                                        placeholder="Re-Password"
                                        ref={passwordAgain}
                                        minLength={3}
                                    />
                                </li>
                                <button
                                    type="submit"
                                    className={styles.right__input__signUp}
                                >
                                    sign Up
                                </button>
                                <Link
                                    to="/login"
                                    className={styles.right__input__signIn}
                                >
                                    Login to account
                                </Link>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
