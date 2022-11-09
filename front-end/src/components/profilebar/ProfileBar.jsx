import styles from "./profileBar.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { IMG_NO_AVATAR, IMG_NO_COVER } from "./../../const";
import { connect } from "react-redux";
import axios from "axios";
import {API_fetchUserByUsername} from "./../../apiCalls"

const ProfileBar = ({authReducer}) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const USERS_FOLDER = process.env.REACT_APP_USERS_FOLDER;
    const username = useParams().username;
    const [userFetch, setUserFetch] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?username=${username}`);
                setUserFetch(res.data);
            } catch (err) {
                console.log(err);
            }
        };
       
        if (authReducer.user.username !== username) {
          /*   console.log(`/users?username=${username}`);
                const res =   API_fetchUserByUsername(username);

                console.log(res.data);
                setUserFetch(res.data);  */
       
          fetchUser();
       } else {
            setUserFetch(authReducer.user);
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
const mapStateToProps = (state) => {
    return {
      authReducer: state.authReducer,
    };
  };

export default connect(mapStateToProps, null)(ProfileBar);