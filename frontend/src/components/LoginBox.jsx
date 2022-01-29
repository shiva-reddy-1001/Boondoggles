import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";

const LoginBox = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = JSON.stringify({
      username: username,
      password: password
    });

    axios
      .post("http://localhost:8080/api/login", params, {
        headers: {
          "content-type": "application/json"
        }
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("role", res.data.role);
        navigate("/chathome");
      })
      .catch((err) => setOpenAlert(true));
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh", backgroundColor: "#9AD0EC" }}
      spacing={5}
    >
      <Grid
        item
        style={{ border: "0.2px solid gray", backgroundColor: "white" }}
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <h3>Welcome Back! 😎</h3>
          <TextField
            variant="outlined"
            fullWidth
            style={{ marginBottom: "2em" }}
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            style={{ marginBottom: "2em" }}
          />
          <Button variant="outlined" onClick={handleSubmit}>
            Login
          </Button>
          <p>
            New User?{" "}
            <a onClick={props.register}>
              <b>Register</b>
            </a>
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginBox;
