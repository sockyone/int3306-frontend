import React from 'react';
import Container from "@material-ui/core/Container";
import {Toolbar} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import userService from "../service/user.service";
import {Redirect} from "react-router-dom";
import {AddCircle} from "@material-ui/icons";
import {toast} from 'react-toastify';
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavBar from "./NavBar.component";

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
    },
    survey: {
        marginTop: "20px",
        '&:hover': {
            backgroundColor: "hsl(0, 0%, 95%)",
            cursor: "pointer"
        }
    },
    createdDayText: {
        size: "60em",
        color: "hsl(0, 0%, 50%)"
    },
    numberResult: {
        position: "absolute",
        right: "50px",
        top: "30%"
    },
    contentSurvey: {
        position: "relative"
    }
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        // toast.success("Welcome to homepage", {
        //     position: toast.POSITION.BOTTOM_RIGHT
        // });
    }

    componentDidMount() {
        document.title = "Survey Controller";
    }

    render() {
        if (userService.isLoggedIn())
            return <Redirect to={"/login"} />
        return (
            <Container maxWidth="lg">
                <NavBar isHomePage = {true} titlePage = {"Survey Controller"}/>
                <Card className = {this.classes.survey}>
                    <CardContent className = {this.classes.contentSurvey}>
                        <Typography variant="h6">Survey name</Typography>
                        <Typography variant="subtitle2" className = {this.classes.createdDayText}>Create day</Typography>
                        <Typography variant="h6" className = {this.classes.numberResult}>#Result: 100</Typography>
                    </CardContent>
                </Card>
                <Card className = {this.classes.survey}>
                    <CardContent className = {this.classes.contentSurvey}>
                        <Typography variant="h6">Survey name</Typography>
                        <Typography variant="subtitle2" className = {this.classes.createdDayText}>Create day</Typography>
                        <Typography variant="h6" className = {this.classes.numberResult}>#Result: 100</Typography>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}

export default withStyles(useStyles)(HomePage);