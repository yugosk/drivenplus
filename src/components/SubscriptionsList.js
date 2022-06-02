import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function SubscriptionsList() {
    const [subList, setSubList] = useState([]);
    const { token } = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        promise.then(response => {
            setSubList(response.data);
            console.log(subList);
        });
    }, []);

    return (
        <SubListContainer>
            <SubListTitle>Escolha seu Plano</SubListTitle>
            <StyledSubList>
                {subList.map((subscription, index) => <Subscription image={subscription.image} price={subscription.price} id={subscription.id} key={index} />)}
            </StyledSubList>
        </SubListContainer>
    );
}

function Subscription({ image, price, id }) {
    function formatPrice(str) {
        return `R$ ${str.slice(0,2)},${str.slice(-2)}`
    }

    return (
        <Link style={{textDecoration: 'none'}} to={`/subscriptions/${id}`}>
            <StyledSubscription>
                <img src={image} />
                <p>{formatPrice(price)}</p>
            </StyledSubscription>
        </Link>
    );
}

const SubListContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 15px;
`

const SubListTitle = styled.h1`
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
`

const StyledSubList = styled.div`
    width: 77%;
    height: 560px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const StyledSubscription = styled.div`
    width: 100%;
    height: 180px;
    border: 3px solid #7e7e7e;
    border-radius: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    cursor: pointer;

    img{
        width: 48%;
        height: auto;
    }

    p{
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      line-height: 28px;
      text-align: flex-end;  
    }
`