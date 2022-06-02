import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        cpf: "",
        password: ""
    });
    const navigate = useNavigate();

    function formataCPF(str) {
        if (str.length === 11){
            return `${str.slice(0,3)}.${str.slice(3,6)}.${str.slice(6,9)}-${str.slice(-2)}`;
        } else {
            return str;
        }
    }

    function submitSignUp(e) {
        e.preventDefault();
        const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
        const regCPF = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
        if (userData.name !== "" && regCPF.test(userData.cpf) && regEmail.test(userData.email) && userData.password !== "") {
            setUserData({...userData, cpf: formataCPF(userData.cpf)});
            const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", userData)
            promise.then(response => {
                console.log(response);
                navigate("/");
            });
            promise.catch(err => alert("Erro: ", err.response.data, " Verifique os campos e tente novamente!"));
        } else {
            alert("Preencha os campos corretamente!");
        }
    }

    return (
        <SignUpContainer>
            <SignUpForm onSubmit={submitSignUp}>
                <input
                type="text"
                id="name"
                value={userData.name}
                placeholder="Nome"
                required
                onChange={(e) => setUserData({...userData, name: e.target.value})}/>
                <input
                type="numeric"
                id="cpf"
                value={userData.cpf}
                placeholder="CPF"
                required
                onChange={(e) => setUserData({...userData, cpf: formataCPF(e.target.value)})}/>
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
                <button>CADASTRAR</button>
            </SignUpForm>
            <Link to="/">
                <SwitchLogin>Já possui uma conta? Entre</SwitchLogin>
            </Link>
        </SignUpContainer>
    );
}

const SignUpContainer = styled.div`
    width: 100vw;
    heigth: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 147px;
`

const SignUpForm = styled.form`
    height: 332px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

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
        color: #ffffff
    }
`

export const SwitchLogin = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    text-decoration-line: underline;
    color: #ffffff;
    margin-top: 25px;
    margin-bottom: 25px;
`