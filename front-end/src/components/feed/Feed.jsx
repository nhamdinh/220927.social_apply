import styles from "./feed.module.scss";
import Post from "./../post/Post";
import Wall from "./../wall/Wall";
import ProfileBar from "./../profilebar/ProfileBar";
import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Feed() {
    const usernameParams = useParams().username;
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = usernameParams
                ? await axios.get(`/posts/all/${usernameParams}`)
                : await axios.get(`/posts/all/${user.username}`);

            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, [usernameParams]);

    return (
        <>
            {usernameParams ? <ProfileBar></ProfileBar> : <Post></Post>}
            {posts.map((post) => (
                <Wall key={post._id} post={post}></Wall>
            ))}
        </>
    );
}
