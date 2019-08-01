import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import {
    AddCircle,
    ArrowBack
} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Toolbar} from "@material-ui/core";
import userService from "../service/user.service";
import {toast} from "react-toastify";

const useStyles = (theme) => ({
    header: {
        margin: "auto"
    },
    appBar: {
        borderBottom: `1px solid  ${theme.palette.divider}`
    },
    userHello: {
        marginRight: '15px'
    },
    logOutButton: {
        textDecoration: "none",
        color: "black"
    }
});

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        if (this.props.isHomePage) {
            this.isHomePage = this.props.isHomePage;
        } else {
            this.isHomePage = false;
        }
        this.titlePage = this.props.titlePage?this.props.titlePage:"Null page";
        this.state = {
            name: "undefined"
        }
        this.getName();
    }

    async getName() {
        let name = 'undefined';
        try {
            name = await userService.getFirstName();
        } catch (e) {
            toast.error(e.message);
        }
        await this.setState({name: name});
    }

    logOut(e) {
        userService.logout();
    }

    render() {
        return (
            <Toolbar className = {this.classes.appBar}>
                {
                    this.isHomePage?(
                        <Link to={"/new"}>
                            <AddCircle color = "primary"/>
                        </Link>
                    ):<Link to={"/"}>
                        <ArrowBack color = "primary"/>
                    </Link>
                }
                <Typography className = {this.classes.header}
                            component="h2"
                            variant = "h5"
                            color = "primary"
                            noWrap
                >
                    {this.titlePage}
                </Typography>

                <Typography className = {this.classes.userHello}
                            variant = "subtitle1"
                            color = "inherit"
                            noWrap
                >
                    Hi, {this.state.name}
                </Typography>
                <Button variant="outlined" size="small" onClick = {e => this.logOut(e)}>
                    <Link className = {this.classes.logOutButton} to={"/login"}> Logout </Link>
                </Button>
            </Toolbar>
        );
    }
}

export default withStyles(useStyles)(NavBar);