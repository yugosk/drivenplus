import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { IoArrowBackSharp } from "react-icons/io5";
import { TbClipboardList } from "react-icons/tb";
import { FaMoneyBillWave } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";

export default function SingleSubscription() {
    const { token, setToken } = useContext(UserContext);
    const { idPlano } = useParams();
    const [confirm, setConfirm] = useState(false);
    const [sub, setSub] = useState({});
    const [perks, setPerks] = useState([]);
    const navigate = useNavigate();
    const [cardData, setCardData] = useState({
        membershipId: parseInt(idPlano),
        cardName: "",
        cardNumber: "",
        securityNumber: "",
        expirationDate: ""
    })
    
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`, {
            headers: {
            "Authorization": `Bearer ${token.token}`
            }
        })
        promise.then(response => {
            setSub(response.data);
            setPerks([...response.data.perks]);
        });
        promise.catch(err => console.log(err.response.data));
    }, []);

    function confirmSubmit(e) {
        e.preventDefault();
        const numberRegex = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)(?:\d{4})/;
        const dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (cardData.cardName !== "" &&
        numberRegex.test(cardData.cardNumber) &&
        cardData.securityNumber<1000 &&
        dateRegex.test(cardData.expirationDate)) {
            setConfirm(true);
        } else {
            alert("Preencha os dados corretamente!");
        }
    }
    
    function submitPurchase(e) {
        e.preventDefault();
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", cardData, {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        });
        promise.then(response => {
            setToken({...token, membership: response.data});
            navigate("/home");
        });
        promise.catch(err => console.log(err));
    }

    function formatCardNumber(str) {
        if (str.length === 16) {
            return `${str.slice(0,4)} ${str.slice(4,8)} ${str.slice(8,12)} ${str.slice(-4)}`
        } else {
            return str;
        }
    }

    function formatSecurity(str) {
        if (str.length === 3) {
            return (parseInt(str));
        } else {
            return str;
        }
    }

    function formatDate(str) {
        if (str.length === 4) {
            return `${str.slice(0,2)}/${str.slice(-2)}`
        } else {
            return str;
        }
    }

    return (
        <>
        <SingleSubContainer filter={confirm ? "0.7" : "1"}>
            <TopButtons onClick={() => navigate("/subscriptions")}>
                <IoArrowBackSharp color="#ffffff" size={"32px"} />
            </TopButtons>
            <SubImage>
                <img src={sub.image} alt="" />
            </SubImage>
            <h1>{sub.name}</h1>
            <PerksTitle>
                <TbClipboardList color="#ff4791" size={"20px"} />
                <h2>Benefícios:</h2>
            </PerksTitle>
            <PerksList>
                {perks.map((perk, index) => <p key={index}>{index+1}. {perk.title}</p>)}
            </PerksList>
            <PerksTitle>
                <FaMoneyBillWave color="#ff4791" size={"20px"} />
                <h2>Preço:</h2>
            </PerksTitle>
            <PerksList>
                <p>R$ {sub.price} cobrados mensalmente</p>
            </PerksList>
            <CardForm onSubmit={confirmSubmit}>
                <input
                type="text"
                id="cardName"
                value={cardData.cardName}
                placeholder="Nome impresso no cartão"
                required
                onChange={(e) => setCardData({...cardData, cardName: e.target.value})}/>
                <input
                type="numeric"
                id="cardNumber"
                value={cardData.cardNumber}
                placeholder="Digitos do cartão"
                required
                onChange={(e) => setCardData({...cardData, cardNumber: formatCardNumber(e.target.value)})}/>
                <div>
                    <input
                    type="numeric"
                    id="securityNumber"
                    value={cardData.securityNumber}
                    placeholder="Código de segurança"
                    required
                    onChange={(e) => setCardData({...cardData, securityNumber: formatSecurity(e.target.value)})}/>
                </div>
                <div>
                    <input
                    type="numeric"
                    id="expirationDate"
                    value={cardData.expirationDate}
                    placeholder="Validade"
                    required
                    onChange={(e) => setCardData({...cardData, expirationDate: formatDate(e.target.value)})}/>
                </div>
                <button>ASSINAR</button>
            </CardForm>
        </SingleSubContainer>
        <ModalContainer display={confirm ? "flex" : "none"}>
            <ModalIcons onClick={() => setConfirm(false)} >
                <AiFillCloseSquare color="#ffffff" size={"28px"} />
            </ModalIcons>
            <StyledModal>
                <p>Tem certeza que deseja assinar o plano DrivenPlus (R$ 39,99)?</p>
                <ModalButtons>
                    <div onClick={() => setConfirm(false)}>Não</div>
                    <button onClick={submitPurchase}>SIM</button>
                </ModalButtons>
            </StyledModal>
        </ModalContainer>
        </>
    
    );     
}

const ModalContainer = styled.div`
    display: ${props => props.display};
    background-color: none;
    align-items: center;
    justify-content: center;
`

const ModalIcons = styled.div`
    display: flex;
    position: absolute;
    z-index: 1;
    top: 24px;
    right: 20px;
    width: 28px;
    height: 28px;
`

const StyledModal = styled.div`
    display: flex;
    width: 66%;
    height: 210px;
    flex-direction: column;
    position: absolute;
    top: 34%;
    left: 17%;
    padding: 33px 22px 11px 22px;
    z-index: 1;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 12px;

    p{
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        line-break: normal;
        background-color: #ffffff;
    }
`

const ModalButtons = styled.div`
    height: 52px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #ffffff;
    
    button{
        width: 38%;
        heigth: 52px;
        background-color: #ff4791;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weigth: 700;
        color: #ffffff
    }

    div{
        width: 38%;
        heigth: 52px;
        background-color: #cecece;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weigth: 400;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const CardForm = styled.form`
    width: 80%;
    height: 236px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

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
        margin-bottom: 8px;
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
        margin-top: 4px;
    }

    div {
        width: 49%;
        heigth: 52px;
    }
`

const PerksList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 44px;
    margin-bottom: 12px; 

    p{
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: #ffffff;
    }
`

const PerksTitle = styled.div`
    height: 22px;
    width: 100%;
    padding-left: 40px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;

    h2{
        font-size: 16px;
        line-height: 19px;
        font-weight: 400;
        color: #ffffff;
        margin-left: 5px;
    }
`

const SingleSubContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    filter: brightness(${props => props.filter});
    
    h1{
        text-align: center;
        font-size: 32px;
        line-height: 37px;
        color: #ffffff;
        margin-bottom: 23px;
        font-weight: 700;
    }
`

const SubImage = styled.div`
    width: 37%;
    heigth: auto;
    margin-bottom: 5px;

    img{
        width: 100%;
    }
`

export const TopButtons = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 54px;
    padding-top: 22px;
    padding-left: 22px;
`

