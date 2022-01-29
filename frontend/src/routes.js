import React from "react";
import { HashRouter as Router, Routes, Route} from "react-router-dom";


import LoginPage from "./loginPage";
import ChatHome from "./components/ChatHome";


const RoutesList = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/home" element={<ChatHome/>} />
                <Route exact path="/" element={<LoginPage/>} /> 
            </Routes>
        </Router>
    )
}

export default RoutesList;