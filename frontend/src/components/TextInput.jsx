import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';


import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "60%",
        position: "fixed",
        bottom: 0,
        right: 0,
    },
    wrapText  : {
        width: "100%"
    },
  })
);

function TextInput(props) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const navigate=useNavigate();
    const classes = useStyles();

    function handleSendMessage(e){

        if(message!=""){
            e.preventDefault();
            var params = JSON.stringify({
            "user1": localStorage.getItem("username"),
            "user2": props.user2,
            "message":message,
            });
            
            console.log(localStorage.getItem("username"));
            console.log(localStorage.getItem("token"));
            axios
                .post("http://localhost:8080/api/addMessage", params, {
                    "headers": {
                        "content-type": "application/json",
                        "authorization": "Bearer "+localStorage.getItem("token")
                    },
                })
                .then(res => {
                    setMessage("");
                    // navigate("/chathome")
                })
                .catch(err=>console.log(err));
        }

          params = JSON.stringify({
          "client": localStorage.getItem("username"),
          "trader": props.user2,
          "text":message,
          "language": "en",
          });

          console.log(params);

            axios.post("http://localhost:8080/api/azure/analyse",params,{
              "headers": {
                "content-type": "application/json",
                "authorization": "Bearer "+localStorage.getItem("token")
              },}
            )
            .then(res => {
              console.log(res.data);
              setMessage("");
            }
            ).catch(err => console.log(err));
    }

    return (
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Type a message"
                className={classes.wrapText}
                margin="normal"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <IconButton onClick={handleSendMessage}><SendIcon /></IconButton>
            {/* <Button variant="contained" color="primary" className={classes.button} onClick={handleSendMessage}>SEND</Button>
             */}
            </form>
    )
}
export default TextInput;


