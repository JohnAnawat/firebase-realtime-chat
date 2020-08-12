import React, { Component, button } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameChat: '',
            showAccept: false,
            selectedPage: false,
            realname: '',
        };

        this.handleLoginKeyUp = this.handleLoginKeyUp.bind(this);
    }
    componentDidUpdate() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleLoginKeyUp(event) {
        // console.log(event.target.value.length)
        if (event.target.value.length == 0) {
            this.setState({ showAccept: false })
        } else {
            this.setState({ showAccept: true })
        }
    }

    submitName = () => {
        if (this.state.nameChat.length > 0) {
            this.setState({ selectedPage: true, })
            this.props.setRedux(
                {
                    dataname: this.state.nameChat,
                },
                'Reduxname'
            )
        } else {
            alert("กรุณากรอกชื่อด้วยครับ !")
        }
    }

    submitSelected = () => {
        this.props.dataToYou('CreateRoom')
    }

    submitSelected2 = () => {
        this.props.dataToYou('JoinRoom')
    }

    render() {
        return (
            <React.Fragment>
                {this.state.selectedPage ?
                    <div style={mainPage}>
                        <div style={maintitle}>
                            <p className="pointer" style={paragraphTitle}>คุณ
                                <span style={nameinParagraph}>{this.state.nameChat}</span></p>
                        </div>
                        <div style={boxBtnSpecial}>
                            <button className="cssanimation sequence fadeInBottom grow pointer" onClick={() => { this.submitSelected() }} style={btnSubmitSpecial}>สร้างห้องใหม่</button>
                        </div>
                        <div style={boxBtn}>
                            <p className="cssanimation sequence fadeInBottom colorB pointer" onClick={() => { this.submitSelected2() }} style={btnCancel}>เข้าร่วมแชท</p>
                        </div>
                    </div> :
                    <div style={mainPage}>
                        <div style={maintitle}>
                            <p className="pointer" style={paragraphTitle}>ชื่อของคุณ</p>
                        </div>
                        <div style={boxInput}>
                            <input style={inputStyle}
                                onChange={(event) => { this.setState({ nameChat: event.target.value }) }}
                                onKeyUp={this.handleLoginKeyUp}
                                value={this.state.nameChat} />
                        </div>
                        {this.state.showAccept ?
                            <div style={boxBtn}>
                                <button className="cssanimation sequence fadeInBottom grow pointer" onClick={() => { this.submitName() }} style={btnSubmit}>ยืนยัน</button>
                            </div>
                            : null}

                    </div>}
            </React.Fragment>
        )
    }
}

var btnCancel = {
    fontSize: '30px',
    color: '#6f6f6f',
}

var btnSubmitSpecial = {
    color: '#fff',
    backgroundImage: 'radial-gradient(ellipse farthest-corner at top left, #ff593f 0%, #b31315 100%)',
    border: 'none',
    borderRadius: '6px',
    height: '80px',
    width: '300px',
    fontSize: '30px',
    fontWeight: '500'
}

var btnSubmit = {
    color: '#fff',
    backgroundImage: 'radial-gradient(ellipse farthest-corner at top left, #ff593f 0%, #b31315 100%)',
    border: 'none',
    borderRadius: '6px',
    height: '60px',
    width: '120px',
    fontSize: '20px',
    fontWeight: '500'
}

var boxBtnSpecial = {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '80px',
}

var boxBtn = {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
}

var inputStyle = {
    height: '60px',
    width: '60%',
    color: '#4e4e4e',
    border: '3px solid lightgray',
    borderRadius: '10px',
    fontSize: '34px',
    textAlign: 'center'
}

var boxInput = {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

var mainPage = {
    width: '100%',
    height: '100%'
}

var maintitle = {
    width: '100%',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
    marginBottom: '40px'
};

var paragraphTitle = {
    fontSize: '37px',
    color: '#383838',
    fontWeight: '500'
};

var nameinParagraph = {
    marginLeft: '10px'
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

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);