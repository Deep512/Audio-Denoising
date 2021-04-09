import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import { updateHistory } from "../../../redux/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import "./chat.css";

const Chat = (props) => {
	const dispatch = useDispatch();
	const historys = useHistory();
	const history = useSelector((state) => state.history);

	const { speak, voices } = useSpeechSynthesis();

	let voice = null;
	voices.forEach((v) => {
		if (v.lang === "hi-IN") {
			voice = v;
		}
	});

	useEffect(() => {
		async function anyFunction() {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				to: props.recipient,
				from: props.loggedinUser,
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
					console.log("history from contact: ", result);
				})
				.catch((error) => console.log("error", error));
		}
		anyFunction();
	}, [props.loggedinUser]);

	const sayThis = (data) => {
		speak({
			text: data,
			voice,
		});
		M.toast({ html: data });
	};

	return (
		<div className="maindiv">
			<div className="buttons">
				<div
					className="top-left button"
					onClick={() => {
						console.log(props.recipient);
						console.log(history);
					}}
				>
					{" "}
					TL
				</div>
				<div className="top-right button"> TR</div>
				<div
					className="bottom-left button"
					onClick={() => {
						historys.push("/usr/contacts");
						sayThis("Going back to contacts page");
					}}
				>
					Back
				</div>
				<div className="bottom-right button">BR</div>
				<div className="center">Center</div>
			</div>
			<div
				className="current"
				onClick={() => {
					sayThis(`You are on Chat page with ${props.recipient}`);
				}}
			>
				Current
			</div>
		</div>
	);
};

export default Chat;
