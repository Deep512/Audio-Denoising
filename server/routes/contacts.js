var express = require('express');
var router = express.Router();
const Users = require('../models/user');
var path = require('path');


Users.find().populate("_id").then(users => {
    console.log("Usernames of all the users: ")
    users.forEach(user => {
        console.log(user.username)
    })
})

router.get("/", (req, res) =>{
    Users.find().populate("_id").then(users => res.send(users));
})

router.post("/addcontact", async(req, res) => {
    console.log(req.body)
    const {body} = req;
    if(!body.username || !body.friend){
        res.status(400).send({error: "Provide data!"});
        return;
    }
    var user = "";
    await Users.find({username: body.username})
        .then((record) => {
            user = record;
            // console.log(user[0])
        })
        .catch(err => {
            console.log(err)
            return
        })
    user[0].contacts.push(body.friend)
    await Users.findOneAndUpdate({username: body.username}, {contacts: user[0].contacts},(error) => {
        if(error){
            console.log(error)
            return
        }
        else{
            res.status(200).send({message: "friend added successfully"})
            return
        }
    })
})

router.post('/friends', async(req, res) => {
    const {body} = req;
    console.log(req.body)
    if(!body.username){
        res.status(400).send({error: "Invalid body"})
        return
    }
    var user = "";
    await Users.find({ username: body.username })
        .then((record) => {
            user = record;
            // console.log(user[0])
        })
        .catch(err => {
            console.log(err)
            return
        })
    await Users.find({username: user[0].contacts},{password:0, salt: 0, contacts:0})
        .then(friends => {res.status(200).send(friends); return})
})
module.exports = router;