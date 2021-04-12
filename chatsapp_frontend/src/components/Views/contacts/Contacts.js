import React, { useState, useEffect } from "react";
import M from "materialize-css";
import "./contacts.css";
import { useHistory } from "react-router-dom";
import { updateReciepient } from "../../../redux/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";
import usePersistedState from "../../../hooks/usePersistedState";
import { delete_cookie } from "../../../hooks/useCookie";
import useLongPress from "../../../hooks/useLongPress";

const Contacts = (props) => {
    const historys = useHistory();
    const dispatch = useDispatch();
    const reciepient = useSelector((state) => state.reciepient);
    const history = useSelector((state) => state.history);
    const userLoggedIn = useSelector((state) => state.loggedInUser);
    const [list, setList] = useState([]);
    const [frndlist, setFrndList] = useState([]);
    const [online, setOnline] = useState([userLoggedIn]);
    const [ptr, setPtr] = usePersistedState("ptr", 0);
    const { speak, voices } = useSpeechSynthesis();
    const [newContact, setNewContact] = useState("");
    const [verifyContact, setVerifyContact] = useState(false);
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setNewContact(result.replace(/[^\d]/g, ""));
        },
        onEnd: () => {
            // call the add contact thing from here
            console.log("Final number:", newContact);
            if (newContact.length === 10) {
                sayThis(
                    `The number recorded is ${newContact
                        .split("")
                        .join(
                            " "
                        )}. Click to accept and long press to reject it.`
                );
                // Confirm if the number is correct

                // if yes
                setVerifyContact(true);
                // addContact();
            } else {
                sayThis("Invalid entry. Please record the number again.");
            }
        },
    });

	const onLongPressAddContact = () => {
		sayThis("Discarding number.");
		setVerifyContact(false);
		setNewContact('');
	}

	const onClickAddContact = () => {
		sayThis("Adding contact...");
		addContact().then(() => {
			sayThis("Number added to friend list.");
			setVerifyContact(false);
			setNewContact('');
		})
	}

	const defaultOptions = {
        shouldPreventDefault: true,
        delay: 300,
    };

	const longPressEvent = useLongPress(onLongPressAddContact, onClickAddContact, defaultOptions);

    const startListening = () => {
        if (!listening) listen();
    };

    const stopListening = () => {
        if (listening) stop();
    };

    let voice = null;
    voices.forEach((v) => {
        if (v.lang === "hi-EN") {
            voice = v;
        }
    });

    var status = "";

    useEffect(() => {
        async function anyFunction() {
            await fetch("http://stormy-tundra-81519.herokuapp.com/contacts", {
                method: "get",
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setList(data);
                });

            setTimeout(async () => {
                await fetch(
                    "http://stormy-tundra-81519.herokuapp.com/contacts/friends",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: props.loggedinUser,
                        }),
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setFrndList(data);
                    })
                    .catch((err) => console.log(err));
            }, 50);

            setInterval(async () => {
                await fetch(
                    "http://stormy-tundra-81519.herokuapp.com/message/clients",
                    {
                        method: "GET",
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setOnline(data);
                    });
            }, 500);
        }
        anyFunction();
    }, [props.loggedinUser, frndlist]);

    // const getHistory = async () => {
    // 	var myHeaders = new Headers();
    // 	myHeaders.append("Content-Type", "application/json");

    // 	var raw = JSON.stringify({
    // 		to: reciepient,
    // 		from: props.loggedinUser,
    // 	});

    // 	var requestOptions = {
    // 		method: "POST",
    // 		headers: myHeaders,
    // 		body: raw,
    // 		redirect: "follow",
    // 		credentials: "include",
    // 	};

    // 	await fetch("http://stormy-tundra-81519.herokuapp.com/message/history", requestOptions)
    // 		.then((response) => response.json())
    // 		.then(async (result) => {
    // 			dispatch(updateHistory(result));
    // 			console.log("history from contact: ", history);
    // 		})
    // 		.catch((error) => console.log("error", error));
    // };

    const addContact = async () => {
        await fetch("http://stormy-tundra-81519.herokuapp.com/contacts", {
            method: "get",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setList(data);
                console.log(data);
            });
        var flag = false;
        list.forEach(async (user) => {
            if (
                user.username !== props.loggedinUser &&
                user.phone === newContact
            ) {
                flag = true;
                await fetch(
                    "http://stormy-tundra-81519.herokuapp.com/contacts/addcontact",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: props.loggedinUser,
                            friend: user.username,
                        }),
                    }
                )
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));

                await fetch(
                    "http://stormy-tundra-81519.herokuapp.com/contacts/friends",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: props.loggedinUser,
                        }),
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setFrndList(data);
                        console.log("friendlist", data);
                    })
                    .catch((err) => console.log(err));
            }
            return;
        });
        if (flag === false) {
            sayThis("User doesnt exist");
            M.toast({ html: "User doesnt exist!!" });
        }
        return;
    };

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
                        if (frndlist.length !== 0) {
                            if (ptr == 0) {
                                setPtr(frndlist.length - 1);
                                console.log(frndlist[frndlist.length - 1]);
                                if (
                                    online.indexOf(
                                        frndlist[frndlist.length - 1].username
                                    ) > -1
                                ) {
                                    status = " online";
                                } else {
                                    status = " not online";
                                }
                                sayThis(
                                    frndlist[frndlist.length - 1].username +
                                        status
                                );
                            } else {
                                setPtr(ptr - 1);
                                console.log(frndlist[ptr - 1]);

                                if (
                                    online.indexOf(frndlist[ptr - 1].username) >
                                    -1
                                ) {
                                    status = " online";
                                } else {
                                    status = " not online";
                                }
                                sayThis(frndlist[ptr - 1].username + status);
                            }
                        } else {
                            sayThis(
                                "You have no friends, Add new friends using the center button!"
                            );
                        }
                    }}
                >
                    Left
                </div>
                <div
                    className="top-right button"
                    onClick={() => {
                        if (frndlist.length !== 0) {
                            if (ptr == frndlist.length - 1) {
                                setPtr(0);
                                console.log(frndlist[0]);

                                if (online.indexOf(frndlist[0].username) > -1) {
                                    status = " online";
                                } else {
                                    status = " not online";
                                }
                                sayThis(frndlist[0].username + status);
                            } else {
                                setPtr(ptr + 1);
                                console.log(frndlist[ptr + 1]);
                                if (
                                    online.indexOf(frndlist[ptr + 1].username) >
                                    -1
                                ) {
                                    status = " online";
                                } else {
                                    status = " not online";
                                }
                                sayThis(frndlist[ptr + 1].username + status);
                            }
                        } else {
                            sayThis(
                                "You have no friends, Add new friends using the center button"
                            );
                        }
                    }}
                >
                    Right
                </div>
                <div
                    className="bottom-left button"
                    onClick={() => {
                        localStorage.setItem("ptr", 0);
                        delete_cookie("username");
                        delete_cookie("password");
                        props.logout();
                    }}
                >
                    Logout
                </div>
                <div
                    className="bottom-right button"
                    onClick={() => {
                        if (frndlist !== []) {
                            if (frndlist[ptr].username === props.loggedinUser) {
                                sayThis("You cant chat with yourself. LONER!");
                            } else {
                                dispatch(
                                    updateReciepient(frndlist[ptr].username)
                                );
                                sayThis(
                                    `Entering chat with ${frndlist[ptr].username}`
                                );
                                historys.push("/usr/chat");
                            }
                        } else {
                            sayThis(
                                "You have no friends. Add new friends using the center button!"
                            );
                        }
                    }}
                >
                    Chat
                </div>
                {verifyContact ? (
                    <div className="center" {...longPressEvent}>
						Verify contact..
					</div>
                ) : (
                    <div
                        className="center"
                        onTouchStart={startListening}
                        onTouchEnd={stopListening}
                        onMouseDown={startListening}
                        onMouseUp={stopListening}
                        onMouseLeave={stopListening}
                    >
                        {listening ? "Listening..." : "Add"}
                    </div>
                )}
            </div>
            <div
                className="current"
                onClick={() => {
                    sayThis(
                        `You are on Contacts page. ${
                            frndlist !== []
                                ? `The contacts pointer is on ${frndlist[ptr].username}`
                                : `You have no friends, add new friends using the center button.`
                        }`
                    );
                }}
            >
                Current
            </div>
        </div>
    );
};

export default Contacts;
