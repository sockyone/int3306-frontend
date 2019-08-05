import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import NavBar from "./NavBar.component";
import Container from "@material-ui/core/Container";
import { Typography, Button } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import userService from "../service/user.service";
import surveyService from "../service/survey.service";
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

const useStyles = {
    multilineField: {
        width: "100%",
        margin: "0px"
    },
    surveyName: {
        marginTop: "20px"
    },
    questionContainer: {
        width: "95%",
        margin: "auto",
        marginTop: "15px"
    },
    titleSurvey: {
        borderBottom: "1px solid",
        borderColor: "hsl(0, 0%, 50%)",
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "15px",
        marginBottom: "35px"
    },
    submitButton: {
        marginTop: "auto"
    }
};

class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.surveyId = this.props.match.params.id;
        this.state = {
            surveyName: "",
            questions: []
        };
        this.results = null;
        this.load();
    }

    async load() {
        try {
            let res = await surveyService.getSurvey(this.surveyId);
            res = res.data;
            if (res.code) {
                await this.setState({
                    surveyName: res.payload.name,
                    questions: res.payload.questions
                });
                this.results = [];
                let n = this.state.questions.length;
                for (let i = 0; i < n; i++) {
                    this.results.push(null);
                }
                console.log(this.results);
            } else {
                toast.error(res.reason);
            }
        } catch (e) {
            toast.error(e.message);
        }
        console.log(this.state);
    }

    componentDidMount() {
        document.title = "Survey";
    }

    handleChange(e) {
        e.preventDefault();
        console.log(e.target.value);
    }

    updateResult(update, index) {
        this.results[index] = update;
        console.log(this.results);
    }

    async submitSurvey(e) {
        //check
        let valid = true;
        let n = this.results.length;
        for (let i = 0; i < n; i++) {
            if (this.results[i] == null) {
                valid = false;
                toast.error("You must complete survey before submit (question " + (i+1) + " empty)");
                break;
            } else {
                if (this.results[i].type == "Text") {
                    if (this.results[i].payload.trim().length == "") {
                        valid = false;
                        toast.error("Your text answer can not empty (question " + (i+1) + " empty)");
                        break;
                    }
                }
            }
        }
        if (valid) {
            let payload = {
                idSurvey: this.surveyId,
                answers: this.results
            };
            try {
                let response = await surveyService.submitSurvey(payload);
                response = response.data;
                if (response.code) {
                    toast.success("Submit survey successfully");
                    this.props.history.push("/");
                } else {
                    toast.error(response.reason);
                }
            } catch (e) {
                toast.error(e.message);
            }
        }
    }

    render() {
        if (!userService.isLoggedIn())
            return <Redirect to={{ pathname: "/login", state: { from: '/survey/' + this.surveyId } }} />;
        return (
            <Container maxWidth="lg">
                <NavBar titlePage={"Survey"} isHomePage={false} />
                <div className={this.classes.titleSurvey}>
                    <Typography variant={"h4"} color={"primary"} className={this.classes.surveyName}>{this.state.surveyName}</Typography>
                    <Button variant="outlined" color={"primary"} size="medium" className = {this.classes.submitButton} onClick={(e)=>this.submitSurvey(e)}>
                        Submit survey
                    </Button>
                </div>
                {
                    this.state.questions.map((e, index) => {
                        return <Question type={e.type} payload={e.payload} key={index}
                            index={index} classes={this.classes} onUpdateQuestion={(update, index) => this.updateResult(update, index)} />;
                    })
                }
            </Container>
        );
    }
}

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.state = {
            value: "",
            selectValue: -1
        }
    }


    async handleSelectChange(e) {
        e.preventDefault();
        let value = parseInt(e.target.value);
        await this.setState({
            selectValue: value
        });
        this.props.onUpdateQuestion({
            type: this.props.type,
            payload: this.state.selectValue
        }, this.props.index);
    }

    async handleTextChange(e) {
        await this.setState({
            value: e.target.value
        });
        this.props.onUpdateQuestion({
            type: this.props.type,
            payload: this.state.value
        }, this.props.index);
    }

    render() {
        if (!userService.isLoggedIn()) {
            return <Redirect to={{pathname: "/login", state: {from: '/survey/'+this.surveyId}}} />; 
        }
        return (
            <div className={this.classes.questionContainer}>
                <Typography variant={"h6"} color={"primary"}>Question {(this.props.index + 1) + ': ' + this.props.payload.question}</Typography>
                {
                    this.props.type == "Select" ?
                        <RadioGroup
                            aria-label="Select"
                            name="selector"
                            value={this.state.selectValue.toString()}
                            onChange={(e) => this.handleSelectChange(e)}
                        >
                            {
                                this.props.payload.choices.map((e, index) => {
                                    return <FormControlLabel key={index} value={index.toString()} control={<Radio color="primary" />} label={e} checked={this.state.selectValue === index} />;
                                })
                            }
                        </RadioGroup>
                        :
                        <TextField
                            multiline
                            margin="normal"
                            className={this.classes.multilineField}
                            onChange={(e) => this.handleTextChange(e)}
                            value={this.state.value}
                            spellCheck="false"
                        />
                }
            </div>
        );
    }
}

export default withStyles(useStyles)(Survey);