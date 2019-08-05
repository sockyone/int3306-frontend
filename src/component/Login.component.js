import React from 'react';
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import userService from './../service/user.service';
import {toast} from 'react-toastify';

const useStyles = {
    paper: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textWidth: {
        width: "80%",
        marginBottom: "0px",
        marginLeft: "10%"
    },
    signInButton: {
        marginTop: "15px",
        width: "80%",
        marginLeft: "10%"
    },
    signUpField: {
        marginTop: "10px"
    },
    signUpLink: {
        marginLeft: "10px",
    },
    errorField: {
        marginTop: "10px",
        color: "red",
        textAlign: "center"
    },
    visitedLink: {
        '&:visited': {
            color: "blue"
        },
        textDecoration: "none",
        '&:hover': {
            textDecoration: "underline"
        }
    }

};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.state = {
            username: "",
            password: "",
            disable: false
        };
        this.errorExist = false;
        this.errorPassword = false;
        if (this.props.location.state) {
            this.redirectUrl = this.props.location.state.from;
        }
        console.log(this.redirectUrl);
    }

    componentDidMount() {
        document.title = "Login";
    }

    async submitForm(e) {
        e.preventDefault();
        if (this.state.username === "" || this.state.password ==="") {
            toast.error("Username and password can not empty");
            return;
        }
        this.setState({
            disable: true
        });
        try {
            let response = await userService.login(this.state.username, this.state.password);
            response = response.data;
            console.log(response);
            if (response.code) {
                userService.setUser(response.payload);
                if (this.redirectUrl) {
                    this.props.history.push(this.redirectUrl);
                    return;
                } else {
                    this.props.history.push("/");
                    return;
                }
            } else {
                toast.error(response.reason);
            }
        } catch (e) {
            toast.error(e.message);
        }
        this.setState({
            disable: false
        });
    }

    async handleOnChangeValue(e) {
        e.preventDefault();
        let obj = {};
        obj[e.target.name] = e.target.value;
        await this.setState(obj);
    }

    render() {
        return (
            <Container maxWidth="sm" className = {this.classes.paper}>
                <CssBaseline />
                <Typography variant="h4" className={this.classes.loginHeader}>Login</Typography>
                
                <form onSubmit={e => this.submitForm(e)}>
                <TextField
                    label = "Username"
                    name = "username"
                    margin = "normal"
                    variant = "outlined"
                    className = {this.classes.textWidth}
                    onChange = {e => this.handleOnChangeValue(e)}
                    disabled = {this.state.disable}
                    value = {this.state.username}
                />
                <TextField
                    label = "Password"
                    name = "password"
                    margin = "normal"
                    variant = "outlined"
                    type = "password"
                    className = {this.classes.textWidth}
                    onChange = {e => this.handleOnChangeValue(e)}
                    disabled = {this.state.disable}
                    value = {this.state.password}
                />

                <Button color="primary" variant="contained" className={this.classes.signInButton} type="submit">
                    Sign in
                </Button>
                </form>
                
                {/*error field*/}
                <div className = {this.classes.errorField}>
                    <Typography variant = "subtitle1" hidden = {!this.errorExist}>Tài khoản không tồn tại</Typography>
                    <Typography variant = "subtitle1" hidden = {!this.errorPassword}>Sai mật khẩu</Typography>
                </div>

                <div className = {this.classes.signUpField}>
                <Typography variant = "body2" display="inline">Don't have an account ?</Typography>
                <Typography display="inline" className = {this.classes.signUpLink} variant="subtitle1">
                    <Link className = {this.classes.visitedLink}  to={"/signup"}>Sign up</Link>
                </Typography>
                </div>
            </Container>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Login);