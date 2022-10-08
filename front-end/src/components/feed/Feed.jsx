import styles from "./feed.module.scss";
import Post from "./../post/Post";
import Wall from "./../wall/Wall";

export default function Feed() {
    return (
        <>
            <Post></Post>
            <Wall></Wall>
        </>
    );
}
