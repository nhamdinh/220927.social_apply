import styles from "./rightBar.module.scss";
import { Add, Remove } from "@material-ui/icons";
import OnlineFriends from "./../onlineFriends/OnlineFriends";
import { Users } from "./../../dummyData";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

import { IMG_GIFT, IMG_AD, IMG_NO_AVATAR } from "./../../const";
export default function RightBar({}) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const USERS_FOLDER = process.env.REACT_APP_USERS_FOLDER;
    const usernameParams = useParams().username;
    const { user } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const fetchFriendsList = async () => {
            try {
                if (usernameParams) {
                    if (user._id) {
                        const friendList = await axios.get(
                            "/users/friends/" + user._id
                        );
                        setFriends(friendList.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchFriendsList();
    }, [usernameParams]);
    const ProfileRightBar = () => {
        return (
            <>
                <div className={styles.rightBar__info}>
                    <div className={styles.rightBar__info__title}>
                        your information
                    </div>
                    <div className={styles.rightBar__info__desc}>
                        <span className={styles.rightBar__info__key}>
                            city :
                        </span>
                        <span className={styles.rightBar__info__value}>
                            {user.city}
                        </span>
                    </div>
                    <div className={styles.rightBar__info__desc}>
                        <span className={styles.rightBar__info__key}>
                            from :
                        </span>
                        <span className={styles.rightBar__info__value}>
                            {user.from}
                        </span>
                    </div>
                    <div className={styles.rightBar__info__desc}>
                        <span className={styles.rightBar__info__key}>
                            relationship :
                        </span>
                        <span className={styles.rightBar__info__value}>
                            {user.relationship == 1
                                ? "Single"
                                : user.relationship == 2
                                ? "Married"
                                : "-"}
                        </span>
                    </div>
                </div>
                <div className={styles.rightBar__following}>
                    <span className={styles.rightBar__following__title}>
                        your friends list
                    </span>
                    <ul className={styles.rightBar__following__list}>
                        {friends.map((friend) => (
                            <Link
                                key={friend._id}
                                to={"/profile/" + friend.username}
                            >
                                <li
                                    className={styles.rightBar__following__item}
                                >
                                    <img
                                        src={
                                            friend.profilePicture
                                                ? USERS_FOLDER +
                                                  friend.profilePicture
                                                : PUBLIC_FOLDER + IMG_NO_AVATAR
                                        }
                                        alt=""
                                        className={styles.following__item__img}
                                    />
                                    <span
                                        className={styles.following__item__name}
                                    >
                                        {friend.username}
                                    </span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </>
        );
    };
    const HomeRightBar = () => {
        return (
            <>
                <div className={styles.rightBar__birthday}>
                    <img
                        src={PUBLIC_FOLDER + IMG_GIFT}
                        alt={IMG_GIFT}
                        className={styles.birthday__gift}
                    />
                    <span className={styles.birthday__text}>
                        <b>Ngọc Trinh</b> and <b>3 other friends</b> have a
                        birhday today.
                    </span>
                </div>
                <img
                    src={PUBLIC_FOLDER + IMG_AD}
                    alt={IMG_AD}
                    className={styles.rightBar__ads}
                />
                <div className={styles.rightBar__friendsOnline}>
                    <div className={styles.friendsOnline__title}>
                        online friends
                    </div>
                    <ul className={styles.friendsOnline__list}>
                        {Users.map((u) => (
                            <OnlineFriends key={u.id} use={u}></OnlineFriends>
                        ))}
                    </ul>
                </div>
            </>
        );
    };
    return (
        <div className={styles.rightBarContainer}>
            {usernameParams ? <ProfileRightBar /> : <HomeRightBar />}
        </div>
    );
}
