import React from 'react';

import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

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
            lastname: "",
            firstname: "",
            disable: false
        };
    }

    componentDidMount() {
        document.title = "Sign up";
    }

    async submitForm(e) {
        e.preventDefault();
        this.setState({
            disable: true
        });
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
                                name = "firstname"
                                margin = "normal"
                                variant = "outlined"
                                className = {this.classes.textWidthGrid}
                                onChange = {e => this.handleOnChangeValue(e)}
                                disabled = {this.state.disable}
                                value = {this.state.firstname}
                                required
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                label = "Last name"
                                name = "lastname"
                                margin = "normal"
                                variant = "outlined"
                                className = {this.classes.textWidthGrid}
                                onChange = {e => this.handleOnChangeValue(e)}
                                disabled = {this.state.disable}
                                value = {this.state.lastname}
                                required
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