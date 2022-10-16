import styles from "./post.module.scss";
import { AuthContext } from "./../../context/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";

import { uploadCall, postsCall } from "./../../apiCalls";
import { IMG_NO_AVATAR } from "./../../const";
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
    CallMerge,
} from "@material-ui/icons";
export default function Post() {
    const PF = process.env.REACT_APP_USERS_FOLDER;
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const descRef = useRef();
    const fileInputRef = useRef();

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(String(reader.result));
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [file]);
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
            /*             window.location.reload();
             */
        } catch (err) {
            console.log(err);
        }
        alert("The post has been upload success!!");
    };
    return (
        <div className={styles.postContainer}>
            <div className={styles.post__top}>
                <img
                    src={user ? PF + user.profilePicture : PF + IMG_NO_AVATAR}
                    alt=""
                    className={styles.top__avatar}
                />

                <input
                    placeholder={"What's in your mind " + user.username + " ?"}
                    ref={descRef}
                    type="text"
                    className={styles.top__input}
                />
            </div>
            <img src={preview} alt="preview" className={styles.post__preview} />
            <hr className={styles.post__hr} />
            <form onSubmit={submitHandler} className={styles.post__bottom}>
                <ul className={styles.bottom__list}>
                    <label htmlFor="file" className={styles.bottom__item}>
                        <PermMedia
                            onClick={(event) => {
                                event.preventDefault();
                                fileInputRef.current.click();
                            }}
                            htmlColor="tomato"
                            className={styles.item__icon}
                        ></PermMedia>
                        <div className={styles.item__title}>photo or video</div>
                        <input
                            ref={fileInputRef}
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
