import React,{useState,useEffect} from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Link, Card } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./Message";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AddLink from "./AddLink";
import Stack from '@mui/material/Stack';


function ChatList(props) {

    const [links, setLinks] = useState([]);
    const role=localStorage.getItem("role");
    const navigate=useNavigate();
    var addBtnText=""
    if(role=="true")
        addBtnText="Add Client"
    else
        addBtnText="Add Trader"
    useEffect(()=> {
        axios
        .get("http://localhost:8080/api/getLinksOfUser", {
            "headers": {
                "content-type": "application/json",
                "authorization": "Bearer "+localStorage.getItem("token")
            },
        })
        .then(res => {
            setLinks(res.data);
            console.log(res.data);
        })
        .catch(err=>console.log(err));
    },[]);
    function HandleClick(){
        navigate("/addLink")
    }
    return(
        <div>
            {/* <Paper >
                <div className="people-list"> */}
                <h1>NSE Trader-Client Portal</h1>
                    <Paper component={Stack} direction="column" justifyContent="center">
                        <Button variant="contained" onClick={HandleClick}>{addBtnText}</Button>
                        {   
                            links.map((link,index)=>{
                            return (
                                <Button fullWidth key={index} onClick={e => props.user2(link)} >{link} </Button>
                            )
                            })
                        }
                    </Paper>
         </div>     
    )
}

export default ChatList;