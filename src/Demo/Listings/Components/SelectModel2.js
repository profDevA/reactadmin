import React from 'react'
import {Row, Col, Card, Form,  InputGroup, FormControl, DropdownButton, Dropdown, Table, Container} from 'react-bootstrap';
import { fromBase64 } from 'bytebuffer';

class SelectModel2 extends React.Component{
    render(){
        return(
            <Container>
                <Card.Body>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Stock Type</Form.Label>
                                <Form.Control as="select" ref={(ref) => {this.userGroup = ref}} 
                                >
                                    <option value={null}>Select Stock Type</option>
                                    <option>14 days</option>
                                    <option>Active</option>
                                    <option>Broken</option>
                                    <option>Color</option>
                                    <option>S</option>
                                    <option>aaa</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label>Color</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group >
                                <Form.Label>Storage Capacity</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Condition</Form.Label>
                                <Form.Control as="select" ref={(ref) => {this.userGroup = ref}} 
                                >
                                    <option value={null}>Select Condion</option>
                                    <option>14 days</option>
                                    <option>New</option>
                                    <option>Used</option>
                                    <option>CPO</option>
                                    <option>S</option>
                                    <option>aaa</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Specification</Form.Label>
                                <Form.Control as="select" ref={(ref) => {this.userGroup = ref}} 
                                >
                                    <option value={null}>Select </option>
                                    <option>African</option>
                                    <option>Arab</option>
                                    <option>Asian</option>
                                    <option>Europe</option>
                                    <option>Indian</option>
                                    <option>Latin</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label>Qty</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Stock Status</Form.Label>
                                <Form.Control as="select" ref={(ref) => {this.userGroup = ref}} 
                                >
                                    <option value={null}>Select </option>
                                    <option>African</option>
                                    <option>Arab</option>
                                    <option>Asian</option>
                                    <option>Europe</option>
                                    <option>Indian</option>
                                    <option>Latin</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Sim Lock Status</Form.Label>
                                <Form.Control as="select" ref={(ref) => {this.userGroup = ref}} 
                                >
                                    <option value={null}>Select </option>
                                    <option>African</option>
                                    <option>Arab</option>
                                    <option>Asian</option>
                                    <option>Europe</option>
                                    <option>Indian</option>
                                    <option>Latin</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Container>
        )
    }
}

export default SelectModel2;