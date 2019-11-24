import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';

export default class Rows extends React.Component{
    constructor(props){
        super(props)
        
    }
    render(){
        return(
            <Card>
            <Card.Header>
                <Card.Title as="h5">Input Group</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                        <label htmlFor="basic-url">Your vanity URL</label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">
                                    https://example.com/users/
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Append>
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>With textarea</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" aria-label="With textarea" />
                        </InputGroup>
                    </Col>
                    <Col md={6}>
                        <h5 className="mt-5">Sizing</h5>
                        <hr/>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                        <br />
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Default</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <br />
                        <InputGroup size="lg">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-lg">Large</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                    </Col>
                    <Col md={6}>
                        <h5 className="mt-5">Checkboxes and radios</h5>
                        <hr/>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                            </InputGroup.Prepend>
                            <FormControl aria-label="Text input with checkbox" />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Radio aria-label="Radio button for following text input" />
                            </InputGroup.Prepend>
                            <FormControl aria-label="Text input with radio button" />
                        </InputGroup>
                    </Col>
                </Row>
                <h5 className="mt-5">Button Addons</h5>
                <hr/>
                <Row>
                    <Col md={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <Button>Button</Button>
                            </InputGroup.Prepend>
                            <FormControl aria-describedby="basic-addon1" />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button>Button</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col md={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <Button>Button</Button>
                                <Button variant="secondary">Button</Button>
                            </InputGroup.Prepend>
                            <FormControl aria-describedby="basic-addon1" />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="secondary">Button</Button>
                                <Button>Button</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col md={6}>
                        <h5 className="mt-5">Buttons With Dropdown</h5>
                        <hr/>
                        <InputGroup className="mb-3">
                            <DropdownButton as={InputGroup.Prepend} title="Dropdown" id="input-group-dropdown-1">
                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                <Dropdown.Item href="#">Another action</Dropdown.Item>
                                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#">Separated link</Dropdown.Item>
                            </DropdownButton>
                            <FormControl aria-describedby="basic-addon1" />
                        </InputGroup>

                        <InputGroup>
                            <FormControl
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />

                            <DropdownButton as={InputGroup.Append} title="Dropdown" id="input-group-dropdown-2">
                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                <Dropdown.Item href="#">Another action</Dropdown.Item>
                                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#">Separated link</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </Col>
                    <Col md={6}>
                        <h5 className="mt-5">Segmented  Buttons</h5>
                        <hr/>
                        <InputGroup className="mb-3">
                            <Dropdown as={InputGroup.Prepend}>
                                <Button variant="secondary">Action</Button>
                                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic-1" />
                                <Dropdown.Menu>
                                    <Dropdown.Item hred="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item hred="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item hred="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <FormControl aria-describedby="basic-addon1" />
                        </InputGroup>

                        <InputGroup>
                            <FormControl
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />

                            <Dropdown as={InputGroup.Append}>
                                <Button variant="secondary">Action</Button>
                                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic-2" />
                                <Dropdown.Menu>
                                    <Dropdown.Item hred="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item hred="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item hred="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        )
    }
}
