import styles from "./onlineFriends.module.scss";

export default function OnlineFriends(use) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className={styles.friendsOnline__item}>
            <img src={PF + use.img} alt="" className={styles.item__img} />
            <span className={styles.item__online}></span>
            <span className={styles.item__name}>{use.username}</span>
        </li>
    );
}
