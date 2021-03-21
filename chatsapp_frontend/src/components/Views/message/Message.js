import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './message.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateMessage, updateHistory } from '../../../redux/actionCreator'
import { useSpeechSynthesis } from 'react-speech-kit';
import ReactAudioPlayer from 'react-audio-player';

const mapStateToProps = state => {
    return {
        reciepient: state.reciepient,
        message: state.message,
        history: state.history,
    };
}

const mapDispatchToProps = (dispatch) => ({
    updateMessage: (new_message) => dispatch(updateMessage(new_message)),
    updateHistory: (new_history) => dispatch(updateHistory(new_history)),
})

const MessageText = ({ text }) => {
    const { speak, voices } = useSpeechSynthesis();

    let voice = null;
    voices.forEach(v => {
        if (v.lang === 'hi-IN') {
            voice = v;
        }
    })

    return (
        <span>{text}
            <span
                onClick={() => speak({
                    text: text.charAt(0).toUpperCase() + text.slice(1),
                    voice
                })}>🔊</span></span>
    )
}
class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hstry: this.props.history,
        }
    }


    render() {
        const t_hstry = [...this.props.history];
        console.log("HIstory used to display", t_hstry)
        const history_messages = t_hstry.map((msg) => {
            if ((msg.from === this.props.loggedInUser) && (msg.to === this.props.reciepient)) {
                if (msg.type === "img") {
                    return (
                        <Card key={msg.timestamp} className="img-from-client " style={{ border: "none" }}>
                            <ReactAudioPlayer
                                src={msg.enc}
                                controls
                            />
                            {/* <img class="image" src={msg.enc} alt="video" /> */}
                        </Card>
                    )
                }
                return (
                    <Card key={msg.timestamp} className="msg-from-client col-offset-left-8 col-4">
                        <CardBody className="cardbody"> <MessageText text={msg.text} /> </CardBody>
                    </Card>
                )
            }
            else if (msg.from === this.props.reciepient && msg.to === this.props.loggedInUser) {
                if (msg.type === "img") {
                    return (
                        <Card key={msg.timestamp} className='img-to-client ' style={{ border: "none" }}>
                            {/* <img class="image" src={msg.enc} alt="video" /> */}
                            <ReactAudioPlayer
                                src={msg.enc}
                                controls
                            />
                        </Card>
                    )
                }
                return (
                    <Card key={msg.timestamp} className='msg-to-client col-offset-8 col-4'>
                        <CardBody className="cardbody" > <MessageText text={msg.text} /> </CardBody>
                    </Card>
                )
            }
            // This should never happen
            else {
                console.log("Invalid state reached...");
                return <></>;
            }
        })

        return (
            <ScrollToBottom className="msgbox col-12">
                {history_messages}
            </ScrollToBottom>

        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));