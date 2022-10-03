import styles from "./topBar.module.scss";
import { Search, Person, Chat, NotificationsActive } from "@material-ui/icons";

export default function TopBar() {
    return (
        <div className={styles.grid__1200}>
            <div className={styles.topBarContainer}>
                <div className={styles.topBar__left}>
                    <div>
                        <span className={styles.left__logo}>
                            bonjour social
                        </span>
                    </div>
                </div>
                <div className={styles.topBar__center}>
                    <div className={styles.center__searchBar}>
                        <Search className={styles.searchBar__icon}></Search>
                        <input
                            className={styles.searchBar__input}
                            placeholder="Search for friend, post or video..."
                        />
                    </div>
                </div>
                <div className={styles.topBar__right}>
                    <div className={styles.right__links}>
                        <span className={styles.links__home}>homepage</span>
                        <span className={styles.links__timeline}>timeline</span>
                    </div>
                    <div className={styles.right__icons}>
                        <div className={styles.icons__person}>
                            <Person></Person>
                            <div className={styles.icon__quantity}>2</div>
                        </div>
                        <div className={styles.icons__chat}>
                            <Chat></Chat>
                            <div className={styles.icon__quantity}>4</div>
                        </div>
                        <div className={styles.icons__notification}>
                            <NotificationsActive></NotificationsActive>
                            <div className={styles.icon__quantity}>6</div>
                        </div>
                    </div>
                    <div>
                        <img src="" alt="" className={styles.right__avatar} />
                    </div>
                </div>
            </div>
        </div>
    );
}
