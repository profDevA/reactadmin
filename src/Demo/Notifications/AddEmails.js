import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase';
import { withRouter } from 'react-router'


import Aux from "../../hoc/_Aux";

const messaging = firebase.messaging();

class AddProducts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            users:[],
            user:''
        }
    }

    componentDidMount(){
        this.getUsers(  user => {  
            console.log(user)
            this.setState({users:user}) 
        });
        console.log("-------------",this.user.value)
       
    }
    getUsers = (callback) => {  
        let temp = []
        firebase.firestore().collection("users").where("id", ">", "")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                temp.push(doc.data())
                callback (temp)
                // console.log('---------------------------------------------------',temp);
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    setUser = () => {
        console.log("-------------",this.user.value)
        this.setState({user:this.user.value})
    }
    onSend = async ()=>{
        console.log(this.user.value)
        console.log(this.description.value)
        if (this.description.value === ''){
            alert("Please enter message!")
        } else {
            
            messaging.usePublicVapidKey('BCnFqDXfrcW4LEAMYVdVLqGVHR-4y6VgG6u4wvuT0tlJR-ZaMW33ZuYFLbsH621xJOK-ZmpG2C160dYXq_pH_-Q');
            this.requestPermission()
    
           
        }
    }

    requestPermission = () => {
        console.log('Requesting permission...');
        // [START request_permission]
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
           
          } else {
            console.log('Unable to get permission to notify.');
          }
        });
        messaging.getToken().then((currentToken) => {
            console.log(currentToken)
        })
        .catch(error=>{
            console.log("error", error)
        })

    }

    render() {
        return (            
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">New Email</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="addStaffForm.UserGroupSelect"  >
                                            <Form.Control as="select" ref={(ref) => {this.user = ref}} onChange={this.setUser} value={this.state.user}>
                                                <option value={null}>All User</option>
                                                {
                                                    this.state.users.map((data, index)=>{
                                                        console.log(data)
                                                        return(
                                                            <option value={data.id} id={data.id}>{data.username}</option>
                                                        )                                                
                                                    })
                                                }
                                            </Form.Control>
                                            </Form.Group>                                            
                                                                                    
                                        </Col>
                                        <Col>
                                            <textarea className={'form-control'} rows="6" ref={(ref) => this.description = ref} onChange={this.setDescription} value={this.state.description}/>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:30}}>
                                        <Col>
                                            <Button className="btn-success float-right" name="addNewStaff" onClick={this.onSend} >Send</Button>

                                            <Button className="btn-default float-left" name="cancel"  ><NavLink style = {{color:"white"}} to="/products/products">Cancel</NavLink></Button>

                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

const AddProductsWithRouter = withRouter(AddProducts)

export default AddProducts;
