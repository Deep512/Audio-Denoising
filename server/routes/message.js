var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const Users = require('../models/user');
var path  = require('path');


const users = [];
console.log("all users: ", users);

setInterval(() => {
    Users.find({}, { username: 1 }, (err, res) => {
        res.map((usr) => { 
            if(!users.includes(usr.username)){
                users.push(usr.username);
            }
         });
    });
}, 500);



var clients = {};
var onlineUsers = []
console.log("clients: ", clients);
var undeliveredMessages = {};


const TEXT_COMMUNICATION = "text";
const IMAGE = "img"


async function getHistory(from,to){
    if(from != to){
        return Message.find({ 'to': to, 'from': from }, { _id: 0, from: 1, to: 1, text: 1,type: 1,enc:1, timestamp: 1 });
    }
}

async function getMessagesFromId(ids){
    return Message.find({'_id':ids},{_id:0,from:1,to:1,text:1,timestamp:1});
}

router.ws("/",function(ws,req){
    // console.log("inside router.ws of message.ws")
    console.log('Connection eshtablished');
    if(!req.isAuthenticated()){
        ws.terminate();
        return;
    
    }

    // onlineUsers.push(req.user)
    // console.log("req authenticated from message.js")
    ws.user = req.user;
    clients[req.user.username] = ws;
    if (!onlineUsers.includes(req.user.username)) {
        onlineUsers.push(req.user.username)
    }
    console.log( "Onlineuser:",onlineUsers)


    if(undeliveredMessages[ws.user.username]){
        getMessagesFromId(undeliveredMessages[ws.user.username]).then((msgs) => {

            if(clients[ws.user.username]){
                clients[ws.user.username].send(JSON.stringify(msgs));
                delete undeliveredMessages[ws.user.username];
                console.log("After Delivered "+ JSON.stringify(undeliveredMessages));
            }
        });
    }
    ws.send('hello from server');
    console.log('Clients: '+Object.keys(clients));
    ws.on("message",(msg)=> {
        msg = JSON.parse(msg);
        console.log("inside websocket",msg);
        console.log("users array:", users)
        if(!msg.to || !msg.from || !msg.timestamp ||!msg.type || 
            !users.includes(msg.from) || !users.includes(msg.to))
        {
            ws.send("Invalid body");
        }
        else
        {
            switch(msg.type)
            {
                case TEXT_COMMUNICATION:
                {    
                    let msg_id;
                    
                    if(!msg.text){
                        ws.send('Invalid body');
                        break;
                    }

                    if(clients[msg.to])
                    {
                        clients[msg.to].send(JSON.stringify(msg));
                    }
                    Message(msg).save((err,msg)=> {
                        if(!clients[msg.to]){
                            if(undeliveredMessages[msg.to])
                                undeliveredMessages[msg.to].push(msg._id);
                            else{
                                undeliveredMessages[msg.to] = [];
                                undeliveredMessages[msg.to].push(msg._id);
                            }
                            console.log(" Undelivered "+JSON.stringify(undeliveredMessages));
                        }
    
                    });
                }
                case IMAGE:{
                    let msg_id;

                    if (!msg.enc) {
                        ws.send('Invalid body');
                        break;
                    }
                    
                    if (clients[msg.to]) {
                        clients[msg.to].send(JSON.stringify(msg));
                    }
                    Message(msg).save((err, msg) => {
                        if (!clients[msg.to]) {
                            if (undeliveredMessages[msg.to])
                                undeliveredMessages[msg.to].push(msg._id);
                            else {
                                undeliveredMessages[msg.to] = [];
                                undeliveredMessages[msg.to].push(msg._id);
                            }
                            console.log(" Undelivered " + JSON.stringify(undeliveredMessages));
                        }

                    });
                }
                default :
                {
                    console.log(msg)
                }
            }
        }
    });

    ws.on("close", function (ws, event) {
        if (clients[ws.user.username] != null) {
            var index = onlineUsers.indexOf(ws.user.username)
            onlineUsers.splice(index, 1)
            delete clients[ws.user.username];
        }
        console.log('After deleting: ',Object.keys(clients));
    }.bind(null, ws));

});

router.get("/clients", (req, res) => {
    res.send(JSON.stringify(onlineUsers));
})

router.post("/history", (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("Unauthorized request!");
        return;
    }
    const { from, to } = req.body;
    console.log(req.body)
    getHistory([from, to], [from, to]).then((msgs) => {
        msgs.sort((a, b) => { return a.timestamp - b.timestamp });
        res.send(JSON.stringify(msgs));
    })

})



module.exports = router;
