import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import NavBar from "./NavBar.component";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = {
    surveyName: {
        width: "40%"
    },
    inputSurveyName: {
        fontSize: "2em"
    },
    submitSurveyBtn: {
        display: "inline",
        position: "absolute",
        right: "15px",
        bottom:"10%",
        fontWeight: "700"
    },
    headerSurvey: {
        position: "relative"
    }

};

class NewSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.numberOfQuestion = 0;
    }

    componentDidMount() {
        document.title = "New Survey";
    }

    render() {
        return (
            <Container maxWidth="lg">
                <NavBar titlePage={"New Survey"} isHomePage={false} />
                <div className = {this.classes.headerSurvey}>
                <TextField
                    label="Survey Name"
                    margin="normal"
                    placeholder={"Insert your survey name"}
                    className = {this.classes.surveyName}
                    InputProps={{ classes: { input: this.classes.inputSurveyName }}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button className = {this.classes.submitSurveyBtn} variant="outlined" color={"primary"}>Publish</Button>
                </div>
            </Container>

        );
    }
}



export default withStyles(useStyles)(NewSurvey);