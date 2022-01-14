import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import '@ant-design/pro-layout/dist/layout.css'
import reportWebVitals from "./reportWebVitals";
import Login from './login'
import Home from './home'
import Cookies from "./cookies";



ReactDOM.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/home'} element={<Home/>}/>
            <Route path={'/login'} element={<Login/>}/>
        </Routes>
    </BrowserRouter>,
    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
