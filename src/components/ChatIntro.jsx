import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background-color: #FFF;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`;

const Image = styled.img`
    height: auto;
    width: 250px;
`;

const Title = styled.span`
    font-size: 32px;
    color:#525252;
    font-weight: normal;
    margin-top:10px;
`;

const Desc = styled.span`
    font-size: 14px;
    color:#777;
    font-weight: normal;
    text-align: center;
    width: 50%;
    margin-top: 10px;
`;


export default function ChatIntro() {
  return (
    <Container>
        <Image src="https://www.sults.com.br/assets/img/minimal/people-card.svg"/>
        <Title>Mantenha seu celular conectado</Title>
        <Desc>O WhatsApp conecta ao seu celular para sincronizar suas mensagens. Para reduzir o uso de dados, conecte seu celular a uma rede Wi-Fi.</Desc>
    </Container>
  )
}
