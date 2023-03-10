import React from "react";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import List from "./List";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <BrowserRouter basename="/">
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/list" element={<List />}></Route>
        </Routes>
    </BrowserRouter>
);
