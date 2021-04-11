import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import "./auth.css";
import {
	Card,
	Row,
	Col,
	InputGroup,
	FormControl,
	Button,
} from "react-bootstrap";
import { useSpeechSynthesis } from "react-speech-kit";

const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const { speak, voices } = useSpeechSynthesis();

	let voice = null;
	voices.forEach((v) => {
		if (v.lang === "hi-IN") {
			voice = v;
		}
	});

	const postInfo = () => {
		fetch("http://localhost:5000/auth/login", {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.error) {
					speak({
						text: `Unable to sign in. ${data.error}`,
						voice,
					});
					M.toast({ html: data.error });
					return;
				} else {
					speak({
						text: `Signed in successfully as ${username}!`,
						voice,
					});
					M.toast({ html: "Signed in successfully!" });
					console.log(data);
					localStorage.setItem("jwt", data.token);
					localStorage.setItem("user", JSON.stringify(data.user));
					history.push("/usr/contacts");
				}
			})
			.catch((error) => console.log("error", error));
	};

	return (
		<Card className="mycard">
			<div classsname="card auth-card">
				<Row className="justify-content-center">
					<h2 className="brand-logo">Login</h2>
				</Row>
				<Row className="justify-content-center">
					<InputGroup>
						<Col xs={12}>
							<FormControl
								style={{ margin: "5px 5px 5px 5px" }}
								type="text"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Col>
						<Col xs={12}>
							<FormControl
								style={{ margin: "5px 5px 5px 5px" }}
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Col>
						<Button
							onClick={() => postInfo()}
							className="btn-s waves-effect waves-light"
							type="submit"
						>
							Signin{" "}
						</Button>
						<Link to="/signup">Dont have an account?</Link>
					</InputGroup>
					<div
						style={{ display: "flex", justifyContent: "space-around" }}
					></div>
				</Row>
			</div>
		</Card>
	);
};

export default Signin;
