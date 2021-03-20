import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'
import { Card, Row, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Person } from '@material-ui/icons';





const Signup = () => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const history = useHistory();

    const postInfo = () => {
        fetch('http://localhost:5000/register', {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                name,
                phone
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.error){
                    M.toast({ html:data.error });
                    return
                }
                else{
                M.toast({html: data.message})
                history.push('/signin')
                }
            }
            )

    }

    return (
        <Card className="mycard">
            <div classsname ="card auth-card">
                <Row className="justify-content-center">
                    <h2 className="brand-logo">ChatsApp</h2>
                </Row>
                <Row className="justify-content-center">
                  <Person className="icon-person" style={{ fontSize: 120 }} />   
                </Row>
                <InputGroup>
                <Row classname="justify-content-center">
                        <FormControl 
                            style={{ margin: "5px 20px 5px 20px" }}
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <FormControl 
                            style={{ margin: "5px 20px 5px 20px" }}
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />

                        <FormControl 
                            style={{ margin: "5px 20px 5px 20px" }}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <FormControl 
                            style={{ margin: "5px 20px 5px 20px" }}
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <Button className="btn-s waves-effect waves-light" type="submit"
                                onClick = {() => postInfo()} >Signup
                        </Button>
                        <Link to='/signin'>Already have an account?</Link>

                </Row>
                    

                </InputGroup>
                   

                <div style={{display:"flex", justifyContent:"space-around"}}>

                </div>
                    
            
            
            </div>
        </Card>
    )
}


export default Signup;