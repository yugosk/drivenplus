import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { TopButtons } from "./Subscription";
import { IoArrowBackSharp } from "react-icons/io5";

export default function User() {
    const { token } = useContext(UserContext);
    const { idUser } = useParams();
    const navigate = useNavigate();

    return (
        <UserContainer>
            <TopButtons onClick={() => navigate("/home")}>
                <IoArrowBackSharp color="#ffffff" size={"32px"} />
            </TopButtons>
            <UserForm>
                <input
                type="text"
                id="name"
                value={token.name}
                readOnly />
                <input
                type="text"
                id="cpf"
                value={token.cpf}
                readOnly />
                <input
                type="text"
                id="email"
                value={token.email}
                readOnly />
                <button onClick={(e) => {
                    e.preventDefault();
                    navigate(`/users/${idUser}/update`);
                }}>ATUALIZAR</button>
            </UserForm>
        </UserContainer>
    );
}

const UserContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`

const UserForm = styled.form`
    height: 256px;
    width: 80%;
    margin-top: 152px;

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