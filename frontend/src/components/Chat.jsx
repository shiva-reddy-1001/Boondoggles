import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Link, Card } from "@material-ui/core";
import TextInput from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";
import {useState, useEffect} from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

function Chat(props){

    const [messages, setMessages] = useState([]);

        axios.post("http://localhost:8080/api/getMessages",{
            "user1" : localStorage.getItem("username"),
            "user2" : props.user2,
        },{
            "headers": {
                "content-type": "application/json",
                "authorization": "Bearer "+localStorage.getItem("token")
            },
        })
        .then(res => setMessages(res.data))
        .catch(err => console.log(err));

    var count=6;

    return(
        <div className="restrict-box">
        
        <div>
            <h1>{props.user2}</h1>
                    {
                    messages.slice(messages.length-6,messages.length).map((m, index) => {
                        if(m.sender === localStorage.getItem("username")){
                            return count-- && <MessageRight key={index} message={m.message} displayName = {m.sender} avatarDisp={false} />
                        }
                        else{
                            return count-- && <MessageLeft key={index} message={m.message} displayName = {m.sender} avatarDisp={false} />
                        }
                        })}
                        <div className="message-input">
                        <TextInput style={{marginTop:"auto" }} user2={props.user2}/>
                        </div>
                    
                        </div>
        </div>
    );
}

export default Chat;