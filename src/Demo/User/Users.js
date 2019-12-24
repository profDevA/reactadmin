import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table,OverlayTrigger,} from 'react-bootstrap';
import firebase from 'firebase'
import Aux from "../../hoc/_Aux";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

class Users extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            users:[],
            Ids:[],
            IdImg:'',
            isOpen:false          
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
            
            // console.log(querySnapshot)
            querySnapshot.forEach(function(doc) {
                firebase.database().ref(`/VerificationID/${doc.data().id}`).once("value", snap=>{
                    
                }).then(function(data){
                    let tempJSON = {}
                    if(data.val()){
                        console.log("=================")

                        tempJSON = doc.data()
                        tempJSON.pending  = true
                        tempJSON.useridimage = data.val().useridimage                        
                        console.log(tempJSON)
                        temp.push(tempJSON)
                        callback (temp)
                    } else {
                        tempJSON = doc.data()
                        tempJSON.pending  = false
                        tempJSON.useridimage = false
                        console.log(tempJSON)
                        temp.push(tempJSON)
                        callback (temp)
                    }
                    
                    // console.log(temp);
                })
                
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    }

    

    removeUser = (id) => {
        console.log(id)
        confirmAlert({
          message: 'Are you sure to delete this user?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                                firebase.firestore().collection('users')
                                .doc(id)
                                .delete()
                                .then(data=>{
                                    this.getUsers(  user => {  this.setState({users:user}) });
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

    showImage = (url) => {
        console.log(url)
        this.setState({IdImg:url})
        this.setState({isOpen:true})
    }

    setVerify = (id) => {
        console.log(id)
        confirmAlert({
            message: 'Are you sure to verify this user?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                                    firebase.firestore().collection('users')
                                    .doc(id)
                                    .update({
                                        isverified:true,                                        
                                    })
                                    .catch(function(error) {
                                        console.log("Error setting documents: ", error);
                                    })
                                    .then(data=>{
                                        alert("Verified Successfully")
                                        this.getUsers(  user => {  this.setState({users:user}) });
                                    })
                              }
              },
              {
                label: 'No',
  
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
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Full Name</th>
                                                <th>Email</th>
                                                <th>Package</th>
                                                <th>Country</th>
                                                <th>Mobile</th>
                                                <th>View ID</th>
                                                <th>Verified</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
                                                                {
                                                                    data.pending&&
                                                                    <Button style={{float:"left"}} onClick={() => this.showImage(data.useridimage)}>View ID</Button>
                                                                }
                                                            </td>
                                                            <td>
                                                                
                                                            
                                                            {
                                                                data.isverified?
                                                                <Button style={{float:"left", backgroundColor:'green'}}>Verified</Button>
                                                                :
                                                                data.pending?
                                                                <Button style={{float:"left", backgroundColor:'blue'}} onClick = {()=>this.setVerify(data.id)}>Pending</Button>
                                                                :
                                                                <Button style={{float:"left", backgroundColor:'red'}}>Unverified</Button>
                                                            }
                                                            </td>
                                                            <td>
                                                            
                                                                <DropdownButton as={InputGroup.Prepend} title="Action" >
                                                                    <Dropdown.Item>
                                                                    <NavLink className = "" title="Update" style = {{color:"black"}} to={{pathname:"/user/UpdateUser", aboutProps:{
                                                                            id:data.id,
                                                                            fullName:data.username,
                                                                            country:data.countryname,
                                                                            package:data.isbasicuser,
                                                                            mobile:data.phonenumber,
                                                                            email:data.email,
                                                                        }}}><i className = "fa fa-edit" style = {{fontSize: 16}}></i>&nbsp;Edit</NavLink>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item onClick = {() => this.removeUser(data.id)}><i className = "fa fa-trash" style = {{fontSize: 16}}></i>&nbsp;Delete</Dropdown.Item>
                                                                </DropdownButton>
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
                {this.state.isOpen && (
                                        <Lightbox
                                            mainSrc={this.state.IdImg}
                                            nextSrc={this.state.IdImg}
                                            prevSrc={this.state.IdImg}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                            // onMovePrevRequest={() =>
                                            // this.setState({
                                            //     photoIndex: (photoIndex + images.length - 1) % images.length,
                                            // })
                                            // }
                                            // onMoveNextRequest={() =>
                                            // this.setState({
                                            //     photoIndex: (photoIndex + 1) % images.length,
                                            // })
                                            // }
                                        />
                                        )}
            </Aux>
        );
    }
}

export default Users;
