import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
    height: 70px;
    cursor: pointer;
    transition: all .5s ease;
    &:hover{
        background-color: #DDD;
    }
    background-color: ${props => props.active};
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left:15px;
`;

const Lines = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
    justify-content: center;
    border-bottom:1px solid #DDD;
    padding-right: 15px;
    margin-left: 15px;
    padding-bottom: 10px;
    flex-wrap: wrap;
    min-width: 0;
`;

const Line = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Name = styled.span`
    font-size:18px;
    color:#000;
`;

const Data = styled.span`
    font-size:12px;
    color:#999;
`;

const LastMsg = styled.div`
    font-size:14px;
    color:#999;
    display: flex;
    width:100%;
`;

const Msg = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin:0;
`;

export default function ChatListItem({onClick, active, data}) {
 
const[time,setTime] = useState("");
 
 useEffect(() => {
    if(data.lastMessageDate > 0){
        let d = new Date(data.lastMessageDate * 1000);
        let hours =  d.getHours();
        let minutes =  d.getMinutes();
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        setTime(`${hours}:${minutes}`)
    }
 },[data])

  return (
    <Container onClick={onClick} active={active == true ? "#DDD" : "#FFF"}>
        <Avatar src={data.image} alt=""/>
        <Lines>
            <Line>
                <Name>{data.title}</Name>
                <Data>{time}</Data>
            </Line>
            <Line>
                <LastMsg>
                    <Msg>{data.lastMessage}</Msg>
                </LastMsg>
            </Line>
        </Lines>
    </Container>
  )
}
