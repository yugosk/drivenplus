import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import GlobalStyled from "./GlobalStyles";
import SignUp from "./SignUp";
import Login from "./Login";
import SubscriptionsList from "./SubscriptionsList";
import SingleSubscription from "./Subscription";
import Home from "./Home";
import User from "./Users";
import Update from "./Update";

export default function App() {
    const [token, setToken] = useState({});

    return (
        <UserContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route exact path="/subscriptions" element={<SubscriptionsList />} />
                    <Route path="/subscriptions/:idPlano" element={<SingleSubscription />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/users/:idUser" element={<User />} />
                    <Route path="/users/:idUser/update" element={<Update />} />
                </Routes>
                <GlobalStyled />
            </BrowserRouter>
        </UserContext.Provider>
    );
}