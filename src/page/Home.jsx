import React,{useState, useEffect} from 'react'
import styled from "styled-components"
import DonutLarge from '@mui/icons-material/DonutLarge';
import Chat from '@mui/icons-material/Chat';
import More from '@mui/icons-material/More';
import SearchIcon from '@mui/icons-material/Search';
import ChatListItem from '../components/ChatListItem';
import ChatIntro from '../components/ChatIntro';
import ChatWindows from '../components/ChatWindows';
import NewChat from '../components/NewChat';
import Login from './Login';
import Api from '../Api';

const AppWindow   = styled.div`
    display: flex;
    height: 100vh;
    background-color: #EDEDED;
`;

const Sliderbar= styled.div`
    width:35%;
    max-width:415px;
    display: flex;
    flex-direction: column;
    border-right:1px solid #DDD;
    overflow-x: hidden;
    transition: all .5s ease;
    @media (max-width:991px) {
        width:100%;
        max-width:none;
        background-color: #EDEDED;
        position: absolute;
        height: 100vh;
        transform: translateX(${props=>props.showSlider ? '0%' : '-100%'} )
    }
    z-index: 999;
`;

const Header = styled.header`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    margin: 10px 0px;
`;

const Search = styled.div`
    background-color: #F6F6F6;
    border-bottom: 1px solid #EEE;
    padding: 5px 15px;
`;

const SearchInput = styled.div`
    background-color: #FFF;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 0 10px;
`;

const Input = styled.input`
    flex:1;
    border:0;
    outline:0;
    background-color: transparent;
    margin-left: 10px;
`;

const Chatlist = styled.div`
    flex:1;
    background-color: #fff;
    overflow-y: auto;
    &::-webkit-scrollbar{
        width: 6px;
        height: 6px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: rgba(0,0,0,0.2);
    }
`;

const Avatar = styled.img`
    width: 60px;
    height: 60px;
    border-radius:50%;
    cursor: pointer;
`;

const Buttons = styled.div`
    display: flex;
`;

const IconBtn = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color:#a6a6a6;
`;

const Contentarea = styled.div`
    flex:1;
`;


export default function Home() {
  
  const[chatList,setChatList] = useState([]);
  const[activeChat,setActiveChat] = useState({});
  const[showSlider,setShowSlider] = useState(true);
  const[showNewChat,setShowNewChat] = useState(false);
  const[user,setUser] = useState(null);

  useEffect(() => {
    if(user !== null){
        let unsub = Api.onChatList(user.id,setChatList);
        return unsub;
    }
  },[user])

  function activeChantAndClose(key){
    setActiveChat(chatList[key])
    setShowSlider(false);
  }

  const handleLoginData = async (u) =>{
    let newUser = {
        id: u.uid,
        name:u.displayName,
        avatar:'https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg'
    }
    await Api.addUser(newUser);
    setUser(newUser)
  }

  if(user === null){
    return(<Login onReceive={handleLoginData}/>)
  }


  return (
    <AppWindow>
        <Sliderbar showSlider={showSlider}>
            <NewChat 
                chatList = {chatList}
                user = {user}
                show={showNewChat} 
                setShow={setShowNewChat}
            />
            <Header>
                <Avatar src={user.avatar} alt="Logo" title="Logo" />
                <Buttons>
                    <IconBtn>
                        <DonutLarge  />
                    </IconBtn>
                    <IconBtn onClick={() => setShowNewChat(true)}>
                        <Chat  />
                    </IconBtn>
                    <IconBtn>
                        <More  />
                    </IconBtn>
                </Buttons>
            </Header>
            <Search>
                <SearchInput>
                    <SearchIcon fontSize="small" style={{color:"#919191"}} />
                    <Input type="search" placeholder="Procurar ou começar uma conversa"/>
                </SearchInput>
            </Search>
            <Chatlist>
                {chatList.map((item,key) =>(
                    <ChatListItem 
                        key={key}
                        data={item}
                        onClick={() => activeChantAndClose(key)}
                        active={activeChat.chatId === chatList[key].chatId}
                    />
                ))}
            </Chatlist>
        </Sliderbar>
        <Contentarea>
            {
                activeChat.chatId !== undefined && <ChatWindows user={user} setShowSlider={setShowSlider} data={activeChat}/>
            }
            {
                activeChat.chatId === undefined && <ChatIntro/>
            }
        </Contentarea>
    </AppWindow>
  )
}
