import React from 'react'
import {Row, Col, Card, Form,  InputGroup, FormControl, DropdownButton, Dropdown, Table, Container} from 'react-bootstrap';
import { fromBase64 } from 'bytebuffer';

class SelectModel2 extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            stockCondition:'',
            regionalSpecs:'',
            storage:'',
        }
    }

    //set stockcondition

    setStockCondition = () => {
        this.setState({stockCondition:this.setStockCondition.value})
        this.props.setStockCondition(this.stockCondition.value)
        console.log (this.stockCondition.value)
    }

    //set regional specs
    setRegionalSpecs = () => {
        this.setState({regionalSpecs:this.regionalSpecs.value})
        this.props.setRegionalSpecs(this.regionalSpecs.value)
        console.log (this.regionalSpecs.value)
    }

    //set Stroage
    setStorage = () => {
        this.setState({storage:this.storage.value})
        this.props.setQuantity(this.storage.value)
        console.log (this.storage.value)
    }

    render(){
        return(
            <Container>
                <Card.Body>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Stock Condition</Form.Label>
                                <Form.Control as="select" ref={(ref) => {this.stockCondition = ref}} onChange={this.setStockCondition} value={this.state.stockCondition} >
                                    <option value={null}>Select Condition</option>
                                    <option>Boxed</option>
                                    <option>HSO</option>
                                    <option>Grade A</option>
                                    <option>Grade B</option>
                                    <option>Mix</option>
                                    <option>Tested</option>
                                    <option>BER</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Regional Specs</Form.Label>
                                <Form.Control as="select" ref={(ref) => {this.regionalSpecs = ref}} onChange={this.setRegionalSpecs} value={this.state.regionalSpecs} >
                                    <option value={null}>Select Regional Specs</option>
                                    <option>US</option>
                                    <option>UK</option>
                                    <option>EU</option>
                                    <option>CAN</option>
                                    <option>IN</option>
                                    <option>ASIA</option>
                                    <option>Jap</option>
                                    <option>KR</option>
                                    <option>MEA</option>
                                    <option>AUS</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Storage</Form.Label>
                                <Form.Control as="select" ref={(ref) => {this.storage = ref}} onChange={this.setStorage} value={this.state.storage} 
                                >
                                    <option value={null}>Select Storage</option>
                                    <option>4GB</option>
                                    <option>8GB</option>
                                    <option>16GB</option>
                                    <option>32GB</option>
                                    <option>64GB</option>
                                    <option>128GB</option>
                                    <option>256GB</option>
                                    <option>512GB</option>
                                    <option>1TB</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Upload Your Image</Form.Label>
                                <Form.Control ref={(ref) => {this.quantity = ref}} type="file"  value = {this.state.quantity} onChange={this.setQuantity}/>
                            </Form.Group>
                        </Col>
                        <Col>

                            
                        </Col>
                    </Row>                  
                </Card.Body>
            </Container>
        )
    }
}

export default SelectModel2;