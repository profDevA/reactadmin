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
                                <Card.Title as="h5">Add New Staff Member</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="addStaffForm.UserGroupSelect">
                                                <Form.Label>User Group</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Select</option>
                                                    <option>Admin</option>
                                                    <option>Customer Support</option>
                                                    <option>Full Access</option>
                                                    <option>Moderators</option>
                                                    <option>Sales Staff</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="addStaffForm.FullName">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter your Full Name" />
                                            </Form.Group>
                                            <Form.Group controlId="addStaffForm.Country">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Select Country</option>
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>China</option>
                                                    <option>Russian</option>
                                                    <option>Japan</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="addStaffForm.Region">
                                                <Form.Label>Region</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Select Region</option>
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>China</option>
                                                    <option>Russian</option>
                                                    <option>Japan</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="addStaffForm.Mobile">
                                                <Form.Label>Mobile</Form.Label>
                                                <Form.Control type="number" placeholder="Enter your mobile number" />
                                            </Form.Group>

                                            <Form.Group controlId="addStaffForm.NewPassword">
                                                <Form.Label>Mobile</Form.Label>
                                                <Form.Control type="email" placeholder="Enter your new password" />
                                            </Form.Group>

                                            <Form.Group controlId="addStaffForm.Status">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Availble</option>
                                                    <option>Used</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button className="btn-success float-left" name="addNewStaff" onClick="" >Save</Button>
                                            <Button className="btn-default float-right" name="cancel" onClick="" ><NavLink style = {{color:"white"}} to="/user/staff">Cancel</NavLink></Button>
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
