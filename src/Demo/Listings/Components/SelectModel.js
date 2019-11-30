import React from 'react'
import {Row, Col, Card, Form,  InputGroup, FormControl, DropdownButton, Dropdown, Table, Container} from 'react-bootstrap';
import { fromBase64 } from 'bytebuffer';
import firebase from 'firebase';

class SelectModel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            makes:[],
            types:[],
            models:[],
            productType:'',
            productMake:'',
            productModel:'',
            stockType:'',
            partNo:'',
            quantity:'',
            color:'',
        }
    }
    componentDidMount(){
        this.getMake(make =>{
            this.setState({makes:make})
        })
    }

    getMake = (callback) =>{
        let temp = []
        firebase.database().ref(`/Make/`).on("value", snap=>{
            console.log(Object.keys(snap.val()))
            temp.push(snap.val())
            callback(Object.keys(snap.val()))
        })
    }

    setMake = () => {
        console.log(this.make.value)
        this.setState({productMake:this.make.value})
        firebase.database().ref(`/Make/${this.make.value}/`).on("value", snap=>{
            this.setState({types:Object.keys(snap.val())})
        })
        this.props.setMake(this.make.value)
    }

    setTypes = () => {
        let temp = []
        console.log(this.types.value)
        this.setState({productType:this.types.value})
        firebase.database().ref(`/Make/${this.state.productMake}/${this.types.value}`).on("value", snap=>{
            Object.keys(snap.val()).map((data, index)=>{
                console.log(snap.val()[data].name)
                temp.push(snap.val()[data].name)
                this.setState({models:temp})
            })
        })
        this.props.setTypes(this.types.value)
    }

    //set Model
    setModel = () => {
        console.log(this.model.value)
        this.setState({productModel:this.model.value})
        this.props.setProductModel(this.model.value)
    }

    //show stock
    showStockType = () => {
        this.setState({stockType:this.stockType.value})
        this.props.setStockType(this.stockType.value)
        console.log(this.stockType.value)
    }

    //Set Part No
    setPartNo = () => {
        this.setState({partNo:this.partNo.value})
        console.log(this.partNo.value)
        this.props.setPartNo(this.partNo.value)
    }
    //Set Quantity
    setQuantity = () => {
        this.setState({quantity:this.quantity.value})
        this.props.setQuantity(this.quantity.value)
        console.log(this.quantity.value)
    }

    //Set Color
    setColor = () => {
        this.setState({color:this.color.value})
        this.props.setColor(this.color.model)
        console.log(this.color.value)
    }

    render(){
        
        return(
            <Container>
                <Card.Body>
                    <Card.Body style={{display:'flex', flexDirection:'row', }}>
                        <Row style={{flex:1}}>
                            <Col >
                                <Form.Group>
                                    <Form.Label>Make</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.make = ref}} 
                                    onChange={this.setMake} value={this.state.productMake}
                                    >
                                        <option value={null}>Select Make</option>
                                        {
                                            this.state.makes.map((data, index)=>{
                                                return(
                                                    <option value={data}>{data}</option>
                                                )                                                
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.types = ref}} 
                                        onChange={this.setTypes} value={this.state.productType}
                                    >
                                        <option value={null}>Select Type</option>
                                       {
                                           this.state.types.map((data, index)=>{
                                               return(
                                                <option value={data}>{data}</option>
                                               )
                                           })
                                       }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.model = ref}} 
                                    onChange={this.setModel} value={this.state.productModel}
                                    >
                                        <option value={null}>Select Model</option>
                                      {
                                          this.state.models.map((data, index)=>{
                                              return(
                                                <option value={data}>{data}</option>
                                              )                                            
                                          })
                                      }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>

                    <Card.Body style={{display:'flex', flexDirection:'row'}}>
                        <Row style={{flex:1}}>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Part No</Form.Label>
                                    <Form.Control ref={(ref) => {this.partNo = ref}} type="text" placeholder="Enter Part No" value = {this.state.partNo} onChange={this.setPartNo}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control ref={(ref) => {this.quantity = ref}} type="text" placeholder="Enter Quantity" value = {this.state.quantity} onChange={this.setQuantity}/>
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group>
                                    <Form.Label>Stock Type</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.stockType = ref}} 
                                    onChange={this.showStockType} value={this.state.stockType}
                                    >
                                        <option value={null}>Select Stock Type</option>
                                        <option value="New">New</option>
                                        <option value="Used">Used</option>
                                        <option value="Rerfubished">Rerfubished</option>
                                        <option value="CPO">CPO</option>
                                        <option value="BER">Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group>
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.color = ref}} 
                                    onChange={this.setColor} value={this.state.color}
                                    >
                                        <option value={null}>Select Color</option>
                                        <option value="Black">Black</option>
                                        <option value="Gray">Gray</option>
                                        <option value="Silver">Silver</option>
                                        <option value="White">White</option>
                                        <option value="Rose">Rose</option>
                                        <option value="Other">Other</option>
                                    </Form.Control>
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