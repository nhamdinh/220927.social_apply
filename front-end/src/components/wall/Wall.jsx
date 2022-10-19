import styles from "./wall.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

import {
    IMG_NO_AVATAR,
    IMG_NO_COVER,
    IMG_LIKE,
    IMG_HEART,
} from "./../../const";
import { MoreVert } from "@material-ui/icons";

export default function Wall(post) {
    post = post.post;
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const POSTS_FOLDER = process.env.REACT_APP_POSTS_FOLDER;
    const USERS_FOLDER = process.env.REACT_APP_USERS_FOLDER;
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const { user, dispatch } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(user);
    const username = useParams().username;

    const handleLikeClick = () => {
        try {
            axios.put("/posts/" + post._id + "/like", {
                userId: currentUser._id,
            });
        } catch (err) {
            console.log(err);
        }
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        setIsLiked(!isLiked);
    };
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setCurrentUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    return (
        <div className={styles.wallContainer}>
            <div className={styles.wall__top}>
                <div className={styles.top__left}>
                    <Link
                        to={username ? "" : `profile/${currentUser.username}`}
                    >
                        <img
                            src={
                                currentUser.profilePicture
                                    ? USERS_FOLDER + currentUser.profilePicture
                                    : PUBLIC_FOLDER + IMG_NO_AVATAR
                            }
                            alt={IMG_NO_AVATAR}
                            className={styles.left__avatar}
                        />
                    </Link>

                    <div className={styles.left__name}>
                        {currentUser.username}
                    </div>
                    <div className={styles.left__date}>
                        {format(post.createdAt)}
                    </div>
                </div>
                <MoreVert className={styles.top__right}></MoreVert>
            </div>
            <div className={styles.wall__center}>
                <div className={styles.center__content}>{post?.desc}</div>
                <img
                    src={
                        post.img
                            ? POSTS_FOLDER + post.img
                            : PUBLIC_FOLDER + IMG_NO_COVER
                    }
                    alt={IMG_NO_COVER}
                    className={styles.center__img}
                />
            </div>
            <div className={styles.wall__bottom}>
                <div className={styles.bottom__left}>
                    <img
                        src={PUBLIC_FOLDER + IMG_LIKE}
                        alt={IMG_LIKE}
                        className={styles.left__likeIcon}
                        onClick={handleLikeClick}
                    />
                    <img
                        src={PUBLIC_FOLDER + IMG_HEART}
                        alt={IMG_HEART}
                        className={styles.left__heartIcon}
                        onClick={handleLikeClick}
                    />
                    <span className={styles.left__likeCounter}>
                        {likeCount} people liked it
                    </span>
                </div>
                <div className={styles.bottom__right}>
                    {post.comment} comments
                </div>
            </div>
        </div>
    );
}
