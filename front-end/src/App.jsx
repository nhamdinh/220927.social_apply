import "./scss_common/reset.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

export default function App() {
    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Login />} />
                <Route
                    path="login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
                <Route path="profile/:username" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}
