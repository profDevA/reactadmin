import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase'
import Aux from "../../hoc/_Aux";

class Users extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            users:[]
        }
    }
    componentDidMount(){
        this.getUserDatas(Userdatas=>{
            this.setState({users:Userdatas})
        })
    }
    callback=Userdatas=>{
        this.setState({users:Userdatas})
    }

     getUserDatas =(callback) =>{
        let temp=[]
        firebase.database().ref(`/users/`).on("child_added", snap=>{
            temp.append(snap.val())
            callback(temp)
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
                                                <th>Package</th>
                                                <th>Country</th>
                                                <th>Region</th>
                                                <th>Mobile</th>
                                                <th>Email</th>
                                                <th>Email Verified</th>
                                                <th>Mobile Verified</th>
                                                <th>Fully Verified</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.users.map((data,index)=>{
                                                return(
                                                    <div>
                                                    <td>
                                                       {data.anme}
                                                    </td>
                                                        <td>
                                                        {data.email}
                                                    </td>
                                                    </div>
                                                )
                                              
                                            })}
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
                                                <td>
                                                    <Form.Control type="email" placeholder="" />
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
                                                    <Form.Control as="select">
                                                        <option></option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Form.Control>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Alexander Morozov</td>
                                                <td>Business Pro</td>
                                                <td>United Arab Emirates</td>
                                                <td></td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>Pending</td>
                                                <td>Verified</td>
                                                <td>No</td>
                                                <td>Active</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Alexander Morozov</td>
                                                <td>Business Pro</td>
                                                <td>United Arab Emirates</td>
                                                <td></td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>Pending</td>
                                                <td>Verified</td>
                                                <td>No</td>
                                                <td>Active</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Alexander Morozov</td>
                                                <td>Business Pro</td>
                                                <td>United Arab Emirates</td>
                                                <td></td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>Pending</td>
                                                <td>Verified</td>
                                                <td>No</td>
                                                <td>Active</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Alexander Morozov</td>
                                                <td>Business Pro</td>
                                                <td>United Arab Emirates</td>
                                                <td></td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>Pending</td>
                                                <td>Verified</td>
                                                <td>No</td>
                                                <td>Active</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Alexander Morozov</td>
                                                <td>Business Pro</td>
                                                <td>United Arab Emirates</td>
                                                <td></td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>Pending</td>
                                                <td>Verified</td>
                                                <td>No</td>
                                                <td>Active</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Alexander Morozov</td>
                                                <td>Business Pro</td>
                                                <td>United Arab Emirates</td>
                                                <td></td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>Pending</td>
                                                <td>Verified</td>
                                                <td>No</td>
                                                <td>Active</td>
                                                <td></td>
                                            </tr>
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
