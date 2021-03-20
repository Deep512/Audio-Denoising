import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Message = () => {
    const [msg, setMsg] = useState("");
    const [to, setTo] = useState("");
    const history = useHistory();
    var server = "http://localhost:5000/";
    var ws_server = "ws://localhost:5000/";
    var phone;

   

    const ws = new WebSocket(ws_server + 'message');
    ws.onerror = (err) => {
        console.log(err);
    }
    ws.onmessage = (message) => {
        console.log(message.data);
    };
    let buffer = [];

    const postMessage = async() => {
        await fetch(server + 'self', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(resp => resp.json())
            .then(data => {
                console.log("data from fettch(/self): ", data);
                phone = data.phone;
            });

        let resp = JSON.stringify({
            from: phone,
            to: to,
            type: "text",
            text: msg,
            timestamp: Date.now()
        });
        if (ws) {
            buffer.map((msg) => {
                ws.send(msg);
            })
            buffer.length = 0;
            ws.send(resp);
        }
        else {
            console.log("ws not available");
            buffer.push(resp);
        }
    }


    return (
        <div className="mycard">
            <div classsname ="card auth-card">
                <h2 className="brand-logo">ChatsApp</h2>
  
                    <input
                        type="text"
                        placeholder="Message"
                        value = {msg}
                        onChange = {e => setMsg(e.target.value)} />

                    <input
                        type="text"
                        placeholder="to"
                        value={to}
                        onChange={e => setTo(e.target.value)} />

                    <div style={{display:"flex", justifyContent:"space-around"}}>
                    <button onClick = {() => postMessage()} className="btn waves-effect waves-light" type="submit" >Send
    
                    </button>
                    {/* <Link to='/signup'>message page</Link> */}
                </div>
            
            
            </div>
        </div>
    )

}

export default Message;