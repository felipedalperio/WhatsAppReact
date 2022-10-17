import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

const MessageLine = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: ${props => props.direction};
`;

const MessageItem = styled.div`
    background-color: #FFF;
    border-radius: 10px;
    box-shadow: 0 1px 1px #CCC;
    display: flex;
    flex-direction: column;
    padding: 3px;
    height: auto;
    max-width: 90%;
    background-color: ${props => props.bc};
    overflow: hidden;
`;

const Text = styled.p`
    font-size: 14px;
    margin:5px 40px 5px 5px;
    overflow-wrap: break-word;

`;

const Data = styled.span`
    font-size:11px;
    color:#999;
    margin-right: 5px;
    text-align: right;
    height: 15px;
    margin-top:-10px;
`;

export default function MensagemItem({data,user}) {

  const [time,setTime] = useState('');

  useEffect(() =>{
      if(data.date > 0){
          let d = new Date(data.date.seconds * 1000);
          let hours = d.getHours();
          let minutes = d.getMinutes();
          hours = hours < 10 ? '0'+hours : hours;
          minutes =  minutes < 10 ? '0'+ minutes : minutes;
          setTime(`${hours}:${minutes}`);
      }
  },[data])

  function direction(){
    if(user.id === data.author){ // A MENSAGEM É MINHA
        return 'flex-end';
    }else{
        return 'flex-start';
    } 
  }
  function backgroundColor(){
    if(user.id === data.author){ // A MENSAGEM É MINHA
        return '#DCF8C6';
    }else{
        return '#FFFFFF';
    } 
  }
  return (
    <MessageLine direction={direction}>
        <MessageItem bc={backgroundColor}>
            <Text>{data.body}</Text>
            <Data>{time}</Data>
        </MessageItem>
    </MessageLine>
  )
}
