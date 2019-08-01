import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import NavBar from "./NavBar.component";
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";

const useStyles = {

};


class Result extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.surveyId = this.props.match.params.id;
    }

    componentDidMount() {
        document.title = "Result";
    }

    handleChange(e) {
        e.preventDefault();
        console.log(e.target.value);
    }

    render() {
        return (
            <Container maxWidth="lg">
                <NavBar titlePage={"Result"} isHomePage={false} />
            </Container>
        );
    }
}

export default withStyles(useStyles)(Result);