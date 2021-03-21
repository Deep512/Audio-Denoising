import React, { Component } from 'react';
import { Row, Col, Container, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Message from '../message/Message'
import Inputmsg from '../input/Input'
import Contacts from '../contacts/Contacts'
import Infobar from '../infobar/Infobar'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateHistory } from "../../../redux/actionCreator";
import './chat.css'

const mapStateToProps = state => {
    return {
        reciepient: state.reciepient,
        message: state.message,
        history: state.history,
        // userLoggedIn: state.loggedInUser,
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateHistory: (new_history) => dispatch(updateHistory(new_history)),
})

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: "",
        }

        this.server = "http://localhost:5000/";
        this.ws_server = "ws://localhost:5000/";
        this.ws = new WebSocket(this.ws_server + 'message');
        this.buffer = [];
        this.history = [];
        this.logout = this.logout.bind(this)
    };

    async getHistory() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "to": this.props.reciepient, "from": this.state.loggedInUser });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            credentials: 'include'
        };

        await fetch("http://localhost:5000/message/history", requestOptions)
            .then(response => response.json())
            .then(async result => {
                console.log("data from server:", result)
                await this.props.updateHistory(result);
                console.log("History from socket: ", this.props.history)
            })
            .catch(error => console.log('error', error));

    }

    async componentDidMount() {

        this.ws.onerror = (err) => {
            console.log(err);
        }
        this.ws.onmessage = (message) => {
            console.log(message.data);
            this.getHistory();
        };
        await fetch(this.server + 'self', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(resp => resp.json())
            .then(async data => {
                console.log("data from fettch(/self): ", data);
                this.setState({ loggedInUser: data.username })
                // await this.props.updateLoggedInUser(data.username);
                console.log("Loggedin User: ", this.state.loggedInUser)

            });
    }

    Sendmessage = () => {
        console.log("Message body in websocket function:", this.props.message)
        let resp = JSON.stringify({
            from: this.state.loggedInUser,
            to: this.props.reciepient,
            type: this.props.message.type,
            enc: this.props.message.enc,
            text: this.props.message.text,
            timestamp: Date.now()
        });
        if (this.ws) {
            this.buffer.map((message) => {
                this.ws.send(message);
            })
            this.buffer.length = 0;
            this.ws.send(resp);
        }
        else {
            console.log("ws not available");
            if (!this.buffer.includes(resp)) {
                this.buffer.push(resp);
            }
        }

    }

    logout = () => {

        this.ws.close()
        fetch("http://localhost:5000/auth/logout", { method: "GET" })
            .then(data => {
                this.props.history.push('/signin')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="maindiv">
                <Container fluid className="container  m-md-auto " >
                    <Row>
                        <Col xs={4} classname="left-col">
                            <Contacts loggedinUser={this.state.loggedInUser} />
                        </Col>
                        <Col xs={8} className="infobar-row">
                            <Infobar username={this.props.reciepient} logOut={this.logout} />
                            <Row >
                                <Message loggedInUser={this.state.loggedInUser} />
                            </Row>
                            <Row className="inputrow" >
                                <Inputmsg sendmessage={this.Sendmessage} loggedInUser={this.state.loggedInUser} />
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));