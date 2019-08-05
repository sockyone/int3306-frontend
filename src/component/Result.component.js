import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import NavBar from "./NavBar.component";
import Container from "@material-ui/core/Container";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import userService from "../service/user.service";
import surveyService from "../service/survey.service";
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Redirect } from 'react-router-dom';

const useStyles = {
    centerResult: {
        margin: "auto",
        width: "85%",
        borderTop: "1px solid",
        paddingTop: "15px",
        marginTop: "15px",
        borderColor: "hsl(0, 0%, 85%)"
    },
    surveyTitle: {
        marginLeft: "7.5%",
        marginTop: "25px"
    }
};

const data = [{ name: 'A', value: 10 }, { name: 'B', value: 10 },
{ name: 'C', value: 250 }, { name: 'D', value: 100 }];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


class Result extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.surveyId = this.props.match.params.id;
        this.state = {
            survey: {},
            results: [],
            loading: true,
            notOwnThisSurvey: false,
            noResult: false
        };
        this.checkOwn();
        this.getResultData();
    }

    async checkOwn() {
        try {
            let response = await surveyService.checkIfOwnSurvey(this.surveyId);
            response = response.data;
            if (response.code) {
                await this.setState({
                    loading: false,
                    notOwnThisSurvey: !response.payload.check
                });
            } else {
                toast.error(response.reason);
                //this.props.history.push("/");
            }
        } catch (e) {
            toast.error(e.message);
            //this.props.history.push("/");
        }
    }

    componentDidMount() {
        document.title = "Result";
    }

    handleChange(e) {
        e.preventDefault();
        console.log(e.target.value);
    }

    async getResultData() {
        try {
            let response = await surveyService.getResultSurvey(this.surveyId);
            response = response.data;
            if (response.code) {
                await this.setState({
                    results: response.payload.answers,
                    survey: response.payload.survey
                });
                if (this.state.results.length < 1) {
                    await this.setState({
                        noResult: true
                    });
                }
            } else {
                toast.error(response.reason);
            }
        } catch (e) {
            toast.error(e.message);
        }
    }


    render() {
        if (!userService.isLoggedIn()) return <Redirect to={{ pathname: "/login", state: { from: '/result/' + this.surveyId } }} />;
        if (this.state.loading) {
            return <Typography variant={"h5"} color={"primary"}>Loading...</Typography>
        }
        if (this.state.notOwnThisSurvey) {
            toast.warn("You do not own this survey");
            return <Redirect to={{ pathname: "/" }} />;
        }
        if (this.state.noResult) {
            toast.warn("No result for this survey");
            return (
                <Container maxWidth="lg">
                    <NavBar titlePage={"Result"} isHomePage={false} />
                    <Typography variant={"h5"} color={"primary"} className={this.classes.surveyTitle}>No result found</Typography>
                </Container>
            );
        }
        return (
            <Container maxWidth="lg">
                <NavBar titlePage={"Result"} isHomePage={false} />
                <Typography variant={"h4"} color={"primary"} className={this.classes.surveyTitle}>{this.state.survey.name}</Typography>
                {
                    this.state.results.map((e, index) => {
                        return <QuestionResult result={e} questionInfo={this.state.survey.questions[index].payload}
                            key={index} index={index} type={this.state.survey.questions[index].type} classes={this.classes} />;
                    })
                }
            </Container>
        );
    }
}

class QuestionResult extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.state = {
            data: [{ name: 'loading', value: 100 }]
        };
    }

    initChartData() {
        let data = [];
        //init
        let n = this.props.questionInfo.choices.length;
        for (let i = 0; i < n; i++) {
            data[i] = {
                name: this.props.questionInfo.choices[i],
                value: 0
            }
        }
        let nCount = this.props.result.length;
        for (let i = 0; i < nCount; i++) {
            data[parseInt(this.props.result[i])].value++;
        }
        data = data.filter((value) => {
            return value.value != 0;
        });
        this.setState({
            data: data
        });
    }

    componentDidMount() {
        if (this.props.type == "Select") {
            this.initChartData();
        }
    }


    render() {
        return (
            <div className={this.classes.centerResult}>
                <Typography variant={"h6"} color={"primary"}>Question {this.props.index + 1}: {this.props.questionInfo.question}</Typography>
                {
                    this.props.type === "Select" ?
                        <Chart data={this.state.data} />
                        :
                        <TextChart data={this.props.result} />
                }
            </div>
        );
    }
}

class TextChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List style={{ maxHeight: "200px", overflow: "auto", overflowX: "visible" }}>
                {
                    this.props.data.map((e, index) => {
                        return (
                            <ListItem button key={index}>
                                <ListItemText primary={e} />
                            </ListItem>
                        );
                    })
                }
            </List>
        );
    }
}


class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    formatLegend(value, entry, index) {
        if (value.length > 40) return value.slice(0, 40) + '...';
        else return value;
    }

    render() {
        return (
            <PieChart width={700} height={250}>
                <Pie
                    data={this.props.data}
                    cx={200}
                    cy={125}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    legendType={"rect"}
                >
                    {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend align="right" layout="vetical" verticalAlign="middle" width="250px"
                    formatter={(value, entry, index) => this.formatLegend(value, entry, index)} />
            </PieChart>
        );
    }
}

export default withStyles(useStyles)(Result);