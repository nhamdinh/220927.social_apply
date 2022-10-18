import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from "./const";
import {
    API_LOGIN,
    API_REGISTER,
    API_UPLOAD,
    API_POSTS,
    API_GETALL_POSTS,
} from "./const";
import axios from "axios";
export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: LOGIN_START });
    try {
        const res = await axios.post(API_LOGIN, userCredential);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: LOGIN_FAILURE, payload: err });
    }
};

export const registerCall = async (userRegister) => {
    try {
        await axios.post(API_REGISTER, userRegister);
    } catch (err) {
        console.log(err);
    }
};

export const uploadCall = async (data) => {
    try {
        await axios.post(API_UPLOAD, data);
    } catch (err) {
        console.log(err);
    }
};
export const postsCall = async (newPost) => {
    try {
        await axios.post(API_POSTS, newPost);
    } catch (err) {
        console.log(err);
    }
};
/* export const getAllPostsCall = async (username) => {
    try {
       await axios.get(`${API_GETALL_POSTS}/${username}`);
    } catch (err) {
        console.log(err);
    }
}; */
