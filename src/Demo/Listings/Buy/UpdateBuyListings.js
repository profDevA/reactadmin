import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase';
import { withRouter } from 'react-router';

import Aux from "../../../hoc/_Aux";

class UpdateSellListings extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            type:'',
            model:'',
            userId:'',
            timeStamp:'',
            productType:'',
            selMake:'',
            selModel:'',
            selPartNo:'',
            stockType:'',
            stockCondition:'',
        }
    }

    componentDidMount(){
        console.log('this is about props-----------',this.props.location.aboutProps)
        if(this.props.location.aboutProps){
            this.setState({type:this.props.location.aboutProps.type})
            this.setState({model:this.props.location.aboutProps.model})
            this.setState({userId:this.props.location.aboutProps.userId})
            this.setState({timeStamp:this.props.location.aboutProps.timeStamp})
            this.setState({productType:this.props.location.aboutProps.producttype})
            this.setState({selMake:this.props.location.aboutProps.selmake})
            this.setState({selModel:this.props.location.aboutProps.selmodel})
            this.setState({selPartNo:this.props.location.aboutProps.selPartNo})
            this.setState({stockType:this.props.location.aboutProps.stocktype})
            this.setState({stockCondition:this.props.location.aboutProps.stockcondition})
        }      
    }

    setSelMake = async () => {
        await this.setState({selMake:this.selMake.value})
        await console.log(this.state.selMake)
    }

    setSelModel = async () => {
        await this.setState({selModel:this.selModel.value})
        await console.log(this.state.selModel)
    }
    //Set product type
    setProductType = async () => {
        await this.setState({productType:this.productType.value})
        await console.log(this.state.productType)
    }

    setSelPartNo = () => {
        this.setState({selPartNo:this.selPartNo.value})
        console.log(this.selPartNo.value)
    }

    setStockType = () => {
        this.setState({stockType: this.stockType.value})
        console.log(this.stockType.value)
    }

    setStockCondition = () => {
        this.setState({stockCondition: this.stockCondition.value})
        console.log('this is stock condition', this.stockCondition.value)
    }

    onUpdate= async ()=>{
        if (this.state.selModel === ''){
            alert("Enter Model")
        } else if (this.state.selPartNo==='') {
            alert("Enter Part No")
        } else if (this.state.stockType==='') {
            alert("Select Stock Type")
        } else if (this.state.stockCondition==='') {
            alert("Select stock condition")
        } else {     
            
            await firebase.database().ref(`/NewPosts/${this.state.type}/${this.state.model}/${this.state.userId}/${this.state.timeStamp}/`).update({
                selmodel: this.state.selModel,
                selPartNo: this.state.selPartNo,
                selStockType: this.state.stockType,
                morestockcondition: this.state.stockCondition
            }).then(data=>{
                alert("Updated !")
                this.props.history.go(-1)
            })
            .catch(error=>{alert(error)})  

        } 
    }

    render() {
        return (            
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Update Listings</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="addStaffForm.Mobile">
                                                <Form.Label>Model</Form.Label>
                                                <Form.Control ref={(ref) => {this.selModel = ref}} placeholder="Enter Model" value={this.state.selModel} 
                                                    onChange={this.setSelModel}/>
                                            </Form.Group>                                           

                                            <Form.Group controlId="addStaffForm.Mobile">
                                                <Form.Label>Part No</Form.Label>
                                                <Form.Control ref={(ref) => {this.selPartNo = ref}} placeholder="Enter Part No!" value={this.state.selPartNo} 
                                                    onChange={this.setSelPartNo}/>
                                            </Form.Group> 

                                            <Form.Group>
                                                <Form.Label>Stock Type</Form.Label>
                                                <Form.Control as="select" ref={(ref) => {this.stockType = ref}} 
                                                onChange={this.setStockType} value={this.state.stockType}
                                                >
                                                    <option value={null}>Select Stock Type</option>
                                                    <option value="New">New</option>
                                                    <option value="Used">Used</option>
                                                    <option value="Rerfubished">Rerfubished</option>
                                                    <option value="CPO">CPO</option>
                                                    <option value="Other">Other</option>
                                                </Form.Control>
                                            </Form.Group> 
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
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button className="btn-success float-left" name="addNewStaff" onClick={this.onUpdate} >Save</Button>
                                            <Button className="btn-default float-right" name="cancel"  ><NavLink style = {{color:"white"}} to="/listings/buy/buylistings">Cancel</NavLink></Button>
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

const UpdateSellListingsWithRouter = withRouter(UpdateSellListings)

export default UpdateSellListings;
