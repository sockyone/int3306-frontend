import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
    }

    render() {
        return <h1>Nothing</h1>
    }
}

export default withStyles(useStyles)(Result);