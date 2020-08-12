import React, { Component } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './main.css'
import Routing from './router'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // dataComponent: 'start'
        };
    }
    componentDidUpdate() {
        // console.log("DID UPDATE from main :===> ")
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <React.Fragment>
                <Routing />
            </React.Fragment>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        reduxname: state.reduxname,
        reduxroom: state.reduxroom,
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        setRedux: (br, type) => {
            dispatch({
                type: type,
                payload: br,
            }
            )
        },
    }
}

export default withRouter(
    connect(mapStatetoProps, mapDispatchtoProps)(Main)
);