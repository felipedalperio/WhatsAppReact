import React from 'react'
import styled from 'styled-components';
import Api from '../Api'
import Facebook from '@mui/icons-material/Facebook';
import Google from '@mui/icons-material/Google';

const LoginContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    background-color: rgba(164,217,231);
`;

const ButtonGroup = styled.div`
    display:flex;
    align-items: center;
    position:relative;
    top:-10px;
`;

const Title = styled.h1`
   font-weight: normal;
`;

const Span = styled.h3`
   font-weight: normal;
`;

const Img = styled.img`
   width: 300px;
   position:relative;
   top:20px;
`;

const Button = styled.button`
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    border:none;
    font-weight: 600;
    color:white;
    cursor: pointer;
    display: flex;
    align-items: center;
    text-shadow: 0.5px 0.5px 5px #111;
    &:first-child{
        background-color: #5c7ff3;
    }
    &:nth-child(3){
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
      <Img src="https://cdn.dribbble.com/users/473764/screenshots/16915192/media/8f8874bbe04b7d57ffbb903a8660b401.jpeg?compress=1&resize=400x300" />
      <Title>Faça seu Login!</Title>
      <ButtonGroup>
          <Button onClick={handleFacebookLogin}> <Facebook style={{marginRight:"10px"}} /> Com Facebook</Button>
          <Span>OU</Span>
          <Button onClick={handleGoogleLogin}> <Google  style={{marginRight:"10px"}}/>Com Google</Button>
      </ButtonGroup>
    </LoginContainer>
  )
}
