import React, { Component } from "react";
import { InputGroup, Button, Col, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateMessage, updateHistory } from "../../../redux/actionCreator";
import { ReactMediaRecorder } from "react-media-recorder";
import { CameraAlt, Mic, Send } from "@material-ui/icons";
import "./input.css";

const mapStateToProps = (state) => {
	return {
		reciepient: state.reciepient,
		message: state.message,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateMessage: (new_message) => dispatch(updateMessage(new_message)),
	updateHistory: (new_history) => dispatch(updateHistory(new_history)),
});

class Inputmsg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: "",
			audioFile: "",
		};
		this.enc = null;
		this.msg = "";
		this.imagetoggler = false;
		this.inputref = React.createRef();
		this.fileloader = React.createRef();
	}

	handler(encrypted_data) {
		this.enc = encrypted_data;
	}
	async handleFile(event) {
		this.setState({ selectedFile: event.target.files[0] });
	}
	encrypt = async (event) => {
		this.imagetoggler = true;
		await this.handleFile(event);
		var image = this.state.selectedFile;
		const reader = new FileReader();
		reader.addEventListener(
			"load",
			async () => {
				// this.enc = reader.result
				await this.handler(reader.result);
			},
			false
		);

		if (image) {
			console.log(reader.readAsDataURL(image));
		}
		console.log(reader.result);
	};

	async getHistory() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			from: this.props.reciepient,
			to: this.props.loggedInUser,
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
			credentials: "include",
		};

		await fetch("https://stormy-tundra-81519.herokuapp.com/message/history", requestOptions)
			.then((response) => response.json())
			.then(async (result) => {
				await this.props.updateHistory(result);
				console.log("History from Input.js: ", this.props.history);
			})
			.catch((error) => console.log("error", error));
	}

	resetinput = () => {
		const input = this.inputref.current.reset();
		// const fileinput = this.fileloader.current.reset()
		console.log("input reset", input);
	};

	render() {
		return (
			<InputGroup className="input-bar" style={{ backgroundColor: "white" }}>
				<form className="col-12 row" ref={this.inputref}>
					<Col xs={8} md={10} style={{ padding: "4px 5px 2px 5px" }}>
						<FormControl
							className="FormControl"
							type="text"
							placeholder="Type a message..."
							onChange={({ target: { value } }) => (this.msg = value)}
						></FormControl>
					</Col>

					<ReactMediaRecorder
						render={({
							status,
							startRecording,
							stopRecording,
							mediaBlobUrl,
						}) => {
							const start = () => {
								startRecording();
							};

							const end = async () => {
								stopRecording();
								if (!mediaBlobUrl) return;
								const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
								const reader = new FileReader();
								reader.readAsDataURL(blob);
								reader.onloadend = () => {
									const base64data = reader.result;
									this.imagetoggler = true;
									this.enc = base64data;
								};
							};
							return (
								<Col
									xs={1}
									md={0.5}
									style={{
										// padding: "5px 0px 0px 0px",
										color: `${status === "recording" ? "limegreen" : "black"}`,
									}}
								>
									<Mic
										style={{ margin: "10px 0px 0px 0px " }}
										onTouchStart={start}
										onTouchEnd={end}
										onMouseDown={start}
										onMouseUp={end}
										onMouseLeave={end}
									/>
								</Col>
							);
						}}
					/>
					{/* <Col xs={2} md={1} style={{ padding: "5px 0px 0px 0px", textAlign: "center" }}>
                        <label>
                            <form ref={this.fileloader} >
                                <input className="fileloader" style={{ display: "none" }} id="fileloader" type="file" onChange={e => this.encrypt(e)}></input>

                            </form>
                            <CameraAlt className="camera" style={{ fontSize: 32 ,margin: "0px 0px 0px 0px " }} />
                        </label>
                    </Col> */}

					<Col xs={2} md={1} className="send-col">
						<Button
							className="send"
							onClick={async () => {
								console.log(
									"toggler on start of button click",
									this.imagetoggler
								);
								// var input = window.document.getElementById("fileloader")
								// console.log(input)

								// console.log("file", this.state.selectedFile)
								if (this.imagetoggler) {
									console.log("sending image");
									await this.props.updateMessage({
										from: this.props.loggedInUser,
										to: this.props.reciepient,
										type: "audio",
										enc: this.enc,
									});
									this.imagetoggler = false;
									this.enc = " ";
								} else {
									console.log("sending text");
									await this.props.updateMessage({
										from: this.props.loggedInUser,
										to: this.props.reciepient,
										type: "text",
										text: this.msg,
									});
								}
								await this.props.sendmessage();
								await this.getHistory();
								this.resetinput();
								console.log(
									"toggler on end of button click",
									this.imagetoggler
								);
							}}
							style={{ fontSize: 13, marginRight: "5px" }}
						>
							send
						</Button>
					</Col>
				</form>
			</InputGroup>
		);
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Inputmsg)
);
