import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Rows from './Row'

export default class AddUser extends React.Component {
    constructor(props){
        super(props)
        this.state={
            index:'---------'
        }
    }
    componentDidMount(){
        
    }
    showMessage = (data) => {
        this.setState({index:"000000"})
        // alert(data)
    }
    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Basic Component</Card.Title>
                            </Card.Header>
                            <Card.Body>
        <text>{this.state.index}</text>
                                <h5>Form controls</h5>
                                <hr/>
                                <Rows  name="sdfsdf"/>
                                <h5 className="mt-5">Sizing</h5>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form.Control size="lg" type="text" placeholder="Large text" className="mb-3" />
                                        <Form.Control type="text" placeholder="Normal text" className="mb-3" />
                                        <Form.Control size="sm" type="text" placeholder="Small text" className="mb-3" />
                                    </Col>
                                    <Col md={6}>
                                        <Form.Control size="lg" as="select" className="mb-3">
                                            <option>Large select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                        <Form.Control as="select" className="mb-3">
                                            <option>Default select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <h5 className="mt-5">Inline</h5>
                                <hr/>
                                <Row>
                                    <Col>
                                        <Form inline>
                                            <Form.Group className="mb-2">
                                                <Form.Label srOnly>Email</Form.Label>
                                                <Form.Control plaintext readOnly defaultValue="email@example.com" />
                                            </Form.Group>
                                            <Form.Group className="mb-2 mr-5">
                                                <Form.Label srOnly>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Button className="mb-0">Confirm Identity</Button>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                                <h3 className="mt-5">Checkboxes and Radios</h3>
                                <Row>
                                    <Col md={12}>
                                        <h5 className="mt-5">Checkboxes</h5>
                                        <hr/>
                                        <Form.Group>
                                            <Form.Check
                                                custom
                                                type="checkbox"
                                                id="checkbox1"
                                                label="Check this custom checkbox"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <h5 className="mt-5">Radios</h5>
                                        <hr/>
                                        <Form.Group>
                                            <Form.Check
                                                custom
                                                type="radio"
                                                label="Toggle this custom radio"
                                                name="supportedRadios"
                                                id="supportedRadio3"
                                            />
                                            <Form.Check
                                                custom
                                                type="radio"
                                                label="Or toggle this other custom radio"
                                                name="supportedRadios"
                                                id="supportedRadio4"
                                            />
                                        </Form.Group>
                                        <h5 className="mt-3">Inline</h5>
                                        <hr/>
                                        <Form.Group>
                                            <Form.Check
                                                inline
                                                custom
                                                type="radio"
                                                label="Toggle this custom radio"
                                                name="supportedRadio"
                                                id="supportedRadio21"
                                            />
                                            <Form.Check
                                                inline
                                                custom
                                                type="radio"
                                                label="Or toggle this other custom radio"
                                                name="supportedRadio"
                                                id="supportedRadio22"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <h5 className="mt-5">Range</h5>
                                        <hr/>
                                        <Form.Label htmlFor="customRange1">Example range</Form.Label>
                                        <input type="range" className="custom-range" defaultValue="22" id="customRange1" />
                                        <Form.Label htmlFor="customRange2">Example range</Form.Label>
                                        <input type="range" className="custom-range" min="0" defaultValue="3" max="5" id="customRange2" />
                                        <Form.Label htmlFor="customRange3">Example range</Form.Label>
                                        <input type="range" className="custom-range" min="0" defaultValue="1.5" max="5" step="0.5" id="customRange3" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Aux>
        );
    }
}

