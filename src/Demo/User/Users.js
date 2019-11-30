import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase'
import Aux from "../../hoc/_Aux";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

class Users extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            users:[],
            Ids:[]            
        }
    }
    componentDidMount(){
         this.getUsers(  user => {  this.setState({users:user}) });
    }

    getUsers = (callback) => {  
        let temp = []
        firebase.firestore().collection("users").where("id", ">", "")
        .get()
        .then(function(querySnapshot) {
            console.log(querySnapshot)
            querySnapshot.forEach(function(doc) {
                temp.push(doc.data())
                callback (temp)
                console.log(temp);
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    }

    removeUser = (id) => {
        
        confirmAlert({
          message: 'Are you sure to delete this user?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                                firebase.firestore().ref(`/users/${id}/`).remove()
                                .catch(error => {console.log(error)})
                                .then(data=> {
                                    alert("Remove Success")
                                    window.location.reload(true)
                                })
                            }
            },
            {
              label: 'No',
            //   onClick: () => alert('Click No')
            }
          ]
        })
        
    }


    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Existing Users</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Full Name</th>
                                                <th>Email</th>
                                                <th>Package</th>
                                                <th>Country</th>
                                                <th>Mobile</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th></th>
                                                <td>
                                                    <Form.Control type="text" placeholder="" />
                                                </td>
                                                <td>
                                                    <Form.Control as="select">
                                                        <option></option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Form.Control>
                                                </td>
                                                <td>
                                                    <Form.Control as="select">
                                                        <option></option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Form.Control>
                                                </td>
                                                <td>
                                                    <Form.Control as="select">
                                                        <option></option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Form.Control>
                                                </td>
                                                <td>
                                                    <Form.Control type="text" placeholder="" />
                                                </td>
                                               
                                                
                                                <td></td>
                                            </tr>
                                            
                                            {
                                                this.state.users.length > 0 &&
                                                this.state.users.map((data, index) => {

                                                    return (
                                                        <tr>
                                                            <th>{index + 1}</th>
                                                            <td> {data.username} </td>
                                                            <td> {data.email} </td>
                                                            <td> {data.isbasicuser} </td>
                                                            <td> {data.countryname} </td>
                                                            <td> {data.phonenumber} </td>
                                                            <td>
                                                                <NavLink className = "btn btn-success btn-xs" title="Update" style = {{color:"white"}} to={{pathname:"/user/UpdateUser", aboutProps:{
                                                                    id:data.id,
                                                                    fullName:data.username,
                                                                    country:data.countryname,
                                                                    package:data.isbasicuser,
                                                                    mobile:data.phonenumber,
                                                                    email:data.email,
                                                                    
                                                                }}}><i className = "fa fa-edit" style = {{fontSize: 16}}></i></NavLink>
                                                                
                                                                <Button className = "btn btn-danger btn-xs"  title="Remove" data-toggle="tooltip" onClick = {() => this.removeUser(data.id)}>
                                                                    <i className = "fa fa-remove" style = {{fontSize: 16}}></i>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Users;
