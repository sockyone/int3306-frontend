import React from 'react';
// import logo from './logo.svg';
import './App.css';
import userService from './service/user.service';
import Login from './component/Login.component';
import {BrowserRouter, Route} from "react-router-dom";
import SignUp from "./component/SignUp.component";
import PrivateRoute from "./helper/PrivateRoute.component";


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route path = {"/login"} component = {Login} />
                <Route path={"/signup"} component = {SignUp}/>
                <PrivateRoute validator = {userService.isLoggedIn()} component = {Login} redirectTo={"/login"} />
            </BrowserRouter>
        );
    }
}

export default App;
