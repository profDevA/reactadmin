import React from 'react'
import {Row, Col, Card, Form,  InputGroup, FormControl, DropdownButton, Dropdown, Table, Container} from 'react-bootstrap';
import { fromBase64 } from 'bytebuffer';

class SelectModel extends React.Component{
    render(){
        return(
            <Container>
                <Card.Body>
                    <Card.Body>
                    <Row>
                        <Col>
                            <Form.Group >
                                <Form.Label>Company</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Col>
                    </Row>
                    </Card.Body>

                    <Card.Body style={{display:'flex', flexDirection:'row', }}>
                        <Row style={{flex:1}}>
                            <Col >
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.userGroup = ref}} 
                                    // onChange={this.showUserGroup} value={this.state.userGroup}
                                    >
                                        <option value={null}>Select Group</option>
                                        <option value="admin">Admin</option>
                                        <option value="customer-support">Customer Support</option>
                                        <option value="full-access">Full Access</option>
                                        <option value="moderators">Moderators</option>
                                        <option value="sales-staff">Sales Staff</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Make</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.userGroup = ref}} 
                                    // onChange={this.showUserGroup} value={this.state.userGroup}
                                    >
                                        <option value={null}>Select Group</option>
                                        <option value="admin">Admin</option>
                                        <option value="customer-support">Customer Support</option>
                                        <option value="full-access">Full Access</option>
                                        <option value="moderators">Moderators</option>
                                        <option value="sales-staff">Sales Staff</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label>Other Make</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>

                    <Card.Body style={{display:'flex', flexDirection:'row'}}>
                        <Row style={{flex:1}}>
                            <Col >
                                <Form.Group>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.userGroup = ref}} 
                                    // onChange={this.showUserGroup} value={this.state.userGroup}
                                    >
                                        <option value={null}>Select Group</option>
                                        <option value="admin">Admin</option>
                                        <option value="customer-support">Customer Support</option>
                                        <option value="full-access">Full Access</option>
                                        <option value="moderators">Moderators</option>
                                        <option value="sales-staff">Sales Staff</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label>Other Model</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label>Model Number</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                    
                </Card.Body>
            </Container>
            
        )
    }
}

export default SelectModel;