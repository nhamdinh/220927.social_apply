import styles from "./profileBar.module.scss";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { IMG_NO_AVATAR, IMG_NO_COVER } from "./../../const";
import { AuthContext } from "../../context/AuthContext";
export default function ProfileBar() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const USERS_FOLDER = process.env.REACT_APP_USERS_FOLDER;
    const { user } = useContext(AuthContext);
    const username = useParams().username;
    const [userFetch, setUserFetch] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUserFetch(res.data);
        };
        /* console.log("1--", user.username);
        console.log("2--", username); */
        if (user.username !== username) {
            fetchUser();
        } else {
            setUserFetch(user);
        }
    }, [username]);
    return (
        <div className={styles.profile__bar}>
            <div className={styles.images}>
                <img
                    className={styles.images__background}
                    src={
                        userFetch.coverPicture
                            ? USERS_FOLDER + userFetch.coverPicture
                            : PUBLIC_FOLDER + IMG_NO_COVER
                    }
                    alt={IMG_NO_COVER}
                />
                <img
                    className={styles.images__user}
                    src={
                        userFetch.profilePicture
                            ? USERS_FOLDER + userFetch.profilePicture
                            : PUBLIC_FOLDER + IMG_NO_AVATAR
                    }
                    alt={IMG_NO_AVATAR}
                />
            </div>

            <div className={styles.info}>
                <div className={styles.info__name}>{userFetch.username}</div>
                <div className={styles.info__desc}>{userFetch.desc}</div>
            </div>
        </div>
    );
}
