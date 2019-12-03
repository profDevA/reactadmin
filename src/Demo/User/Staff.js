import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 


import Aux from "../../hoc/_Aux";



class StaffList extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            staves:[]
        }
    }

    async componentDidMount () {
        await this.getStaves( async staff=>{await  this.setState({staves:staff}) });
       
    }

    getStaves = (callback) => {                                     
        let temp = [];
        firebase.database().ref(`/staff/`).on('child_added',snap=> {
            temp.push(snap.val())
            callback(temp)
        })
    }

    removeStaff = (id) => {
        
        confirmAlert({
          message: 'Are you sure to delete this staff?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                                firebase.database().ref(`/staff/${id}/`).remove()
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
                                <Card.Title as="h5">Staff List</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <button className="btn btn-primary shadow-2 mb-4" style={{float:"right"}}><NavLink style = {{color:"white"}} to="/user/addstaff">Add New Staff</NavLink></button>
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>User Group</th>
                                                <th>Full Name</th>
                                                <th>Country</th>
                                                <th>Region</th>
                                                <th>Mobile</th>
                                                <th>Email</th>
                                                <th>Password</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          
                                            {
                                                this.state.staves.length>0 && 
                                                this.state.staves.map((data, index) => {
                                                    console.log(data)
                                                    return (
                                                        <tr>
                                                            <th>{index + 1}</th>
                                                            <td> {data.userGroup} </td>
                                                            <td> {data.fullName} </td>
                                                            <td> {data.country} </td>
                                                            <td> {data.region} </td>
                                                            <td> {data.mobile} </td>
                                                            <td> {data.email} </td>
                                                            <td>  {data.password} </td>
                                                            <td> {data.status} </td>
                                                            <td>
                                                                <DropdownButton as={InputGroup.Prepend} title="Action" >
                                                                    <Dropdown.Item>
                                                                    <NavLink className = "" title="Update" style = {{color:"black"}} to={{pathname:"/user/updatestaff", aboutProps:{
                                                                            id:data.id,
                                                                            userGroup:data.userGroup,
                                                                            fullName:data.fullName,
                                                                            country:data.country,
                                                                            region:data.region,
                                                                            mobile:data.mobile,
                                                                            email:data.email,
                                                                            password:data.password,
                                                                            status:data.status,
                                                                        }}}><i className = "fa fa-edit" style = {{fontSize: 16}}></i>&nbsp;Edit</NavLink>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item onClick = {() => this.removeStaff(data.id)}><i className = "fa fa-remove" style = {{fontSize: 16}}></i>&nbsp;Delete</Dropdown.Item>
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
            </Aux>
        );
    }
}

export default StaffList;
