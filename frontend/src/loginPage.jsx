import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import LoginBox from "./components/LoginBox";
import RegisterBox from "./components/RegisterBox";

const LoginPage = () => {

    const [loginMode, setLoginMode] = useState(false)
    const switchMode = () => {
        setLoginMode(!loginMode);
    }
    return (
        <div className="LoginGrid">
            <Grid container spacing={2} height="100%">
                <Grid item xs={12} md={12} lg={12}>
                    {!loginMode ? <LoginBox register={switchMode} /> :
                        <RegisterBox login={switchMode}></RegisterBox>}
                </Grid>
                
            </Grid>
        </div>
    );
};

export default LoginPage;