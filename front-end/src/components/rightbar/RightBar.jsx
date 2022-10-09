import styles from "./rightBar.module.scss";

export default function RightBar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const HomeRightBar = () => {
        return (
            <>
                <div className={styles.rightBar__birthday}>
                    <img
                        src={`${PF}gift.png`}
                        alt=""
                        className={styles.birthday__gift}
                    />
                    <span className={styles.birthday__text}>
                        <strong>Ngọc Trinh</strong> and <b>3 other friends</b>{" "}
                        have a birthday today.
                    </span>
                </div>
                <img
                    src={`${PF}ad.png`}
                    alt=""
                    className={styles.rightBar__ads}
                />
                <div className={styles.rightBar__friendsOnline}>
                    <div className={styles.friendsOnline__title}>
                        online friends
                    </div>
                    {/*      <ul className={styles.friendsOnline__list}>
                        {Users.map((u) => (
                            <Online key={u.id} use={u}></Online>
                        ))}
                    </ul> */}
                </div>
            </>
        );
    };
    return (
        <div className={styles.rightBarContainer}>
            <HomeRightBar />
        </div>
    );
}
