import React from "react";
import { HashRouter as Router, Routes, Route} from "react-router-dom";

import LoginPage from "./loginPage";
import ChatHome from "./components/ChatHome";
import AddLink from "./components/AddLink";

const RoutesList = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage/>}/> 
                <Route exact path="/chathome" element={<ChatHome/>}/>
                <Route exact path="/addLink" element={<AddLink/>}/>
            </Routes>
        </Router>
    )
}

export default RoutesList;