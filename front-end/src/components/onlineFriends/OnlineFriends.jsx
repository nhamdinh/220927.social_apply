import styles from "./onlineFriends.module.scss";
import { IMG_NO_AVATAR } from "./../../const";

export default function OnlineFriends(use) {
    use = use.use;
    const USERS_FOLDER = process.env.REACT_APP_USERS_FOLDER;
    return (
        <li className={styles.friendsOnline__item}>
            <img
                src={
                    use.profilePicture
                        ? USERS_FOLDER + use.profilePicture
                        : USERS_FOLDER + IMG_NO_AVATAR
                }
                alt={IMG_NO_AVATAR}
                className={styles.item__img}
            />
            <span className={styles.item__online}></span>
            <span className={styles.item__name}>{use.username}</span>
        </li>
    );
}
