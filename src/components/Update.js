import React, { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { TopButtons } from "./Subscription";
import { IoArrowBackSharp } from "react-icons/io5";

export default function Update() {
    const { token } = useContext(UserContext);
    const { idUser } = useParams();
    const navigate = useNavigate();
    const [newUserData, setNewUserData] = useState({
        name: token.name,
        cpf: token.cpf,
        email: token.email,
        currentPassword: ""
    });

    function submitUpdate(e) {
        e.preventDefault();
        if (newUserData.currentPassword === token.password && newUserData.name !== "" && newUserData.email !== "") {
            const promise = axios.put("https://mock-api.driven.com.br/api/v4/driven-plus/users/", newUserData, {
                headers: {
                    "Authorization": `Bearer ${token.token}`
                }
            });
            promise.then(() => {
                alert("Dados alterados com sucesso!");
                navigate(`/users/${idUser}`);
            });
            promise.catch(err => alert(err.response.status));
        } 
    }

    return (
        <UpdateContainer>
            <TopButtons onClick={() => navigate(`/users/${idUser}`)}>
                <IoArrowBackSharp color="#ffffff" size={"32px"} />
            </TopButtons>
            <UpdateForm onSubmit={submitUpdate}>
                <input
                type="text"
                id="name"
                value={newUserData.name}
                required
                onChange={(e) => setNewUserData({...newUserData, name: e.target.value})} />
                <input
                type="text"
                id="cpf"
                value={newUserData.cpf}
                readOnly />
                <input
                type="text"
                id="email"
                value={newUserData.email}
                required
                onChange={(e) => setNewUserData({...newUserData, email: e.target.value})} />
                <input
                type="text"
                id="oldPassword"
                value={newUserData.currentPassword}
                required
                placeholder="Senha atual"
                onChange={(e) => setNewUserData({...newUserData, currentPassword: e.target.value})} />
                <input
                type="text"
                id="newPassword"
                value={newUserData.newPassword}
                required
                placeholder="Nova senha"
                onChange={(e) => setNewUserData({...newUserData, newPassword: e.target.value})} />
                <button>SALVAR</button>
            </UpdateForm>
        </UpdateContainer>
    );
}

const UpdateContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`

const UpdateForm = styled.form`
    height: 392px;
    width: 80%;
    margin-top: 84px;

    input{
        width: 100%;
        line-height: 16px;
        padding: 18px 0 18px 14px;
        background-color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 400;
        color: #7e7e7e;
        text-align: left;
        margin-bottom: 16px;  
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