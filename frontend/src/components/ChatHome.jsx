import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Link, Card } from "@material-ui/core";
import TextInput from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";
import Chat from "./Chat"
import ChatList from "./ChatList"
import CardContent from "@mui/material/CardContent";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useState} from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow:"scroll"
    },
    messagesBody: {
      width: "calc( 100% - 100px )",
      margin: 10,
      height: "calc( 100% - 80px )",
     
    },
  
  })
);

const ChatHome = () => {
  const classes = useStyles();
  const [user2,setUser2]= useState("");
  const handleuser = (val) => {
    setUser2(val);
    console.log(val);
  }
  return (
    <div className="chat-home">
    
      <div className="chat-input">
        <div className={useStyles().container}>
          <Grid container style={{minHeight : "100%"}} spacing={0} direction="row" alignItems="center" justifyContent="flex-start">
            <Grid item sm={4}>
              <ChatList user2={handleuser}/>
            </Grid>
            <Grid item sm={8}>
                {user2!==""  && <Chat user2={user2}/> }
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
