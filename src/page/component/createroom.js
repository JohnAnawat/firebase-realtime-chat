import React, { Component, button } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { fb } from '../../db'

class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameRoom: '',
            reloads: false,
        };
    }
    componentDidUpdate() {

    }

    componentDidMount() {
        console.log(this.props.reduxname.dataname)
    }

    componentWillUnmount() {

    }

    back = () => {
        this.props.dataCreateRoom('Back')
    }
    submitCreate = () => {
        if (this.state.nameRoom.length > 0) {
            this.setState({ reloads: true })
            let dbCon = fb.database().ref(this.state.nameRoom);
            dbCon.once('value', snapshot => {
                if (snapshot.val() == null) {
                    let dbConX = fb.database().ref(this.state.nameRoom);
                    let date = new Date().getTime()
                    dbConX.push({
                        message: 'start chat now !!!',
                        name: "bot",
                        date: date
                    });
                    this.props.setRedux(
                        {
                            roomid: this.state.nameRoom,
                        },
                        'Reduxroom'
                    )
                    this.setState({ reloads: false })
                    this.props.dataCreateRoom('Submit')
                } else {
                    this.setState({ reloads: false })
                    alert("ขออภัย ห้องนี้มีคนสร้างแล้ว !")
                }
            });
        } else {
            alert("กรุณากรอกชื่อห้องด้วยครับ !")
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.reloads ?
                    <div className="main-pokemon">
                        <div class="pokeball"><span></span></div>
                    </div>
                    : null}
                <div style={maincontent}>
                    <div style={maintitle}>
                        <p className="pointer" style={paragraphTitle}>สร้างห้องใหม่</p>
                    </div>
                    <div style={boxInput}>
                        <input style={inputStyle}
                            placeholder={'ชื่อห้อง'}
                            onChange={(event) => { this.setState({ nameRoom: event.target.value }) }}
                            value={this.state.nameRoom} />
                    </div>
                    <div style={boxBtn}>
                        <button className="cssanimation sequence fadeInBottom colorB pointer" onClick={() => { this.back() }} style={btnCancel}>กลับ</button>
                        <button className="cssanimation sequence fadeInBottom grow pointer" onClick={() => { this.submitCreate() }} style={btnSubmit}>ยืนยัน</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

var boxInput = {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

var inputStyle = {
    height: '60px',
    width: '60%',
    color: '#4e4e4e',
    border: '3px solid lightgray',
    borderRadius: '10px',
    fontSize: '34px',
    textAlign: 'center'
}

var boxBtn = {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
}

var btnSubmit = {
    color: '#fff',
    backgroundImage: 'radial-gradient(ellipse farthest-corner at top left, #ff593f 0%, #b31315 100%)',
    border: 'none',
    borderRadius: '6px',
    height: '60px',
    width: '120px',
    fontSize: '20px',
    fontWeight: '500',
    marginLeft: '20px'
}

var btnCancel = {
    color: '#6f6f6f',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    height: '60px',
    width: '120px',
    fontSize: '20px',
    fontWeight: '500'
}

var maincontent = {
    width: '100%',
    height: '100%'
};

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

export default connect(mapStatetoProps, mapDispatchtoProps)(CreateRoom);