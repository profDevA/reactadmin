import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase';
import { withRouter } from 'react-router';

import Aux from "../../../hoc/_Aux";

class UpdateServiceListings extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userId:'',
            type:'',
            timeStamp:'',
            serviceTitle:'',
            description:'',
        }
    }

    componentDidMount(){
        console.log(this.props.location.aboutProps, 'this is props data')
        if(this.props.location.aboutProps){
            this.setState({type:this.props.location.aboutProps.type})
            this.setState({userId:this.props.location.aboutProps.userId})
            this.setState({timeStamp:this.props.location.aboutProps.timeStamp})
            this.setState({serviceTitle:this.props.location.aboutProps.servicetitle})
            this.setState({description:this.props.location.aboutProps.description})
        }   
        
        console.log(this.state.userId, 'userId')
    }

    setServiceTitle = async () => {
        await this.setState({serviceTitle:this.serviceTitle.value})
        await console.log(this.state.serviceTitle)
    }

    setServiceDescription = async () => {
        await this.setState({description:this.description.value})
        await console.log(this.state.description)
    }

    onUpdate= async ()=>{
        if ( this.state.serviceTitle === '') {
            alert("Enter service title")
        } else if (this.state.description === ''){
            alert("Enter service description")
        } else {    
            console.log('this is end========', this.state.type, this.state.userId, this.state.timeStamp,this.state.serviceTitle, this.state.description) 
            await firebase.database().ref(`/NewPosts/${this.state.type}/${this.state.userId}/${this.state.timeStamp}/`).update({
                servicetitle    :this.state.serviceTitle,
                servicedescription     :this.state.description, 
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
                                <Card.Title as="h5">Add New Listings</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col >
                                            <Form.Group >
                                                <Form.Label>Service Title</Form.Label>
                                                <Form.Control ref={(ref) => {this.serviceTitle = ref}} type="text" placeholder="Enter Service Title" value={this.state.serviceTitle} onChange={this.setServiceTitle}/>
                                            </Form.Group>
                                       
                                            <Form.Group>
                                                <Form.Label>Servide Description</Form.Label>
                                                <textarea className={'form-control'} rows="5" ref={(ref) => this.description = ref} onChange={this.setServiceDescription} value={this.state.description}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button className="btn-success float-left" name="addNewStaff" onClick={this.onUpdate} >Save</Button>
                                            <Button className="btn-default float-right" name="cancel"  ><NavLink style = {{color:"white"}} to="/listings/service/servicelistings">Cancel</NavLink></Button>
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

const UpdateServiceListingsWithRouter = withRouter(UpdateServiceListings)

export default UpdateServiceListings;
