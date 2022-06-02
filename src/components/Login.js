import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { SwitchLogin } from "./SignUp";
import logo from "../assets/logo-login.png";

export default function Login() {
    const { setToken } = useContext(UserContext);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    function submitLogin(e) {
        e.preventDefault();
        const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
        if (regEmail.test(userData.email) && userData.password !== "") {
            const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", userData);
            promise.then(response => {
                setToken(response.data.token);
                if (response.data.membership === null) {
                    navigate("/subscriptions");
                } else {
                    navigate("/home");
                }});
            promise.catch(err => alert("Erro: ", err.response.data, " Verifique os campos e tente novamente!"));
        } else {
            alert("Preencha os campos corretamente!");
        };
    }

    return (
        <LoginContainer>
            <StyledLogo src={logo} alt="logomarca driven+" />
            <LoginForms onSubmit={submitLogin}>
                <input
                type="text"
                id="email"
                value={userData.email}
                placeholder="E-mail"
                required
                onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                <input
                type="text"
                id="password"
                value={userData.password}
                placeholder="Senha"
                required
                onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                <button>ENTRAR</button>
            </LoginForms>
            <Link to="/signup">
                <SwitchLogin>Não possui uma conta? Cadastre-se</SwitchLogin>
            </Link>
        </LoginContainer>
    );
}

const LoginContainer = styled.div`
    width: 100vw;
    heigth: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 134px;
`

const StyledLogo = styled.img`
    width: 80%;
    height: auto;
    object-fit: contain;
    margin-bottom: 100px;
`

const LoginForms = styled.form`
    height: 196px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    input{
        width: 100%;
        line-height: 16px;
        padding: 18px 0 18px 14px;
        background-color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        text-align: left;
        margin-bottom: 16px;
    }

    input::placeholder{
        color: #7e7e7e;
        opacity: 1;
    }

    button{
        height: 52px;
        width: 100%;
        background-color: #ff4791;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weigth: 700;
        color: #ffffff;
        margin-top: 8px;
    }
`