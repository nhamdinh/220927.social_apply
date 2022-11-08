import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from "./../../const";

const INITIAL_AUTH_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

const AuthReducer = (state = INITIAL_AUTH_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN_START:
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        isFetching: true,
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        user: null,
        isFetching: true,
        error: action.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
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
