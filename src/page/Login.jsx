import React from 'react'
import styled from 'styled-components';
import Api from '../Api'

const LoginContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Button = styled.button`
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    border:none;
    font-weight: 600;
    color:white;
    cursor: pointer;
    text-shadow: 0.5px 0.5px 5px #111;
    &:first-child{
        background-color: #5c7ff3;
    }
    &:nth-child(2){
        background-color: #f35c6e;
    }
`;


export default function Login({onReceive}) {
  const handleFacebookLogin = async () =>{
      let result = await Api.fbPopupFacebook();
      if(result){
        onReceive(result.user);
      }else{
        alert("Error!")
      }
  }

  const handleGoogleLogin = async () =>{
        let result = await Api.fbPopupGoogle();
        if(result){
            onReceive(result.user)
        }else{
            alert("Error!")
        }
    }
  return (
    <LoginContainer>
        <Button onClick={handleFacebookLogin}>Logar com o Facebook</Button>
        <Button onClick={handleGoogleLogin}>Logar com o Google</Button>
    </LoginContainer>
  )
}
