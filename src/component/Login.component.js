import React from 'react';
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import PropTypes from 'prop-types';

const useStyles = {
    paper: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textWidth: {
        width: "80%",
        marginBottom: "0px"
    },
    signInButton: {
        marginTop: "15px",
        width: "80%"
    },
    signUpField: {
        marginTop: "15px"
    },
    signUpLink: {
        marginLeft: "10px"
    }
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
    }

    render() {
        return (
            <Container maxWidth="sm" className = {this.classes.paper}>
                <CssBaseline />
                <Typography variant="h4" className={this.classes.loginHeader}>Login</Typography>

                <TextField
                    label = "Username"
                    name = "username"
                    margin = "normal"
                    variant = "outlined"
                    className = {this.classes.textWidth}
                />
                <TextField
                    label = "Password"
                    name = "password"
                    margin = "normal"
                    variant = "outlined"
                    type = "password"
                    className = {this.classes.textWidth}
                />

                <Button color="primary" variant="contained" className={this.classes.signInButton}>
                    Sign in
                </Button>

                <div className = {this.classes.signUpField}>
                <Typography variant = "p" display="inline">Don't have an account ?</Typography>
                <Typography display="inline" className = {this.classes.signUpLink}><Link href={"/signup"}>Sign up</Link></Typography>
                </div>
            </Container>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Login);