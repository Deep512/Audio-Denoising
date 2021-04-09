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
	const [ptr, setPtr] = useState(0);

	const { speak, voices } = useSpeechSynthesis();

	let voice = null;
	voices.forEach((v) => {
		if (v.lang === "hi-EN") {
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
					setPtr(result.length - 1);
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

	const readMessage = async (msg) => {
		if (msg === undefined) return;
		sayThis(`From ${msg.from} To ${msg.to} `);
		if (msg.type === "text") {
			sayThis(
				`The text message was ${
					msg.text.charAt(0).toUpperCase() + msg.text.slice(1)
				}`
			);
		} else {
			sayThis(`The audio message was `);
			await new Promise((resolve) => setTimeout(resolve, 6000));
			const audio = new Audio(msg.enc);
			audio.play();
		}
	};

	return (
		<div className="maindiv">
			<div className="buttons">
				<div
					className="top-left button"
					onClick={async () => {
						if (history !== []) {
							if (ptr == 0) {
								sayThis("No more previous messages");
							} else {
								setPtr(ptr - 1);
								var msg = history[ptr - 1];
								console.log(msg);
								readMessage(msg);
								// sayThis(`From ${msg.from} To ${msg.to} `);
								// if (msg.type === "text") {
								// 	sayThis(
								// 		`The text message was ${
								// 			msg.text.charAt(0).toUpperCase() + msg.text.slice(1)
								// 		}`
								// 	);
								// } else {
								// 	sayThis(`The audio message was `);
								// 	await new Promise((resolve) => setTimeout(resolve, 6000));
								// 	const audio = new Audio(msg.enc);
								// 	audio.play();
								// }
							}
							// sayThis(frndlist[ptr]);
						} else {
							sayThis(`There has been no conversation with ${props.recipient}`);
						}
					}}
				>
					Left
				</div>
				<div
					className="top-right button"
					onClick={async () => {
						if (history !== []) {
							if (ptr == history.length - 1) {
								sayThis("No more new messages");
							} else {
								setPtr(ptr + 1);
								var msg = history[ptr + 1];
								console.log(msg);
								sayThis(`From ${msg.from} To ${msg.to} `);
								if (msg.type === "text") {
									sayThis(
										`The text message was ${
											msg.text.charAt(0).toUpperCase() + msg.text.slice(1)
										}`
									);
								} else {
									sayThis(`The audio message was `);
									await new Promise((resolve) => setTimeout(resolve, 6000));
									const audio = new Audio(msg.enc);
									audio.play();
								}
							}
							// sayThis(frndlist[ptr]);
						} else {
							sayThis(`There has been no conversation with ${props.recipient}`);
						}
					}}
				>
					Right
				</div>
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
				<div
					className="center"
					onClick={() => {
						if (history !== []) {
							setPtr(history.length - 1);
							sayThis("Jumping back to latest message");
							readMessage(history[history.length - 1]);
						} else {
							sayThis(`There has been no conversation with ${props.recipient}`);
						}
					}}
				>
					Latest
				</div>
			</div>
			<div
				className="current"
				onClick={() => {
					console.log(history);
					sayThis(
						`You are on Chat page with ${props.recipient}. ${
							history.length !== 0
								? "Current message is "
								: "There are no messages here."
						}`
					);
					readMessage(history[ptr]);
				}}
			>
				Current
			</div>
		</div>
	);
};

export default Chat;
