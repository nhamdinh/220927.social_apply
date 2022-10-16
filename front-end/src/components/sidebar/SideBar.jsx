import styles from "./sideBar.module.scss";
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
} from "@material-ui/icons";

export default function SideBar() {
    return (
        <div className={styles.sideBarContainer}>
            <ul className={styles.sideBar__list}>
                <li className={styles.sideBar__item}>
                    <RssFeed className={styles.item__icon}></RssFeed>
                    <span className={styles.item__title}> feed</span>
                </li>
                <li className={styles.sideBar__item}>
                    <Chat className={styles.item__icon}></Chat>
                    <span className={styles.item__title}> chats</span>
                </li>
                <li className={styles.sideBar__item}>
                    <PlayCircleFilledOutlined
                        className={styles.item__icon}
                    ></PlayCircleFilledOutlined>
                    <span className={styles.item__title}> videos</span>
                </li>
                <li className={styles.sideBar__item}>
                    <Group className={styles.item__icon}></Group>
                    <span className={styles.item__title}> groups</span>
                </li>
                <li className={styles.sideBar__item}>
                    <Bookmark className={styles.item__icon}></Bookmark>
                    <span className={styles.item__title}> bookmarks</span>
                </li>
                <li className={styles.sideBar__item}>
                    <HelpOutline className={styles.item__icon}></HelpOutline>
                    <span className={styles.item__title}> questions</span>
                </li>
                <li className={styles.sideBar__item}>
                    <WorkOutline className={styles.item__icon}></WorkOutline>
                    <span className={styles.item__title}> jobs</span>
                </li>
                <li className={styles.sideBar__item}>
                    <Event className={styles.item__icon}></Event>
                    <span className={styles.item__title}> events</span>
                </li>
                <li className={styles.sideBar__item}>
                    <School className={styles.item__icon}></School>
                    <span className={styles.item__title}> courses</span>
                </li>
            </ul>
            <div className={styles.sideBar__showMore}>show more</div>
            <hr className={styles.sideBar__hr}></hr>
            {/* <ul className={styles.sideBar__friendList}>
                {Users.map((u) => (
                    <CloseFriend key={u.id} use={u}></CloseFriend>
                ))}
            </ul> */}
        </div>
    );
}
