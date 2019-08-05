import React from 'react';

import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import userService from "../service/user.service";

const useStyles = {
    paper: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textWidth: {
        width: "100%",
        marginBottom: "0px",
    },
    signInButton: {
        marginTop: "15px",
        width: "100%"
    },
    loginField: {
        marginTop: "10px",
        textAlign: "right"
    },
    signUpLink: {
        marginLeft: "10px",
    },
    errorField: {
        marginTop: "10px",
        color: "red",
        textAlign: "center"
    },
    textWidthGrid: {
        width: "100%",
        marginBottom: "0px"
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

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.state = {
            username: "",
            password: "",
            repassword: "",
            lastName: "",
            firstName: "",
            disable: false
        };
    }

    componentDidMount() {
        document.title = "Sign up";
    }

    async submitForm(e) {
        e.preventDefault();
        if (this.state.password.toString() !== this.state.repassword.toString()) {
            toast.error("Repassword can not different from password");
            return;
        }
        let regex = /^[0-9a-zA-Z_]+$/;
        if (!regex.test(this.state.username)) {
            toast.error("User name only container a-z character, digit, and underscore");
            return;
        }
        regex = /^[a-zA-Z\s]+$/
        if (!regex.test(this.state.firstName)) {
            toast.error("First name only container a-z character");
            return;
        }
        if (!regex.test(this.state.lastName)) {
            toast.error("Last name only container a-z character");
            return;
        }
        this.setState({
            disable: true
        });
        try {
            let response = await userService.signUp({
                username: this.state.username,
                password: this.state.password,
                lastName: this.state.lastName,
                firstName: this.state.firstName
            });
            response = response.data;
            if (response.code) {
                toast.success("Sign up successfully, login again");
                this.props.history.push("/login");
                return;
            } else {
                toast.error(response.reason);
            }
        } catch (e) {
            toast.error(e.message);
        }
        //logic
        this.setState({
            disable: false
        });
    }

    handleOnChangeValue(e) {
        e.preventDefault();
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    render() {
        return (
            <Container maxWidth="sm" className = {this.classes.paper}>
                <CssBaseline />
                <Typography variant="h4" className={this.classes.loginHeader}>Sign up</Typography>

                <form onSubmit={e => this.submitForm(e)}>
                    <Grid container spacing = {2}>
                        <Grid item xs={6}>
                            <TextField
                                label = "First name"
                                name = "firstName"
                                margin = "normal"
                                variant = "outlined"
                                className = {this.classes.textWidthGrid}
                                onChange = {e => this.handleOnChangeValue(e)}
                                disabled = {this.state.disable}
                                value = {this.state.firstname}
                                required
                                inputProps={{ minLength: 3 }}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                label = "Last name"
                                name = "lastName"
                                margin = "normal"
                                variant = "outlined"
                                className = {this.classes.textWidthGrid}
                                onChange = {e => this.handleOnChangeValue(e)}
                                disabled = {this.state.disable}
                                value = {this.state.lastname}
                                required
                                inputProps={{ minLength: 3 }}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label = "Username"
                        name = "username"
                        margin = "normal"
                        variant = "outlined"
                        className = {this.classes.textWidth}
                        onChange = {e => this.handleOnChangeValue(e)}
                        disabled = {this.state.disable}
                        value = {this.state.username}
                        required
                        inputProps={{ minLength: 5 }}
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
                        required
                        inputProps={{ minLength: 6 }}
                    />
                    <TextField
                        label = "Repassword"
                        name = "repassword"
                        margin = "normal"
                        variant = "outlined"
                        type = "password"
                        className = {this.classes.textWidth}
                        onChange = {e => this.handleOnChangeValue(e)}
                        disabled = {this.state.disable}
                        value = {this.state.repassword}
                        required
                        inputProps={{ minLength: 6 }}
                    />

                    <Button color="primary" variant="contained" className={this.classes.signInButton} type="submit">
                        Sign up
                    </Button>

                    <div className = {this.classes.loginField}>
                        <Typography variant = "body2" display="inline">Already have account ?</Typography>
                        <Typography display="inline" className = {this.classes.signUpLink} variant="subtitle1">
                            <Link to={"/login"} className = {this.classes.visitedLink}>Login</Link>
                        </Typography>
                    </div>
                </form>
            </Container>
        );
    }
}

export default withStyles(useStyles)(SignUp);