import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import NavBar from "./NavBar.component";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {Add, Delete, DeleteOutline} from "@material-ui/icons";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {toast} from 'react-toastify';
import userService from "../service/user.service";
import surveyService from "../service/survey.service";
import {Redirect} from "react-router-dom";

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
    },
    addSurveyBtn: {
        borderRadius: "15px",
        width: "100%",
        borderStyle: "dashed",
        border: "1px",
        marginTop: "10px"
    },
    typeSelect: {
        width: "100%",
        marginTop: "5px"
    },
    questionContainer: {
        marginTop: "20px",
        borderTop: "solid 1px",
        paddingTop: "10px",
        borderColor: "hsl(0, 0%, 85%)"
    },
    textQuestion: {
        width: "100%"
    },
    textQuestionInputProps: {
        fontSize: "1.5em"
    },
    addSelectionBtn: {
        borderRadius: "30px",
        width: "5%",
        marginLeft: "95%"
    },
    indexOfSelection: {
        marginRight: "15px"
    },
    selectionInput: {
        width: "100%",
        marginTop: "0px"
    }
};

class NewSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.state = {
            surveyName: "",
            listQuestion: [],
            publishDisable: false
        };
        this.identifier = 0;
    }

    componentDidMount() {
        document.title = "New Survey";
    }

    async handleChangeListQuestion(index, change) {
        let j = -1;
        let n = this.state.listQuestion.length;
        for (let i = 0; i < n; i++) {
            if (this.state.listQuestion[i].identifier === index) {
                j = i;
                break;
            }
        }
        if (j == -1) {
            return;
        } else {
            await this.setState((state)=>{
                state.listQuestion[j].type = change.type;
                state.listQuestion[j].payload = change.payload;
                return {
                    listQuestion: state.listQuestion
                };
            });
        }
    }

    async handleChangeSurveyName(e) {
        e.preventDefault();
        await this.setState({
            surveyName: e.target.value
        });
    }

    async addMoreQuestion(e) {
        await this.setState((state)=>{
            state.listQuestion.unshift({
                identifier: this.identifier++
            });
            return {
                listQuestion: state.listQuestion
            };
        });
    }

    async publishSurvey(e) {
        if (this.state.surveyName.length < 5) {
            toast.error("Name of survey must at least 5 character");
            return;
        }
        await this.setState({
            publishDisable: true
        });
        //check if valid
        let listQuestion = this.state.listQuestion.slice().reverse();
        let n = listQuestion.length;
        let valid = true;
        for (let i = 0; i < n; i++) {
            let data = listQuestion[i];
            if (data.payload.question.length < 10) {
                toast.error("Question " + (i+1) + " too short");
                valid = false;
                break;
            }
            if (data.type === "Select") {
                if (data.payload.choices.length < 2) {
                    toast.error("Question " + (i+1) + ": Number of selection must at least two");
                    valid = false;
                    break;
                }
                let check = false;
                for (let j = 0; j < data.payload.choices.length; j++) {
                    if (data.payload.choices[j].length < 1) {
                        check = true;
                        break;
                    }
                }
                if (check) {
                    toast.error("Question " + (i+1) + ": Length of selection is too short");
                    valid = false;
                    break;
                }
            }
        }
        if (valid) {
            let questions = listQuestion.map((e)=> {
                return {
                    type: e.type,
                    payload: e.payload
                };
            });
            try {
                let response = await surveyService.saveSurvey(this.state.surveyName, questions);
                response = response.data;
                if (response.code) {
                    toast.success("Survey published successfully");
                    this.props.history.push("/result/" + response.payload._id);
                    return;
                } else {
                    toast.error(response.reason);
                }

            } catch (e) {
                toast.error(e.message);
            }
        }
        await this.setState({
            publishDisable: false
        });
    }

    async deleteQuestion(index) {
        console.log(index);
        let j = -1;
        let n = this.state.listQuestion.length;
        for (let i = 0; i < n; i++) {
            if (this.state.listQuestion[i].identifier === index) {
                j = i;
                break;
            }
        }
        if (j === -1) {

        } else {
            await this.setState(state=>{
                state.listQuestion.splice(j, 1);
                return {
                    listQuestion: state.listQuestion
                }
            });
        }
    }

    render() {
        if (!userService.isLoggedIn())
            return <Redirect to={{pathname: "/login", state: {from: '/new'}}} />;
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
                    value = {this.state.surveyName}
                    onChange = {(e)=>this.handleChangeSurveyName(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button className = {this.classes.submitSurveyBtn} variant="outlined"
                        color={"primary"}
                        onClick = {(e)=> this.publishSurvey(e)}
                        disabled = {this.state.publishDisable}
                >
                    Publish
                </Button>
                </div>
                <IconButton className = {this.classes.addSurveyBtn} onClick = {(e) => this.addMoreQuestion(e)}>
                    <Add />
                </IconButton>
                {
                    this.state.listQuestion.map((e, index)=>{
                      return <QuestionComponent classes = {this.classes} key = {e.identifier}
                                                index = {e.identifier}
                                                number = {this.state.listQuestion.length - 1 - index}
                                                emitChange={(index, change)=>this.handleChangeListQuestion(index, change)}
                                                emitDelete = {(index)=>this.deleteQuestion(index)} />
                    })
                }
            </Container>
        );
    }
}

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.state = {
            question: {
                type: "Select",
                payload: {
                    question: "",
                    choices: []
                }
            }
        };
        this.emitChange();

    }

    emitChange() {
        this.props.emitChange(this.props.index, this.state.question);
    }

    emitDelete(e) {
        this.props.emitDelete(this.props.index);
    }

    async updateStateQuestion(newPayload) {
        await this.setState(state => {
            state.question.payload = newPayload;
            return {
                question: state.question
            };
        });
        this.emitChange();
    }

    async handleChange(e) {
        e.preventDefault();
        await this.setState((state)=>{
            state.question[e.target.name] = e.target.value;
            return {
                question: state.question
            };
        });
        this.emitChange();
    }

    render() {
        return (
            <div>
                <Grid container className = {this.classes.questionContainer} spacing = {3}>
                    <Grid item xs={2}>
                        <div style={{display: "flex"}}>
                        <Typography variant={"h5"} color={"primary"}>
                            Câu số {this.props.number + 1}
                        </Typography>
                        <IconButton style={{padding: "0px", marginLeft: "10px"}} onClick = {e=>this.emitDelete()}>
                            <DeleteOutline size={"small"}/>
                        </IconButton>
                        </div>
                        <Select
                            inputProps={{
                                name: 'type'
                            }}
                            onChange={(e)=>this.handleChange(e)}
                            value={this.state.question.type}
                            className = {this.classes.typeSelect}
                        >
                            <MenuItem value={"Select"}>Select</MenuItem>
                            <MenuItem value={"Text"}>Text</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs = {10}>
                        <QuestionDesign classes = {this.classes} questionType = {this.state.question.type} updateStateQuestion = {(newState) => this.updateStateQuestion(newState)}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

class QuestionDesign extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.state = {
            question: "",
            choices: []
        };
    }

    updateState() {
        this.props.updateStateQuestion(this.state);
    }

    async addMoreSelection(e) {
        e.preventDefault();
        if (this.state.choices.length > 3) {
            toast.error("We not support more than 4 selection");
            return;
        }
        await this.setState((state)=>{
            state.choices.push("");
            return {
                choices: state.choices
            }
        });
        this.updateState();
    }

    async handleChange(e) {
        e.preventDefault();
        await this.setState({
            question: e.target.value
        });
        this.updateState();
    }

    async handleChangeSelection(e, index) {
        await this.setState(state => {
            state.choices[index] = e;
            return {
                choices: state.choices
            }
        });
        this.updateState();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questionType !== this.props.questionType) {
            this.setState({
                question: "",
                choices: []
            });
        }
    }

    async deleteSelection(index) {
        await this.setState((state)=>{
            state.choices.splice(index, 1);
            return {
                choices: state.choices
            }
        });
        this.updateState();
    }

    render() {
        if (this.props.questionType === "Text") {
            return <TextField
                label="Question"
                margin="normal"
                placeholder={"Insert your question"}
                InputLabelProps={{
                    shrink: true,
                }}
                multiline
                className = {this.classes.textQuestion}
                value = {this.state.question}
                onChange = {(e)=>this.handleChange(e)}
                InputProps={{ classes: { input: this.classes.textQuestionInputProps }}}
            />;
        } else if (this.props.questionType === "Select") {
            return (
                <React.Fragment>
                    <TextField
                        label="Question"
                        margin="normal"
                        placeholder={"Insert your question"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        multiline
                        className = {this.classes.textQuestion}
                        value = {this.state.question}
                        onChange = {(e)=>this.handleChange(e)}
                        InputProps={{ classes: { input: this.classes.textQuestionInputProps }}}
                    />
                    {
                        this.state.choices.map((element, index)=> {
                            return (
                                <div style={{display: "flex"}} key={index} index = {index}>
                                <Typography variant={"h6"}  className={this.classes.indexOfSelection}>{index+1}.</Typography>
                                <TextField
                                margin="normal"
                                placeholder={"Insert your selection"}
                                multiline
                                className = {this.classes.selectionInput}
                                value = {element}
                                onChange = {(e)=>this.handleChangeSelection(e.target.value, index)}
                                />
                                <IconButton onClick={(e)=>this.deleteSelection(index)}>
                                    <Delete fontSize="small"/>
                                </IconButton>
                                </div>
                            );
                        })
                    }
                    {
                        this.state.choices.length > 5?<div></div>:
                        <IconButton className = {this.classes.addSelectionBtn} variant="outlined" onClick = {(e) => this.addMoreSelection(e)}>
                            <Add />
                        </IconButton>
                    }

                </React.Fragment>
            );
        } else {
            return <div></div>;
        }
    }
}



export default withStyles(useStyles)(NewSurvey);