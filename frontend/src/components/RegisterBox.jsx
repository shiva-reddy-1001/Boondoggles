import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@material-ui/core";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "Please check your Email or password!"
  );

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, name, username, password, password2, role);
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat) && username && password) {
      const params = JSON.stringify({
        username: username,
        password: password,
        email: email,
        role: role,
        name: name
      });

      axios
        .post("http://localhost:8080/api/register", params, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then((res) => window.location.reload())
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAlertMessage("Please check your inputted details!");
      setOpenAlert(true);
    }
  };
  const handleCheckbox = (e) => {
    setRole(!role);
  };
  return (
    <div className="RegisterBox">
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
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <h3>Join Us! 😎</h3>
            <TextField
              variant="outlined"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              style={{ marginBottom: "2em" }}
            />
            <TextField
              variant="outlined"
              label="Name"
              onChange={(e) => setName(e.target.value)}
              fullWidth
              style={{ marginBottom: "2em" }}
            />
            <TextField
              variant="outlined"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              style={{ marginBottom: "2em" }}
            />
            <TextField
              variant="outlined"
              label="Password"
              fullWidth
              style={{ marginBottom: "2em" }}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControlLabel
              control={<Checkbox checked={role} onChange={handleCheckbox} />}
              label="Sign up as trader"
            />

            <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
              REGISTER
            </Button>
            <p>
              Existing User?{" "}
              <a onClick={props.login}>
                <b>Login</b>
              </a>
            </p>
          </Grid>
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleAlertClose}
          >
            <Alert
              onClose={handleAlertClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
