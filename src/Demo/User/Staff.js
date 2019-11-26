import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";



class StaffList extends React.Component {

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
                                    <Table responsive hover>
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
                                            <tr>
                                                <th></th>
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
                                                    <Form.Control type="password" placeholder="" />
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
                                                <td>Full Access</td>
                                                <td>Alexander Morozov</td>
                                                <td>United States</td>
                                                <td>New York</td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>**********</td>
                                                <td>Active</td>
                                                <td>
                                                    <NavLink className = "btn btn-success btn-xs" title="Update" style = {{color:"white"}} to="/user/updatestaff"><i className = "fa fa-edit" style = {{fontSize: 16}}></i></NavLink>
                                                    
                                                    <a className = "btn btn-danger btn-xs" href="/staff/update" title="Remove" data-toggle="tooltip">
                                                        <i className = "fa fa-remove" style = {{fontSize: 16}}></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Full Access</td>
                                                <td>Alexander Morozov</td>
                                                <td>United States</td>
                                                <td>New York</td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>**********</td>
                                                <td>Active</td>
                                                <td>
                                                    <a className = "btn btn-success btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-edit" style = {{fontSize: 16}}></i>
                                                    </a>
                                                    <a className = "btn btn-danger btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-remove" style = {{fontSize: 16}}></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Full Access</td>
                                                <td>Alexander Morozov</td>
                                                <td>United States</td>
                                                <td>New York</td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>**********</td>
                                                <td>Active</td>
                                                <td>
                                                    <a className = "btn btn-success btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-edit" style = {{fontSize: 16}}></i>
                                                    </a>
                                                    <a className = "btn btn-danger btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-remove" style = {{fontSize: 16}}></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Full Access</td>
                                                <td>Alexander Morozov</td>
                                                <td>United States</td>
                                                <td>New York</td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>**********</td>
                                                <td>Active</td>
                                                <td>
                                                    <a className = "btn btn-success btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-edit" style = {{fontSize: 16}}></i>
                                                    </a>
                                                    <a className = "btn btn-danger btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-remove" style = {{fontSize: 16}}></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Full Access</td>
                                                <td>Alexander Morozov</td>
                                                <td>United States</td>
                                                <td>New York</td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>**********</td>
                                                <td>Active</td>
                                                <td>
                                                    <a className = "btn btn-success btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-edit" style = {{fontSize: 16}}></i>
                                                    </a>
                                                    <a className = "btn btn-danger btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-remove" style = {{fontSize: 16}}></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>1</th>
                                                <td>Full Access</td>
                                                <td>Alexander Morozov</td>
                                                <td>United States</td>
                                                <td>Vladivostok city</td>
                                                <td>+9875462132</td>
                                                <td>alex.moroz@gmail.com</td>
                                                <td>**********</td>
                                                <td>Active</td>
                                                <td>
                                                    
                                                    <a className = "btn btn-success btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-edit" style = {{fontSize: 16, alignSelf:"flex-center" }}></i>
                                                    </a>
                                                    <a className = "btn btn-danger btn-xs" href="/staff/update" title="Update" data-toggle="tooltip">
                                                        <i className = "fa fa-remove" style = {{fontSize: 16}}></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Row>
                                        <Col>
                                        
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

export default StaffList;
