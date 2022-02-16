import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import './css/Chatting.css';
import AuthApis from '../../api/AuthApis';

var stompClient = null;
const ChattingModalPage = (userId) => {

    const userName = Object.values(userId).join();
   
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: userName,
        receivername: '',
        content: '',
        postcode: '3',
        sellername: 'hong'
    });

    const connect =()=>{
      let Socket = new SockJS('http://localhost:8090/ws');
      stompClient = over(Socket);
      stompClient.connect({}, onConnected, onError);
   }

   const onConnected = () => {
       stompClient.subscribe('/chatroom/public', onContentReceived);
       stompClient.subscribe('/user/'+userData.username+'/private', onPrivateContent);
       userJoin();
    }
    
    const userJoin=()=>{
      var chatContent = {
        senderName: userData.username,
        status:"JOIN"
      };
      stompClient.send("/app/content", {}, JSON.stringify(chatContent));
    }

    const onContentReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateContent = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleContent =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"content": value});
    }

    const sendValue = () => {
        if (stompClient) {
        let chatContent = {
            senderName: userData.username,
            content: userData.content,
            status:"MESSAGE"
          };
          console.log(chatContent);
          stompClient.send("/app/content", {}, JSON.stringify(chatContent));
          setUserData({...userData,"content": ""});
        }
        chatContentHandler(userData);
    }

    const sendPrivateValue=()=>{
        //backend private으로 전송되는 부분 
      if (stompClient) {
        let chatContent = {
          senderName: userData.username,
          receiverName: tab,
          content: userData.content,
          status:"MESSAGE",
          postcode: 3
        };
        
        if(userData.username !== tab){
          privateChats.get(tab).push(chatContent);
          console.log(privateChats);
          setPrivateChats(new Map(privateChats));
        }
        stompClient.send("/app/private-content", {}, JSON.stringify(chatContent));
        setUserData({...userData,"content": ""});
      }
      chatContentHandler(userData);
    }

    const publicKeyPress = (e) => {
        if (e.key === "Enter") {
            sendValue();
        }
    }

    const privateKeyPress = (e) =>{
        if (e.key === "Enter") {
            sendPrivateValue();
        }
    }
    
    const registerUser=()=>{
        connect();
    }
    
    const { content, username, postcode, sellername} = userData;

    const chatContentHandler = async (userData) => {
        try {
          const response = await AuthApis.postChatContent({ content, username, postcode, sellername});
          console.log('postChatContent값', response);
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="container">
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                    <button type="button" className="add-button" onClick={registerUser}>참여하기</button> 
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-contents">
                    {publicChats.map((chat,index)=>(
                        <li className={`content ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="content-data">{chat.content}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-content">
                    <input type="text" className="input-content" placeholder="enter the content" value={userData.content} onChange={handleContent} onKeyPress={publicKeyPress}/> 
                    <button type="submit" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-contents">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`content ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="content-data">{chat.content}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-content">
                    <input type="text" className="input-content" placeholder="enter the content" value={userData.content} onChange={handleContent} onKeyPress={privateKeyPress}/> 
                    <button type="submit" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
    </div>
  );
};
export default ChattingModalPage;