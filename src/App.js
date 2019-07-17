import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div id="container">
                <div id="header">
                    <nav>
                        <a>
                            <img src={require("./assets/images/logo.png")} id="logo" alt="logo" />
                        </a>
                        <div id="from_sign_in">
                            <p>Don't have an account?</p>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">SIGN UP</button>
                        </div>
                    </nav>
                </div>
                <div id="main">
                    <div id="form-conatiner">
                        <h1>Login to your account</h1>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="input" className="form-control" placeholder="Enter Username" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" />
                            <label className="form-check-label" >Remember me</label>
                        </div>
                        <small id="emailHelp" className="form-text text-muted">Tài khoản không hợp lệ!</small>
                        <small id="emailHelp" className="form-text text-muted">Mật khẩu sai!</small>
                        <small id="emailHelp" className="form-text text-muted">Lỗi kết nối</small>
                        <button type="submit" className="btn btn-success btn-block">LOGIN</button>
                        <br></br>
                        <label>Don't have an account?</label>  <a href="#">Sign up</a>
                    </div>
                </div>
                <div id="footer">
                    <a target="_blank" title="Click để vào trang chu">About SurveyN2KT.vn</a>
                    <p className="copyright">Copyright © 2018-2019 SurveyN2KT</p>
                </div>
            </div>
        );
    }
}

export default App;
