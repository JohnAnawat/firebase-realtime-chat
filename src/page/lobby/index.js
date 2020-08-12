import React, { Component } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Background from '../../assets/images/bg.jpg';
import logoFirebase from '../../assets/images/firebase-logo.png';
import Login from '../component/login';
import CreateRoom from '../component/createroom';
import JoinRoom from '../component/joinroom';
import Room from '../component/room';


class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLobby: 'login',
            roomId: '',
        };
    }
    componentDidUpdate() {

    }

    componentDidMount() {
        // console.log(this.props.reduxname.dataname)
    }

    componentWillUnmount() {

    }

    dataToYou(value) {
        // console.log('valus', value)
        this.setState({ statusLobby: value })
    }

    dataCreateRoom(value) {
        console.log('valus', value)
        if (value == 'Back') {
            this.setState({ statusLobby: 'login' })
        } else if (value == 'Submit') {
            this.setState({ statusLobby: 'room' })
        }
    }

    dataJoinRoom(value) {
        console.log('valus', value)
        if (value == 'Back') {
            this.setState({ statusLobby: 'login' })
        } else if (value == 'Submit') {
            this.setState({ statusLobby: 'room' })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div style={sectionStyle}>
                    <div style={headerLogo}>
                        <img src={logoFirebase} style={logoStyle} />
                        <p style={textTi}>Firebase Realtime Chat</p>
                    </div>
                    <div style={containerS}>
                        {this.state.statusLobby == 'login' ?
                            <Login dataToYou={this.dataToYou.bind(this)} />
                            : this.state.statusLobby == 'CreateRoom' ?
                                <CreateRoom dataCreateRoom={this.dataCreateRoom.bind(this)} />
                                : this.state.statusLobby == 'JoinRoom' ?
                                    <JoinRoom dataJoinRoom={this.dataJoinRoom.bind(this)} />
                                    : this.state.statusLobby == 'room' ?
                                        <Room roomId={this.state.roomId} />
                                        : null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

var logoStyle = {
    height: '55%',
    objectFit: 'cover'
};

var textTi = {
    fontSize: '30px',
    color: '#444444',
    fontWeight: '900',
    marginLeft: '10px',
}

var sectionStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

var headerLogo = {
    width: '90%',
    height: '15vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

var containerS = {
    backgroundColor: '#fff',
    width: '70%',
    height: '80vh',
    borderRadius: '20px',
    marginBottom: '2vh'
};

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

export default connect(mapStatetoProps, mapDispatchtoProps)(Lobby);