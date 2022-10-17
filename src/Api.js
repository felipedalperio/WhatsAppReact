import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Importando o firebase config que a gente criou:
import firebaseConfig from './firebaseconfig';

//Conexão:
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()

export default{
    fbPopupFacebook:async () =>{
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        let result = await firebaseApp.auth().signInWithPopup(facebookProvider);
        return result;
    },
    fbPopupGoogle:async () =>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        let result = await firebaseApp.auth().signInWithPopup(googleProvider);
        return result;
    },
    addUser:async(u) => {
        await db.collection('users').doc(u.id).set({
            name:u.name,
            avatar:u.avatar
        }, {merge:true})  
    },
    getContatoList:async(userId,chatList)=>{
        let list = [];
        let results = await db.collection('users').get();
        results.forEach(result => {
            let data = result.data();   //aqui a gente verifica se o já não existe o contato no chatList
            if(result.id !== userId && chatList.filter(x => x.with == result.id) ==  false){
                list.push({
                    id:result.id,
                    name:data.name,
                    avatar:data.avatar
                });
            }
        });
        return list;
    },
    addNewChat:async(user,user2) => {
        //criando o colletion do chat onde sera armazenado todas as conversar
        // e alem disso ele fala tambem quem são os usuários envolvidos nesse chat
        let newChat = await db.collection('chats').add({
            message:[],
            users:[user.id,user2.id]
        });
        //adiciona a conversa no users para o destinatario
        db.collection('users').doc(user.id).update({
            chats:firebase.firestore.FieldValue.arrayUnion({
                chatId:newChat.id,
                title:user2.name,
                image:user2.avatar,
                with:user2.id
            })
        });
        //adiciona a conversa no users para o remetente
        db.collection('users').doc(user2.id).update({
            chats:firebase.firestore.FieldValue.arrayUnion({
                chatId:newChat.id,
                title:user.name,
                image:user.avatar,
                with:user.id
            })
        });
    },
    //Monitorador
    onChatList: (userId,setChatList)=>{
        return db.collection('users').doc(userId).onSnapshot((doc)=>{
            if(doc.exists){ //se esse documento existir
                let data = doc.data(); //vamos pegar as informações dele 
                if(data.chats){ //se ele tiver um chat
                    let chats = [...data.chats];
                    chats.sort((a,b) => {
                        if(a.lastMessageDate === undefined){
                            return -1;
                        }
                        if(a.lastMessageDate.seconds < b.lastMessageDate.seconds){
                            return 1;
                        }else{
                            return -1;
                        }
                    })
                    setChatList(chats); //setando o chat no setChatList
                }
            }
        })
    },
    onChatContent:(chatId,setList,setUsers)=>{
        return db.collection('chats').doc(chatId).onSnapshot((doc)=>{
                if(doc.exists){
                    let data = doc.data();
                    setList(data.message);
                    setUsers(data.users)
                }
        })
    },
    sendMessage: async (chatData,userId,type,body,users)=>{
        let now = new Date();
        db.collection('chats').doc(chatData.chatId).update({
            message:firebase.firestore.FieldValue.arrayUnion({
                type,
                author:userId,
                body,
                date:now
            })
        });
        //pecorrendo os users:
        for(let i in users){
            //recuperando 
            let u = await db.collection('users').doc(users[i]).get();
            let uData = u.data();
            //verificando se o usuario tem chat só por via das duvidas:
            if(uData.chats){
                //criando um clone
                let chats = [...uData.chats];
                for(let e in chats){
                    //Se for o meu chat
                    if(chats[e].chatId ==chatData.chatId){
                        //eu vou trocar o lastMessage:
                        chats[e].lastMessage = body;
                        chats[e].lastMessageDate = now;
                    }
                }

                await db.collection('users').doc(users[i]).update({
                    chats
                });
            }
        }

    }

}