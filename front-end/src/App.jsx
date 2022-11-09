import "./scss_common/reset.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const App = ({authReducer}) => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={authReducer.user ? <Home /> : <Login />} />
                <Route
                    path="login"
                    element={authReducer.user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="register"
                    element={authReducer.user ? <Navigate to="/" /> : <Register />}
                />
                <Route path="profile/:username" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}
const mapStateToProps = (state) => {
    return {
      authReducer: state.authReducer,
    };
  };

export default connect(mapStateToProps, null)(App);
