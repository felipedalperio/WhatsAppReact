import styled from 'styled-components'
import More from '@mui/icons-material/More';
import Search from '@mui/icons-material/Search';
import AttachFile from '@mui/icons-material/AttachFile';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import Close from '@mui/icons-material/Close';
import Send from '@mui/icons-material/Send';
import Arrow from '@mui/icons-material/ArrowBack';
import React, {useState,useEffect,useRef} from 'react'
import EmojiPicker from "emoji-picker-react";
import MensagemItem from './MensagemItem';
import Api from '../Api';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  height: 60px;
  border-bottom: 1px solid #CCC;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position:fixed;
  top:0;
  width: 100%;
  background-color: #FFF;
  z-index: 99;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Buttons = styled.div`
  display:flex;
  align-items: center;
  margin-right:15px;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .5s ease;
  cursor: pointer;
  overflow: hidden;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius:50%;
  margin-left: 15px;
  margin-right: 15px;
`;

const Name = styled.span`

`;

const Body = styled.div`
  height: calc(100% - 62px);
  position: relative;
  top:60px;
  width: 100%;
  overflow-y: auto;
  background-color: #FFF;
  background-size: cover;
  background-position: center;
  background-image: url('https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg');
  padding: 20px 30px 80px 30px;
  &::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb{
    background-color: rgba(0,0,0,0.2);
  }

`;


const Footer = styled.div`
  height: 62px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #FFF;
  position: relative;
  @media (max-width:991px) {
    position: fixed;
    bottom: 0;
    left:0;
  }
`;

const Pre = styled.div`
  display:flex;
`;

const InputArea = styled.div`
  flex:1;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border:0;
  outline:0;
  background-color: #FFF;
  border-radius: 20px;
  font-size:15px;
  color: #4A4A4A;
  padding-left:15px;
`;

const Pos = styled.div`
  display:flex;
`;

const EmojiContainer = styled.div`
  overflow-y:hidden;
  transition: all .3s ease;
  height: ${props => props.open};
`;

export default function ChatWindows({user,setShowSlider,data}) {
  const body = useRef();
  
  const[emojiOpen, setEmojiOpen] = useState(false);
  const[text, setText] = useState("");
  const[list,setList] = useState([]);
  const[users,setUsers] = useState([]);

  useEffect(() =>{
   setList([]) //limpa o chat;
   let unsub = Api.onChatContent(data.chatId,setList,setUsers);
   return unsub;
  },[data.chatId])
  
  const handleEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji);
  }
  const handleOpenEmoji = () => {
    setEmojiOpen(emojiOpen ? false : true)
  }

  const handleInputKeyUp = (e) =>{
    if(e.keyCode == 13){
      handleSendClick();
    }
  }

  const handleSendClick = () => {
    if(text !== ""){
      Api.sendMessage(data,user.id,'text',text,users);
      //sepois de enviar a mensagem limpa:
      setText('');
      setEmojiOpen(false);
    }
  }

  useEffect(() =>{
    if(body.current.scrollHeight > body.current.offsetHeight){
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
    }
  },[list])

  return (
    <Container>
      <Header>
        <Info>
            <Icon onClick={() => setShowSlider(true)}>
                <Arrow style={{color:"#919191"}} />
            </Icon>
            <Avatar src={data.image}/>
            <Name>{data.title}</Name>
        </Info>
        <Buttons>
            <Icon>
                <Search style={{color:"#919191"}} />
            </Icon>
            <Icon>
                <AttachFile style={{color:"#919191"}} />
            </Icon>
            <Icon>
                <More style={{color:"#919191"}} />
            </Icon>
        </Buttons>
      </Header>
      <Body ref={body}>
         {list.map((item,key) => (
            <MensagemItem key={key} data={item} user={user}/>
          ))}
      </Body>
      <EmojiContainer open={emojiOpen ? '100%' : '0px'}>
          <EmojiPicker 
            onEmojiClick={handleEmojiClick}
            disabledSkinTonePicker
            disabledSearchBar
            pickerStyle={{ width: '100%', height:'100%' }}
            groupVisibility = {{
              'flags'  : false,
              'symbols':false,
              'travel_places':false,
              'activities':false,
              'objects':false,
              'animals_nature':false,
              'food_drink':false,
            }}
          />
      </EmojiContainer>
      <Footer>
          <Pre>
            <Icon onClick={handleOpenEmoji} style={{width:emojiOpen ? "40px":"0px"}} >
                <Close style={{color:"#919191"}} />
            </Icon>
            <Icon onClick={handleOpenEmoji}>
                <InsertEmoticon style={{color: emojiOpen ? "#009688" : "#919191"}} />
            </Icon>
          </Pre>
          <InputArea>
              <Input type="text" 
                     placeholder="Digite uma mensagem" 
                     value={text} 
                     onChange={e=>setText(e.target.value)} 
                     onKeyUp={handleInputKeyUp}
                     />
          </InputArea>
          <Pos>
              <Icon onClick={handleSendClick}>
                  <Send style={{color:"#919191"}} />
              </Icon>
          </Pos>
      </Footer>
    </Container>
  )
}
