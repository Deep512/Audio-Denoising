import React from "react";
import M from "materialize-css";
import { useSpeechSynthesis } from "react-speech-kit";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactMediaRecorder } from "react-media-recorder";
import { updateMessage } from "../../../redux/actionCreator";

export default function Recorder(props) {
    const { speak, voices } = useSpeechSynthesis();
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message);
    const reciepient = useSelector((state) => state.reciepient);
    const historys = useHistory();

    let voice = null;
    voices.forEach((v) => {
        if (v.lang === "hi-IN") {
            voice = v;
        }
    });

    const sayThis = (data) => {
        speak({
            text: data,
            voice,
        });
        M.toast({ html: data });
    };

    const sendMessage = () => {
        sayThis(`Sending message to ${reciepient}.`);
        props.sendMessage();
        historys.push("/usr/chat");
    };

    const playMessage = () => {
        const audio = new Audio(message.enc);
        audio.play();
    };

    return (
        <div className="maindiv">
            <div className="buttons">
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
                            const blob = await fetch(mediaBlobUrl).then((r) =>
                                r.blob()
                            );
                            const reader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onloadend = () => {
                                const base64data = reader.result;
                                dispatch(
                                    updateMessage({
                                        type: "audio",
                                        enc: base64data,
                                    })
                                );
                            };
                        };
                        return (
                            <div
                                className="top-left button"
                                onTouchStart={start}
                                onTouchEnd={end}
                                onMouseDown={start}
                                onMouseUp={end}
                                onMouseLeave={end}
                            >
                                {status === "recording"
                                    ? "Recording..."
                                    : "Record"}
                            </div>
                        );
                    }}
                />
                <div className="top-right button" onClick={sendMessage}>
                    Send
                </div>
                <div
                    className="bottom-left button"
                    onClick={() => {
                        historys.push("/usr/chat");
                        sayThis("Going back to chat page");
                        dispatch(updateMessage({}));
                    }}
                >
                    Back
                </div>
                <div className="bottom-right button" onClick={playMessage}>
                    Replay
                </div>
            </div>
            <div
                className="current"
                onClick={() => sayThis("You are on the recordings page")}
            >
                Current
            </div>
        </div>
    );
}
