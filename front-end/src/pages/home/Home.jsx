import styles from "./home.module.scss";
import TopBar from "./../../components/topbar/TopBar";
import RightBar from "./../../components/rightbar/RightBar";
import SideBar from "./../../components/sidebar/SideBar";
import Feed from "./../../components/feed/Feed";

export default function Home() {
    return (
        <>
            <div className={styles.topBar__fixed}>
                <div className={`${styles.grid__1200} ${styles.wide}`}>
                    <TopBar> </TopBar>
                </div>
            </div>
            <div className={styles.homeContainer}>
                <div className={`${styles.grid__1200} ${styles.wide}`}>
                    <div className={`${styles.grid__row} `}>
                        <div className={`${styles.grid__col} ${styles.l__3}`}>
                            <SideBar> </SideBar>
                        </div>

                        <div className={`${styles.grid__col} ${styles.l__6}`}>
                            <Feed></Feed>
                        </div>
                        <div className={`${styles.grid__col} ${styles.l__2}`}>
                            <RightBar> </RightBar>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
