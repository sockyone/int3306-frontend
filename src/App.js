import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './component/Login.component';
import {BrowserRouter, Route} from "react-router-dom";
import SignUp from "./component/SignUp.component";
import HomePage from './component/HomePage.component';

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewSurvey from './component/NewSurvey.component';
import Survey from './component/Survey.component';
import Result from './component/Result.component';
import RedirectHomepage from './component/RedirectHompage.component';
import './assets/css/fontawesome-free-5.10.0-web/css/all.css';

toast.configure({
    autoClose: 5000,
    draggable: false,
    position: toast.POSITION.BOTTOM_RIGHT
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
                <Route path = {"/survey/:id"} exact component = {Survey} />
                <Route path = {"/result/:id"} exact component = {Result} />
            </BrowserRouter>
        );
    }
}




export default App;
