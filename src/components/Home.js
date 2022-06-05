import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { IoPersonCircle } from "react-icons/io5";

export default function Home() {
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    function cancelSubscription(e) {
        e.preventDefault();
        const promise = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        });
        promise.then(() => {
            alert("Plano cancelado com sucesso!");
            navigate("/subscriptions");
        });
    }

    return (
        <HomeContainer>
            <HomeHeader>
                <img src={token.membership.image} />
                <div>
                    <IoPersonCircle color="#ffffff" size={"34px"} />
                </div>
            </HomeHeader>
            <h1>Olá, {token.name}</h1>
            <HomeList>
                {token.membership.perks.map((perk, index) => {
                    return (
                    <div key={index}>
                        <a href={perk.link}>
                            <p>{perk.title}</p>
                        </a>
                    </div>)
                })}
            </HomeList>
            <HomeFooter>
                <FooterButton bgColor="#ff4791">
                    <Link to="/subscriptions" style={{width: "100%", textDecoration: "none"}}>
                        <p>Mudar plano</p>
                    </Link>
                </FooterButton>
                <FooterButton onClick={cancelSubscription} bgColor="#ff4747"><p>Cancelar plano</p></FooterButton>
            </HomeFooter>
        </HomeContainer>
    );
}

const HomeList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    div{
        width: 80%;
        height: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ff4791;
        margin-bottom: 8px;
        border-radius: 8px;
    }

    p{  
        font-size: 14px;
        font-weigth: 700;
        color: #ffffff;
        text-align: center;
        background-color: #ff4791;
    }

    a{
        text-decoration: none;
        background-color: inherit;
    }
`

const HomeFooter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 12px;
    justify-content: space-between;
    height: 112px;
    width: 100%;
`

const FooterButton = styled.div`
    width: 80%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color : ${props => props.bgColor};
    border-radius: 8px;

    p{
        font-size: 14px;
        font-weigth: 700;
        color: #ffffff;
        text-align: center;
        background-color: ${props => props.bgColor};
    }
`

const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    h1{
        text-align: center;
        font-size: 24px;
        line-height: 28px;
        color: #ffffff;
        margin-bottom: 53px;
        font-weight: 700;
    }
`

const HomeHeader = styled.div`
    height: 95px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 38px;

    img{
        width: 20%;
    }

    div{
        height: 36px;
        width: 36px;
        position: absolute;
        top: 22px;
        right: 22px;
    }
`