import styles from "./feed.module.scss";
import Post from "./../post/Post";
import Wall from "./../wall/Wall";
import axios from "axios";
import { getAllPostsCall } from "./../../apiCalls";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export default function Feed(useName_ProfileComp) {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`/posts/all/${user.username}`);
            /*             const res = useName_ProfileComp
                ? await axios.get(`/posts/all/${useName_ProfileComp}`)
                : await axios.get(`/posts/all/${user.username}`); */
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, [useName_ProfileComp]);

    return (
        <>
            {<Post></Post>}
            {posts.map((post) => (
                <Wall key={post._id} post={post}></Wall>
            ))}
        </>
    );
}
