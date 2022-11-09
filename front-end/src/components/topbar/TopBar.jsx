import styles from "./topBar.module.scss";
import { IMG_NO_AVATAR, PAGE_PROFILE } from "./../../const";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Search, Person, Chat, NotificationsActive } from "@material-ui/icons";

const TopBar = ({authReducer}) =>{
    const PF = process.env.REACT_APP_USERS_FOLDER;
    return (
        <div className={styles.topBarContainer}>
            <div className={styles.topBar__left}>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <span className={styles.left__logo}>bonjour social</span>
                </Link>
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
                <Link to={`/${PAGE_PROFILE}/${authReducer.user.username}`}>
                    <img
                        src={
                            authReducer.user.profilePicture
                                ? PF + authReducer.user.profilePicture
                                : PF + IMG_NO_AVATAR
                        }
                        alt={IMG_NO_AVATAR}
                        className={styles.right__avatar}
                    />
                </Link>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
      authReducer: state.authReducer,
    };
  };

export default connect(mapStateToProps, null)(TopBar);
