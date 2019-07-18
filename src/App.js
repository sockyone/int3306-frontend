import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserService from './service/user.service';
import Login from './component/Login.component';
import {BrowserRouter, Route} from "react-router-dom";
import SignUp from "./component/SignUp.component";


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route path={"/"} exact component={Login}/>
                <Route path={"/signup"} component = {SignUp}/>
            </BrowserRouter>
        );
    }
}

export default App;
