import styles from "./rightBar.module.scss";
import { Add, Remove } from "@material-ui/icons";
import OnlineFriends from "./../onlineFriends/OnlineFriends";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

import { IMG_GIFT, IMG_AD, IMG_NO_AVATAR } from "./../../const";
import socketIOClient from "socket.io-client";

export default function RightBar() {
    const socketHost = process.env.REACT_APP_SOCKET_HOST;

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const USERS_FOLDER = process.env.REACT_APP_USERS_FOLDER;
    const usernameParams = useParams().username;
    const { user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(user);
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(null);

    /*Server socketIo  */

    const [socketUsernameTo, setSocketUsernameTo] = useState("");
    const [stories, setStories] = useState([]);
    const [message, setMessage] = useState("");
    const [socketId, setIdSocketId] = useState();
    const [messageBox, setMessageBox] = useState(false);
    const socketRef = useRef();
    const messagesEnd = useRef();
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

    useEffect(() => {
        socketRef.current = socketIOClient.connect(socketHost);

        socketRef.current.on("setIdSocketId", (data) => {
            setIdSocketId(data);
        });

        socketRef.current.on("sendDataFromServer", (dataGot) => {
            if (
                user.username === dataGot.data.socket_username_to ||
                user.username === dataGot.data.socket_username_from
            ) {
                setStories((oldMsgs) => [...oldMsgs, dataGot.data]);
                if (user.username !== dataGot.data.socket_username_from) {
                    setSocketUsernameTo(dataGot.data.socket_username_from);
                }
                setMessageBox(true);
                scrollToBottom();
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message !== null) {
            const msg = {
                socketId: socketId,
                content: message,
                socket_username_from: user.username,
                socket_username_to: socketUsernameTo,
            };
            socketRef.current.emit("sendDataFromClient", msg);
            setMessage("");
        }
    };
    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    };
    const renderStory = stories.map((story, index) => (
        <div
            key={index}
            className={
                story.socketId === socketId
                    ? `${styles.your__message}`
                    : `${styles.other__people}`
            }
        >
            {story.content}
        </div>
    ));

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            sendMessage();
        }
    };

    /*Server socketIo  */
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
                            <li
                                key={friend._id}
                                className={styles.rightBar__following__item}
                            >
                                <img
                                    onClick={(event) => {
                                        setSocketUsernameTo(friend.username);
                                        setMessageBox(!messageBox);
                                        setStories([]);
                                    }}
                                    src={
                                        friend.profilePicture
                                            ? USERS_FOLDER +
                                              friend.profilePicture
                                            : PUBLIC_FOLDER + IMG_NO_AVATAR
                                    }
                                    alt={IMG_NO_AVATAR}
                                    className={styles.following__item__img}
                                />
                                <Link
                                    to={"/profile/" + friend.username}
                                    style={{ textDecoration: "none" }}
                                >
                                    <span
                                        className={styles.following__item__name}
                                    >
                                        {friend.username}
                                    </span>
                                </Link>
                            </li>
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
                        <ul className={styles.friendsOnline__list}>
                            {friends.map((friend) => (
                                <OnlineFriends
                                    key={friend.id}
                                    use={friend}
                                ></OnlineFriends>
                            ))}
                        </ul>
                    </ul>
                </div>
            </>
        );
    };
    return (
        <div className={styles.rightBarContainer}>
            {messageBox && (
                <div className={styles.box__chat}>
                    <p
                        onClick={() => {
                            setMessageBox(false);
                            setStories([]);
                        }}
                        className={styles.box__chat__name}
                    >
                        {socketUsernameTo}
                    </p>
                    <div className={styles.box__chat_message}>
                        {renderStory}

                        <div
                            style={{ float: "left", clear: "both" }}
                            ref={messagesEnd}
                        ></div>
                    </div>

                    <div className={styles.send__box}>
                        <textarea
                            value={message}
                            onKeyDown={onEnterPress}
                            onChange={(event) => {
                                setMessage(event.target.value);
                            }}
                            placeholder="Enter message ..."
                        />
                        <button
                            className={styles.send__box__button}
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
            {usernameParams ? <ProfileRightBar /> : <HomeRightBar />}
        </div>
    );
}
