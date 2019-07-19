import React from 'react';
import {Route, Redirect} from 'react-router-dom';

class PrivateRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.validate) {
            return <this.props.mainComponent />;
        } else {
            return <Redirect to={{pathname: this.props.redirectTo, state: {from: document.location.pathname}}} />
        }
    }
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//       props.validator
//         ? <Component {...props} />
//         : <Redirect to={{pathname: "/login", state:{from: props.location}}}/>
//     )} />
// )

export default PrivateRoute;