import React, { Component, useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import Message from "../message/Message";
import Inputmsg from "../input/Input";
import Contacts from "../contacts/Contacts";
import Chat from "../chat/Chat";
import Infobar from "../infobar/Infobar";
import { connect } from "react-redux";
import { withRouter, useHistory, useParams } from "react-router-dom";
import {
    updateHistory,
    updateLoggedInUser,
} from "../../../redux/actionCreator";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./user.css";
import Recorder from "../recorder/Recorder";

const User = (props) => {
    const dispatch = useDispatch();
    const historys = useHistory();
    const { type } = useParams();
    const reciepient = useSelector((state) => state.reciepient);
    const message = useSelector((state) => state.message);
    const history = useSelector((state) => state.history);
    const loggedInUser = useSelector((state) => state.loggedInUser);
    // const [loggedInUser, setLoggedInUser] = useState("");
    var server = "http://localhost:5000/";
    var ws_server = "ws://localhost:5000/";
    var ws = new WebSocket(ws_server + "message");
    var buffer = [];
    // this.history = [];
    // var logout = this.logout.bind(this);

    const getHistory = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            to: reciepient,
            from: loggedInUser,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
            credentials: "include",
        };

        await fetch("http://localhost:5000/message/history", requestOptions)
            .then((response) => response.json())
            .then(async (result) => {
                console.log("data from server:", result);
                dispatch(updateHistory(result));
                console.log("history from contact: ", history);
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        async function anyFunction() {
            ws.onerror = (err) => {
                console.log(err);
            };
            ws.onmessage = (message) => {
                console.log(message.data);
                getHistory();
            };
            await fetch(server + "self", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
                .then((resp) => resp.json())
                .then(async (data) => {
                    console.log("data from fetch(/self): ", data);
                    dispatch(updateLoggedInUser(data.username));
                    // setLoggedInUser(data.username);
                    // console.log("Loggedin User: ", this.state.loggedInUser);
                });
        }
        anyFunction();
    }, [loggedInUser]);

    const Sendmessage = () => {
        console.log("Message body in websocket function:", message);
        let resp = JSON.stringify({
            from: loggedInUser,
            to: reciepient,
            type: message.type,
            enc: message.enc,
            text: message.text,
            timestamp: Date.now(),
        });
        if (ws) {
            buffer.forEach((message) => {
                ws.send(message);
            });
            buffer.length = 0;
            ws.send(resp);
        } else {
            console.log("ws not available");
            if (!buffer.includes(resp)) {
                buffer.push(resp);
            }
        }
    };

    const logout = () => {
        ws.close();
        fetch("http://localhost:5000/auth/logout", { method: "GET" })
            .then((data) => {
                historys.push("/signin");
                // this.props.history.push("/signin");
                // console.log(this.props.history);
            })
            .catch((err) => console.log(err));
    };

    if (loggedInUser !== "") {
        switch (type) {
            case "contacts": {
                return <Contacts loggedinUser={loggedInUser} logout={logout} />;
            }
            case "chat": {
                if (reciepient !== undefined) {
                    return (
                        <Chat
                            loggedinUser={loggedInUser}
                            recipient={reciepient}
                        />
                    );
                }
            }
            case "recorder": {
                if (reciepient !== undefined) {
                    return <Recorder sendMessage={Sendmessage} />;
                }
            }
            default: {
                return null;
            }
        }
    } else {
        return null;
    }
    // if (loggedInUser !== "") {
    // 	return (
    // 		<div>
    // 			<Route
    // 				path="/usr/contacts"
    // 				render={() => {
    // 					return <Contacts loggedinUser={loggedInUser} logout={logout} />;
    // 				}}
    // 			/>
    // 			<Route
    // 				path="/usr/chat"
    // 				render={() => {
    // 					return <p>HII</p>;
    // 				}}
    // 			/>
    // 		</div>
    // <div className="maindiv">
    // 	<Container fluid className="container  m-md-auto ">
    // 		<Row>
    // 			<Col xs={4} classname="left-col">
    // 				<Contacts loggedinUser={this.state.loggedInUser} />
    // 			</Col>
    // 			<Col xs={8} className="infobar-row">
    // 				<Infobar username={this.props.reciepient} logOut={this.logout} />
    // 				<Row>
    // 					<Message loggedInUser={this.state.loggedInUser} />
    // 				</Row>
    // 				<Row className="inputrow">
    // 					<Inputmsg
    // 						sendmessage={this.Sendmessage}
    // 						loggedInUser={this.state.loggedInUser}
    // 					/>
    // 				</Row>
    // 			</Col>
    // 		</Row>
    // 	</Container>
    /* <div className="buttons">
					<div className="top-left button"> TL</div>
					<div className="top-right button"> TR</div>
					<div className="bottom-left button">BL</div>
					<div className="bottom-right button">BR</div>
					<div className="center">Center</div>
				</div>
				<div className="current">Current</div> */
    // </div>
    // 	);
    // } else {
    // 	return null;
    // }
};

export default User;

// const mapStateToProps = (state) => {
// 	return {
// 		reciepient: state.reciepient,
// 		message: state.message,
// 		history: state.history,
// 		// userLoggedIn: state.loggedInUser,
// 	};
// };

// const mapDispatchToProps = (dispatch) => ({
// 	updateHistory: (new_history) => dispatch(updateHistory(new_history)),
// });

// class Chats extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			loggedInUser: "",
// 		};

// 		this.server = "http://localhost:5000/";
// 		this.ws_server = "ws://localhost:5000/";
// 		this.ws = new WebSocket(this.ws_server + "message");
// 		this.buffer = [];
// 		// this.history = [];
// 		this.logout = this.logout.bind(this);
// 	}

// 	async getHistory() {
// 		var myHeaders = new Headers();
// 		myHeaders.append("Content-Type", "application/json");

// 		var raw = JSON.stringify({
// 			to: this.props.reciepient,
// 			from: this.state.loggedInUser,
// 		});

// 		var requestOptions = {
// 			method: "POST",
// 			headers: myHeaders,
// 			body: raw,
// 			redirect: "follow",
// 			credentials: "include",
// 		};

// 		await fetch("http://localhost:5000/message/history", requestOptions)
// 			.then((response) => response.json())
// 			.then(async (result) => {
// 				console.log("data from server:", result);
// 				// console.log(this.props.history);
// 				await this.props.updateHistory(result);
// 				console.log("History from socket: ", this.props.history);
// 			})
// 			.catch((error) => console.log("error", error));
// 	}

// 	async componentDidMount() {
// 		this.ws.onerror = (err) => {
// 			console.log(err);
// 		};
// 		this.ws.onmessage = (message) => {
// 			console.log(message.data);
// 			this.getHistory();
// 		};
// 		await fetch(this.server + "self", {
// 			method: "GET",
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "include",
// 		})
// 			.then((resp) => resp.json())
// 			.then(async (data) => {
// 				console.log("data from fetch(/self): ", data);
// 				this.setState({ loggedInUser: data.username });
// 				// await this.props.updateLoggedInUser(data.username);
// 				console.log("Loggedin User: ", this.state.loggedInUser);
// 			});
// 	}

// 	Sendmessage = () => {
// 		console.log("Message body in websocket function:", this.props.message);
// 		let resp = JSON.stringify({
// 			from: this.state.loggedInUser,
// 			to: this.props.reciepient,
// 			type: this.props.message.type,
// 			enc: this.props.message.enc,
// 			text: this.props.message.text,
// 			timestamp: Date.now(),
// 		});
// 		if (this.ws) {
// 			this.buffer.forEach((message) => {
// 				this.ws.send(message);
// 			});
// 			this.buffer.length = 0;
// 			this.ws.send(resp);
// 		} else {
// 			console.log("ws not available");
// 			if (!this.buffer.includes(resp)) {
// 				this.buffer.push(resp);
// 			}
// 		}
// 	};

// 	logout = () => {
// 		this.ws.close();
// 		fetch("http://localhost:5000/auth/logout", { method: "GET" })
// 			.then((data) => {
// 				// this.props.history.push("/signin");
// 				// console.log(this.props.history);
// 			})
// 			.catch((err) => console.log(err));
// 	};

// 	render() {
// 		if (this.state.loggedInUser !== "") {
// 			return (
// 				<Route
// 					path="/usr/contacts"
// 					render={() => {
// 						return <Contacts loggedinUser={this.state.loggedInUser} />;
// 					}}
// 				/>
// 				// <div className="maindiv">
// 				// 	<Container fluid className="container  m-md-auto ">
// 				// 		<Row>
// 				// 			<Col xs={4} classname="left-col">
// 				// 				<Contacts loggedinUser={this.state.loggedInUser} />
// 				// 			</Col>
// 				// 			<Col xs={8} className="infobar-row">
// 				// 				<Infobar username={this.props.reciepient} logOut={this.logout} />
// 				// 				<Row>
// 				// 					<Message loggedInUser={this.state.loggedInUser} />
// 				// 				</Row>
// 				// 				<Row className="inputrow">
// 				// 					<Inputmsg
// 				// 						sendmessage={this.Sendmessage}
// 				// 						loggedInUser={this.state.loggedInUser}
// 				// 					/>
// 				// 				</Row>
// 				// 			</Col>
// 				// 		</Row>
// 				// 	</Container>
// 				/* <div className="buttons">
// 						<div className="top-left button"> TL</div>
// 						<div className="top-right button"> TR</div>
// 						<div className="bottom-left button">BL</div>
// 						<div className="bottom-right button">BR</div>
// 						<div className="center">Center</div>
// 					</div>
// 					<div className="current">Current</div> */
// 				// </div>
// 			);
// 		} else {
// 			return null;
// 		}
// 	}
// }

// // export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
