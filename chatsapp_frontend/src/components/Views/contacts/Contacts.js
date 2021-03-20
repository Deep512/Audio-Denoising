import React, { Component, Fragment } from 'react';
import {Card, Row, Col, Navbar, FormControl} from 'react-bootstrap';
import {RecentActors, Person, FiberManualRecord, GroupAdd} from '@material-ui/icons'
import M from 'materialize-css'
import './contacts.css'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {updateReciepient,updateLoggedInUser,updateHistory } from '../../../redux/actionCreator';
import { Button } from 'reactstrap';

const mapStateToProps = state => {
    return {
        reciepient: state.reciepient,
        message: state.message,
        history: state.history,
        userLoggedIn: state.loggedInUser,
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateHistory: (new_history) => dispatch(updateHistory(new_history)),
    updateLoggedInUser: (new_user) => dispatch(updateLoggedInUser(new_user)),
    updateReciepient: (reciepientName) => dispatch(updateReciepient(reciepientName))
})

class Contacts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            frndlist: [],
            add : false,
            online : [this.props.loggedinUser] 
        };
        this.server = "http://localhost:5000/";
        this.toggle = false;
        this.toggler = this.toggler.bind(this);
        this.phone = ""
        
    };


    async componentDidMount(){
        await fetch('http://localhost:5000/contacts', {
            method: "get",
            headers: {
                "Content-type": "application/json"
            },
        }).then(res => res.json())
          .then(data => {this.setState({list:data}); console.log(this.state.list)})
          
        setTimeout(async () => {
            await fetch("http://localhost:5000/contacts/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.props.loggedinUser,
                })
            }).then(response => response.json())
                .then(data => { this.setState({ frndlist: data }); console.log("friendlist", this.state.frndlist) })
                .catch(err => console.log(err))

        }, 50);



        setInterval(async () => {
            await fetch("http://localhost:5000/message/clients", { method: "GET" })
                .then(response => response.json())
                .then(data => { this.setState({ online: data });
                    // console.log(this.state.online)
                })
        }, 500)
    }

    
    async getHistory() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "to": this.props.reciepient, "from": this.props.loggedinUser });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            credentials: 'include'
        };

        await fetch("http://localhost:5000/message/history", requestOptions)
            .then(response => response.json())
            .then(async result => {
                await this.props.updateHistory(result);
                console.log('history from contact: ',this.props.history)
            })
            .catch(error => console.log('error', error));

    }
    toggler = async () => {
        this.setState({add: !this.state.add})
        console.log(this.state.add)

        await fetch('http://localhost:5000/contacts', {
            method: "get",
            headers: {
                "Content-type": "application/json"
            },
        }).then(res => res.json())
            .then(data => { this.setState({ list: data }); console.log(this.state.list) })
    }
    addcontact = async() => {
        var flag = false;
        this.state.list.forEach(async user => {
            if(user.phone === this.phone){
                flag = true
                await fetch("http://localhost:5000/contacts/addcontact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.props.loggedinUser,
                        friend: user.username
                    })
                }).then(response => response.json())
                  .then(data => console.log(data))
                  .catch(err => console.log(err))


                await fetch("http://localhost:5000/contacts/friends", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.props.loggedinUser,
                    })
                }).then(response => response.json())
                    .then(data => { this.setState({ frndlist: data }); console.log("friendlist", this.state.frndlist) })
                  .catch(err => console.log(err))
                this.setState({add: false})
            }
            return
        })
        if(flag === false)
        M.toast({html: "User doesnt exist!!"})
        return
        
    }
    render() {
        //eslint-disable-next-line
        const contact = this.state.frndlist.map((user) => {    
            while(user.username !== this.props.loggedinUser){
                return (


                    this.state.online.includes(user.username)?
                        <Card className="contact-card" onClick={
                            async () => {
                                await this.props.updateReciepient(user.username);
                                console.log(this.props.reciepient);
                                this.getHistory()
                            }}>
                            <Row>
                                <Col className="justify-content-center" xs={2}>
                                    <Person style={{ color: "grey" }} />
                                </Col>
                                <Col xs={8} className="userCol">
                                    <Card.Title className="username" style={{paddingLeft: "15px"}} key={user.id}>{user.username}</Card.Title>
                                </Col>
                                <Col xs={1}>
                                    <FiberManualRecord style={{ fontSize: "20px", color: "green" }} />
                                </Col>
                            </Row>
                        </Card>
                        :

                    <Card className="contact-card" onClick={
                        async () => {
                            await this.props.updateReciepient(user.username);
                            console.log(this.props.reciepient);
                            this.getHistory()
                        }}>
                        <Row>
                            <Col className="justify-content-center" xs={2}>
                                <Person style={{color:"grey"}}/>
                            </Col>
                            <Col xs={8} className="userCol">
                                <Card.Title className="username" key={user.id}>{user.username}</Card.Title>
                            </Col>
                        </Row>
                    </Card>

                )
            }
           
        })



        return (
            <div >
                <Navbar className="navbar nvbr">
                    <RecentActors className="icon" style={{ fontSize: 30 }}/>
                    <Navbar.Brand className="brand-logo" style={{margin:"5px 5px 5px 15px"}}>Contacts</Navbar.Brand>
                    <GroupAdd className="navbar-add" style={{ fontSize: 40}} onClick={this.toggler}></GroupAdd>

                </Navbar>
        

                {/* <h2 className="brand-logo">ChatsApp</h2> */}
                <div className="contact-div">
                    {this.state.add ?
                        <Fragment>
                            <Row className="search-row">
                                <Col xs={8} md={10} className="search-col" >
                                    <FormControl
                                        className="search"
                                        style={{fontSize: 10}}
                                        placeholder="Search by phone..."
                                        onChange={e => this.phone = e.target.value}
                                    ></FormControl>
                                </Col>
                                <Col xs={4} md={2} className="add-col">
                                    <Button className="search-add" style={{fontSize: 10}} onClick={this.addcontact}>Add</Button>
                                </Col>
                            </Row>

                        </Fragment>
                        : null}
                    {contact}
                </div>
            </div>

        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contacts));