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
import surveyService from "./../service/survey.service";

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
        this.state = {
            surveys: []
        }
    }

    componentDidMount() {
        document.title = "Survey Controller";
        this.load();
    }

    goToResult(e, id) {
        this.props.history.push("/result/" + id);
    }

    copyLink(e, id) {
        e.stopPropagation();
        const mark = document.createElement('textarea');
        mark.setAttribute('readonly', 'readonly');
        mark.value = 'http://localhost:3001/survey/' + id;
        mark.style.position = 'fixed';
        mark.style.top = 0;
        mark.style.clip = 'rect(0, 0, 0, 0)';
        document.body.appendChild(mark);
        mark.select();
        document.execCommand('copy');
        document.body.removeChild(mark);
    }

    async load() {
        try {
            let res = await surveyService.getListSurvey();
            res = res.data;
            if (res.code) {
                await this.setState({
                   surveys: res.payload.surveys.map((e)=>{
                       e.count = 'undefined';
                       return e;
                   })
                });
                await this.loadCount();
            } else {
                toast.error(res.reason);
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    async loadCount() {
        let n = this.state.surveys.length;
        for (let i = 0; i < n; i++) {
            let id = this.state.surveys[i]._id;
            try {
                let res = await surveyService.countResult(id);
                res = res.data;
                if (res.code) {
                    await this.setState(state => {
                        state.surveys[i].count = res.payload.count;
                        return {
                            surveys: state.surveys
                        };
                    });
                } else {
                    toast.error(res.reason);
                }
            } catch (e) {
                toast.error(e.message);
            }
        }
    }

    render() {
        if (!userService.isLoggedIn())
            return <Redirect to={{pathname: "/login", state: {from: '/'}}} />;
        return (
            <Container maxWidth="lg">
                <NavBar isHomePage = {true} titlePage = {"Survey Controller"}/>
                {
                    this.state.surveys.map((el, index) => {
                        return (
                        <Card className = {this.classes.survey} onClick={(e)=>this.goToResult(e, el._id)} key = {index}>
                            <CardContent className = {this.classes.contentSurvey}>
                                <Typography variant="h6" style={{display: "inline"}}>{el.name}</Typography>
                                <i onClick = {(e)=>this.copyLink(e, el._id)} style = {{marginLeft: "8px", marginBottom:"10px"}} className="far fa-1.5x fa-copy"></i>
                                <Typography variant="subtitle2" className = {this.classes.createdDayText}>{el.createdDate}</Typography>
                                <Typography variant="h6" className = {this.classes.numberResult}>#Result: {el.count}</Typography>
                            </CardContent>
                        </Card>
                        );
                    })
                }
            </Container>
        );
    }
}

export default withStyles(useStyles)(HomePage);