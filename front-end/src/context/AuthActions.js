import {
    UNFOLLOW,
    FOLLOW,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from "../const";
export const act_LoginStart = (userCredentials) => ({
    type: LOGIN_START,
});

export const act_LoginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const act_LoginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const act_Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const act_Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});
