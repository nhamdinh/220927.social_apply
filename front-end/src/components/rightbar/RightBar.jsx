import styles from "./rightBar.module.scss";
import { Add, Remove } from "@material-ui/icons";
import OnlineFriends from "./../onlineFriends/OnlineFriends";
import { UsersOnline } from "./../../dummyData";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

import { IMG_GIFT, IMG_AD, IMG_NO_AVATAR } from "./../../const";
export default function RightBar() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const USERS_FOLDER = process.env.REACT_APP_USERS_FOLDER;
    const usernameParams = useParams().username;
    const { user, dispatch } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(user);
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(null);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                /*                 dispatch({ type: "UNFOLLOW", payload: user._id });
                 */ setFollowed(!followed);
            } else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                /*                 dispatch({ type: "FOLLOW", payload: user._id });
                 */ setFollowed(!followed);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const fetchFriendsList = async () => {
            if (usernameParams) {
                try {
                    if (currentUser._id) {
                        const friendList = await axios.get(
                            "/users/friends/" + currentUser._id
                        );
                        setFriends(friendList.data);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchFriendsList();
        setFollowed([...currentUser.followings].includes(user._id));
    }, [currentUser, user]);
    useEffect(() => {
        const fetchUser = async () => {
            if (usernameParams) {
                try {
                    const res = await axios.get(
                        `/users?username=${usernameParams}`
                    );
                    setCurrentUser(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };

        fetchUser();
    }, [usernameParams]);
    const ProfileRightBar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button
                        className={styles.rightBar__follow}
                        onClick={handleClick}
                    >
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <div className={styles.rightBar__info}>
                    <div className={styles.rightBar__info__title}>
                        {user.username === currentUser.username
                            ? "your "
                            : currentUser.username + "'s "}
                        information
                    </div>
                    <div className={styles.rightBar__info__desc}>
                        <span className={styles.rightBar__info__key}>
                            city :
                        </span>
                        <span className={styles.rightBar__info__value}>
                            {currentUser.city}
                        </span>
                    </div>
                    <div className={styles.rightBar__info__desc}>
                        <span className={styles.rightBar__info__key}>
                            from :
                        </span>
                        <span className={styles.rightBar__info__value}>
                            {currentUser.from}
                        </span>
                    </div>
                    <div className={styles.rightBar__info__desc}>
                        <span className={styles.rightBar__info__key}>
                            relationship :
                        </span>
                        <span className={styles.rightBar__info__value}>
                            {currentUser.relationship === 1
                                ? "Single"
                                : currentUser.relationship === 2
                                ? "Married"
                                : "-"}
                        </span>
                    </div>
                </div>
                <div className={styles.rightBar__following}>
                    <span className={styles.rightBar__following__title}>
                        {user.username === currentUser.username
                            ? "your "
                            : currentUser.username + "'s "}
                        friends list
                    </span>
                    <ul className={styles.rightBar__following__list}>
                        {friends.map((friend) => (
                            <Link
                                key={friend._id}
                                to={"/profile/" + friend.username}
                                style={{ textDecoration: "none" }}
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
                                        alt={IMG_NO_AVATAR}
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
                        <strong>Ngọc Trinh</strong> and
                        <strong>3 other friends</strong> have a birthday today.
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
                        {UsersOnline.map((user) => (
                            <OnlineFriends
                                key={user.id}
                                use={user}
                            ></OnlineFriends>
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
