import React, {useState, useEffect} from 'react'
import axios from "axios";
import Button from '@material-ui/core/Button';
import { Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Stack from '@mui/material/Stack';
import {useNavigate} from "react-router-dom";

function AddLink(){
    const role=localStorage.getItem("role");
    const [links, setLinks] = useState([]);
    const navigate=useNavigate();
    let callapi="";
    let heading=""
    if(role==='true'){
        callapi="http://localhost:8080/api/getAllClients";
        heading="Select Client";
    }else{
        callapi="http://localhost:8080/api/getAllTraders";
        heading="Select Trader";
    }
        useEffect(()=> {
            axios
            .get(callapi, {
                "headers": {
                    "content-type": "application/json",
                    "authorization": "Bearer "+localStorage.getItem("token")
                },
            })
            .then(res => {
                console.log(res.data);
                setLinks(res.data);
            })
            .catch(err=>console.log(err));
        },[]);
    function HandleClick(e){
        const user2=e;
        const user1=localStorage.getItem("username");
        console.log(user2);
        const params = JSON.stringify({
            user1:user1,
            user2: user2
        });
        console.log(params);
        axios
            .post("http://localhost:8080/api/addLink",params, {
                "headers": {
                "content-type": "application/json",
                "authorization": "Bearer "+localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log("ooo");
                axios.post("http://localhost:8080/api/addNewChat", params,{
                    "headers": {
                        "content-type": "application/json",
                        "authorization": "Bearer "+localStorage.getItem("token")
                    },
                })
                .then(res=>navigate("/chathome"))
                .catch(err=>{console.log(err);navigate("/chathome");});
            })
            .catch(err=>console.log(err));
        
        
    }
    return(
        <Paper component={Stack} direction="column" justifyContent="center">
        <h2 className="selecting">{heading}</h2>
        {   
            links && links.map((link,index)=>{
                return <Button fullWidth key={index} onClick={e=>HandleClick(link.username)} >{link.username} </Button>
            })
        }
        </Paper>
    );

}
export default AddLink;