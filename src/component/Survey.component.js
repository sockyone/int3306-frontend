import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import NavBar from "./NavBar.component";
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import userService from "../service/user.service";
import {Redirect} from "react-router-dom";

const useStyles = {
    multilineField: {
        width: "100%"
    }
};

class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.surveyId = this.props.match.params.id;
    }

    componentDidMount() {
        document.title = "Survey";
    }

    handleChange(e) {
        e.preventDefault();
        console.log(e.target.value);
    }

    render() {
        if (!userService.isLoggedIn())
            return <Redirect to={{pathname: "/login", state: {from: '/survey/'+this.surveyId}}} />;
        return (
            <Container maxWidth="lg">
                <NavBar titlePage={"Survey"} isHomePage={false} />
                <Typography variant={"h6"} color={"primary"}>Câu 1: Do you like me ?</Typography>
                <RadioGroup
                    aria-label="Select"
                    name="selector"
                    onChange={(e)=>this.handleChange(e)}
                >
                    <FormControlLabel value="1" control={<Radio color="primary"/>} label="Không thích" />
                    <FormControlLabel value="2" control={<Radio color="primary"/>} label="Cực kì yêu thích" />
                    <FormControlLabel value="3" control={<Radio color="primary"/>} label="Cũng bình thường" />
                </RadioGroup>
                <Typography variant={"h6"} color={"primary"}>Câu 2: Tell me something about you ?</Typography>
                <TextField
                    multiline
                    rows="2"
                    defaultValue=""
                    margin="normal"
                    className = {this.classes.multilineField}
                />
                <Typography variant={"h6"} color={"primary"}>Câu 3: Tell me something about your hobbit ?</Typography>
                <TextField
                    multiline
                    rows="2"
                    defaultValue=""
                    margin="normal"
                    className = {this.classes.multilineField}
                />
            </Container>
        );
    }
}

class Question extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Typography variant={"h6"} color={"primary"}>{this.props.payload.question}</Typography>
                {
                    this.props.type == "Select" ?
                        <RadioGroup
                            aria-label="Select"
                            name="selector"
                            onChange={(e)=>this.handleChange(e)}
                        >
                            <FormControlLabel value="1" control={<Radio color="primary"/>} label="Không thích" />
                            <FormControlLabel value="2" control={<Radio color="primary"/>} label="Cực kì yêu thích" />
                            <FormControlLabel value="3" control={<Radio color="primary"/>} label="Cũng bình thường" />
                        </RadioGroup>
                        :
                        <TextField
                            multiline
                            rows="2"
                            defaultValue=""
                            margin="normal"
                            className = {this.classes.multilineField}
                        />
                }
            </div>
        );
    }
}

export default withStyles(useStyles)(Survey);