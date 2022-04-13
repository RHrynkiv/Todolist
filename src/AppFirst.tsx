import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import App from "./AppWithReducers";
import {Login} from "./features/Login";

function AppFirst(){
    return(
        <Routes>
            <Route path="/Todolist" element={<App/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="/404" element={<h1>404. Page not found</h1>}/>
            <Route path="*" element={<Navigate to="/404"/>}/>
        </Routes>
    )
}
export default AppFirst