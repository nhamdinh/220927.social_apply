import styles from "./post.module.scss";
import { AuthContext } from "./../../context/AuthContext";
import { useContext, useState, useRef } from "react";
import { uploadCall, postsCall } from "./../../apiCalls";
import { IMG_NO_AVATAR } from "./../../const";
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";
export default function Post() {
    const PF = process.env.REACT_APP_USERS_FOLDER;
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const descRef = useRef();
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = { userId: user._id, desc: descRef.current.value };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                uploadCall(data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            postsCall(newPost);
            alert("The post has been upload success!!");
            /*   
                    window.location.reload();
             */
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={styles.postContainer}>
            <div className={styles.post__top}>
                <img
                    src={user ? PF + user.profilePicture : PF + IMG_NO_AVATAR}
                    alt={IMG_NO_AVATAR}
                    className={styles.top__avatar}
                />

                <input
                    placeholder={"What's in your mind " + user.username + " ?"}
                    ref={descRef}
                    type="text"
                    className={styles.top__input}
                />
            </div>
            {file !== null && (
                <div className={styles.post__img}>
                    <Cancel
                        className={styles.post__CancelImg}
                        onClick={() => setFile(null)}
                    />
                    <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className={styles.post__preview}
                    />
                </div>
            )}
            <hr className={styles.post__hr} />
            <form onSubmit={submitHandler} className={styles.post__bottom}>
                <ul className={styles.bottom__list}>
                    <label htmlFor="file" className={styles.bottom__item}>
                        <PermMedia
                            htmlColor="tomato"
                            className={styles.item__icon}
                        ></PermMedia>
                        <div className={styles.item__title}>photo or video</div>
                        <input
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const imgFile = e.target.files[0];
                                if (imgFile) {
                                    setFile(imgFile);
                                } else {
                                    setFile(null);
                                }
                                console.log(imgFile);
                            }}
                        ></input>
                    </label>
                    <li className={styles.bottom__item}>
                        <Label
                            htmlColor="blue"
                            className={styles.item__icon}
                        ></Label>
                        <div className={styles.item__title}> tag</div>
                    </li>
                    <li className={styles.bottom__item}>
                        <Room
                            htmlColor="green"
                            className={styles.item__icon}
                        ></Room>
                        <div className={styles.item__title}>location</div>
                    </li>
                    <li className={styles.bottom__item}>
                        <EmojiEmotions
                            htmlColor="goldenrod"
                            className={styles.item__icon}
                        ></EmojiEmotions>
                        <div className={styles.item__title}>feelings</div>
                    </li>
                </ul>
                <button type="submit" className={styles.bottom__post}>
                    post
                </button>
            </form>
        </div>
    );
}
