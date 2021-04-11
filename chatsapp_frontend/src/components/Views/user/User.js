import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Contacts from "../contacts/Contacts";
import Chat from "../chat/Chat";
import { useHistory, useParams } from "react-router-dom";
import {
	updateHistory,
	updateLoggedInUser,
} from "../../../redux/actionCreator";
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
	var server = "http://localhost:5000/";
	var ws_server = "ws://localhost:5000/";
	var ws = new WebSocket(ws_server + "message");
	var buffer = [];

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
					return <Chat loggedinUser={loggedInUser} recipient={reciepient} />;
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
};

export default User;
