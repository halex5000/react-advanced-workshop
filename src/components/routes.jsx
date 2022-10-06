import React, { Component } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import TodoPage from "./to-do-page";
import MyApp from "../App";


export default class Paths extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes> 
                    <Route exact path="/" element={<MyApp />} />
                    <Route exact path="todo" element={<TodoPage />} />
                </Routes> 
            </BrowserRouter>   
                )
    }
}
