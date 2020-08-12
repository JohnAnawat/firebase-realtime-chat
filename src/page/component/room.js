import React, { Component, button } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { fb } from '../../db'
import _ from 'lodash';

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomID: '',
            msg: '',
            dataMSG: [],
            reloads: false
        };
    }

    scrollToBottom = () => {
        const scrollHeight = this.messagesEnd.scrollHeight;
        const height = this.messagesEnd.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        this.setState({ reloads: true })
        var dbProduct = fb.database().ref(this.props.reduxroom.roomid);
        dbProduct.on('value', snapshot => {
            console.log(snapshot.val())

            let dataVal = snapshot.val();
            let data = _(dataVal)
                .keys()
                .map(dataKey => {
                    let cloned = _.clone({ ...dataVal[dataKey], key: dataKey });
                    cloned.key = dataKey;
                    return cloned;
                }).value();
            this.setState({
                dataMSG: data,
                roomID: this.props.reduxroom.roomid,
                reloads: false
            });
        });
        this.scrollToBottom();
    }

    componentWillUnmount() {

    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            let dbCon = fb.database().ref(this.state.roomID);
            let date = new Date().getTime()
            dbCon.push({
                message: this.state.msg,
                name: this.props.reduxname.dataname,
                date: date
            });
            this.setState({ msg: '' })
        }
    }

    render() {

        this.state.dataMSG.sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });

        var temp = []
        var loopData = null
        temp = this.state.dataMSG
        loopData = temp.map((obj, i) => {
            return (
                <div key={'msg' + i} style={itemMSG}>
                    <p className="pointer" style={nameMsg}>คุณ <span>{obj.name}</span></p>
                    <div style={msg}>
                        {obj.message}
                    </div>
                </div>
            )
        })

        return (
            <React.Fragment>
                {this.state.reloads ?
                    <div className="main-pokemon">
                        <div class="pokeball"><span></span></div>
                    </div>
                    : null}
                <div style={mainPage}>
                    <div style={maintitle}>
                        <p className="pointer" style={paragraphTitle}>ห้อง {this.state.roomID}</p>
                    </div>
                    <div style={contentMain}>
                        <div style={contentChat} ref={(el) => { this.messagesEnd = el; }}>
                            {loopData}
                        </div>
                        <div style={boxInput}>
                            <div style={textIninput}>Enter เพื่อส่ง</div>
                            <input style={inputStyle}
                                onChange={(event) => { this.setState({ msg: event.target.value }) }}
                                value={this.state.msg}
                                onKeyDown={this._handleKeyDown}
                            />
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

var msg = {
    backgroundColor: '#dedede',
    marginLeft: '10px',
    padding: '10px 20px',
    borderRadius: '10px',
    marginRight: '10px',
    fontSize: '16px',
}

var nameMsg = {
    color: '#4e4e4e',
    fontSize: '14px',
    margin: '0px'
}

var itemMSG = {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '15px',
    marginTop: '10px'
}

var inputStyle = {
    height: '60px',
    width: '100%',
    color: '#4e4e4e',
    fontSize: '34px',
    border: '3px solid lightgray',
    borderRadius: '10px',
    paddingLeft: '15px'
}

var textIninput = {
    position: 'absolute',
    bottom: '0px',
    right: '15px',
    color: '#888888',
    fontSize: '14px'
}

var boxInput = {
    position: 'relative',
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

var contentMain = {
    width: '100%',
    height: 'calc(100% - 90px)',
    backgroundColor: '#eeeeee',
    borderRadius: '10px'
}

var contentChat = {
    width: '100%',
    height: 'calc(100% - 80px)',
    overflow: 'scroll',
    paddingBottom: '20px'
}

var mainPage = {
    height: '100%', padding: '20px'
}

var maintitle = {
    width: '100%', height: '50px', display: 'flex', alignItems: 'center',
};

var paragraphTitle = {
    fontSize: '30px', color: '#383838', fontWeight: '500'
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

export default connect(mapStatetoProps, mapDispatchtoProps)(Room);