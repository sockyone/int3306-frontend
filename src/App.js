import React from 'react';
// import logo from './logo.svg';
import './App.css';
import userService from './service/user.service';
import Login from './component/Login.component';
import {BrowserRouter, Route} from "react-router-dom";
import SignUp from "./component/SignUp.component";
import PrivateRoute from "./helper/PrivateRoute.component";
import HomePage from './component/HomePage.component';

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewSurvey from './component/NewSurvey.component';

toast.configure({
    autoClose: 5000,
    draggable: false
});

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Route path = {"/"} exact component = {HomePage} />
                <Route path = {"/login"} exact component = {Login} />
                <Route path = {"/signup"} exact component = {SignUp} />
                <Route path = {"/new"} exact component = {NewSurvey} />

            </BrowserRouter>
        );
    }
}

export default App;
