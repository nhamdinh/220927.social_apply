import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from "../const";

const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_START:
            console.log("LOGIN_SUCCESS", action);

            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS", action);
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case LOGIN_FAILURE:
            console.log("LOGIN_FAILURE", action);
            return {
                user: null,
                isFetching: true,
                error: action.payload,
            };
        case "FOLLOW":
            console.log("FOLLOW");
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
            console.log("UNFOLLOW");

            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    ),
                },
            };
        default:
            return state;
    }
};
export default AuthReducer;
