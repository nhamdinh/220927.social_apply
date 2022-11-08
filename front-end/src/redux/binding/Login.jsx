import Login from "./../../pages/login/Login";

import { connect } from "react-redux";
import { act_LoginSuccess } from "./../actions/actions";
const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};
const mapActionsToProps = { act_LoginSuccess: act_LoginSuccess };
export default connect(mapStateToProps, mapActionsToProps)(Login);
