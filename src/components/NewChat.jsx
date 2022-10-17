import ArrowBack from '@mui/icons-material/ArrowBack';
import React, { useState,useEffect } from 'react'
import styled from 'styled-components';
import Api from '../Api';

const Container = styled.div`
    width: 35%;
    max-width: 415px;
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    border-right:1px solid #DDD;
    transition: all .5s ease;
    transform: translateX(${props=>props.show ? "0%" : "-100%"});
    @media (max-width:991px) {
        width:100%;
        max-width: none;
    }
`;

const Head = styled.div`
   display: flex;
   background-color: #00BDF5;
   align-items: center;
   padding:60px 15px 15px 15px;
`;

const BackButton = styled.div`
   width: 40px;
   height: 40px;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
`;

const HeadTitle = styled.span`
   font-size: 19px;
   height: 40px;
   line-height: 40px;
   flex:1;
   font-weight: bold;
   color:#fff;
   margin-left: 20px;
`;

const List = styled.div`
   flex:1;
   overflow-y:auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding:5px;
  cursor: pointer;
  &:hover{
    background-color: #F5F5F5;
  }
`;

const Avatar = styled.img`
   width:20%;
   height: 20%;
   max-height: 60px;
   max-width: 60px;
   border-radius: 50%;
   margin-right: 15px;
`;

const Name = styled.span`
   font-size:20px;
   color:#111;
`;

export default function NewChat({user,chatList,show,setShow}) {
  const[list,setList] = useState([])

  useEffect(() =>{
    const getList = async () => {
        if(user !== null){
            let results = await Api.getContatoList(user.id,chatList);
            setList(results);
        }
    }
    getList();
  },[user])

  const addNewChat = async (user2) =>{
     await Api.addNewChat(user,user2)
     handleClose();
  }

  const handleClose = () =>{
    setShow(false);
  }

  return (
    <Container show={show}>
        <Head>
            <BackButton onClick={handleClose}>
                <ArrowBack style={{color:'#FFF'}}/>
            </BackButton>
            <HeadTitle>Nova Conversa</HeadTitle>
        </Head>
        <List>
            {list.map((item,key) => (
                <Item onClick={() => addNewChat(item)}>
                    <Avatar src={item.avatar}/>
                    <Name>{item.name}</Name>
                </Item>
            ))}
        </List>
    </Container>
  )
}
