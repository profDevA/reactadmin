import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase'
import Aux from "../../../hoc/_Aux";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { object } from 'prop-types';

class BuyListings extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            listings:[],
            Ids:[]            
        }
    }
    componentDidMount(){
        
        this.getListings("", listings=>{
            this.setState({listings:listings})
            // console.log(listings)
        })       
    }

    getListings = (searchKey, callback) => {
        let temp = []
        firebase.database().ref(`/NewPosts/`).on('value', snap=>{
            
            Object.keys(snap.val()).map((data, index)=>{
                
                if (data === "services"){
                    Object.keys(snap.val()[data]).map((sub_data, sub_index)=>{
                        Object.keys(snap.val()[data][sub_data]).map((sub_timestamp, sub_timestamp_index) => {
                            var tempData = snap.val()[data][sub_data][sub_timestamp]

                            var tempJson = {
                                type            :data,                                
                                userId          :sub_data,
                                timeStamp       :sub_timestamp,
                                description     :tempData.servicedescription,
                                Img             :tempData.serviceimage,                                
                                servicetitle    :tempData.servicetitle,
                                useravarta      :tempData.useravarta,
                                usercountryid   :tempData.usercountryid,    
                                usercountryname :tempData.usercountryname,
                                useronline      :tempData.useronline,
                                username        :tempData.username,
                                usertitle       :tempData.usertitle,
                            }
                            temp.push(tempJson)
                        })
                    })                    
                }

            })
            // console.log(temp)
            callback(temp)
        })
    }

    getCo
    randomString = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    //Remove Listing
    removeListing = (type, userid, timestamp) => {
        console.log('received id', type, userid, timestamp)
        
        confirmAlert({
          message: 'Are you sure to delete this listing?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                                firebase.database().ref(`/NewPosts/${type}/${userid}/${timestamp}`).remove()
                                .catch(error => {console.log(error)})
                                .then(data=> {
                                    alert("Remove Success!")
                                    window.location.reload(true)
                                })
                            }
            },
            {
              label: 'No',

            }
          ]
        })
        
    }


    render() {
        const { listings } = this.state
        console.log(listings)
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">listings</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Description</th>                                                   
                                                <th>Actions</th>        
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.listings.length > 0 &&
                                                this.state.listings.map((data, index) => {
                                                    console.log("this is service data",data)
                                                    return (
                                                        <tr key={index}>
                                                            <th>{index + 1}</th>
                                                            <td> {data.servicetitle} </td>
                                                            <td style={{maxWidth:500, whiteSpace:'pre-wrap'}}> {data.description} </td>
                                                            <td>
                                                                <DropdownButton as={InputGroup.Prepend} title="Action" >
                                                                    <Dropdown.Item>
                                                                    <NavLink className = "" title="Update" style = {{color:"black"}} to={{pathname:"/listings/service/updateservicelistings", aboutProps:{
                                                                            type:data.type,
                                                                            userId:data.userId,
                                                                            timeStamp:data.timeStamp,
                                                                            servicetitle: data.servicetitle,
                                                                            description: data.description,
                                                                        }}}><i className = "fa fa-edit" style = {{fontSize: 16}}></i>&nbsp;Edit</NavLink>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item onClick = {() => this.removeListing(data.type, data.userId, data.timeStamp)}><i className = "fa fa-remove" style = {{fontSize: 16}}></i>&nbsp;Delete</Dropdown.Item>
                                                                </DropdownButton>

                                                                {/* <NavLink className = "btn btn-success btn-xs" title="Update" style = {{color:"white"}} to={{pathname:"/listings/service/updateservicelistings", aboutProps:{
                                                                    type:data.type,
                                                                    userId:data.userId,
                                                                    timeStamp:data.timeStamp,
                                                                    servicetitle: data.servicetitle,
                                                                    description: data.description,
                                                                }}}><i className = "fa fa-edit" style = {{fontSize: 16}}></i></NavLink>
                                                                
                                                                <Button className = "btn btn-danger btn-xs"  title="Remove" data-toggle="tooltip" onClick = {() => this.removeListing(data.type, data.userId, data.timeStamp)}>
                                                                    <i className = "fa fa-remove" style = {{fontSize: 16}}></i>
                                                                </Button> */}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            } 
                                            
                                        </tbody>
                                    </Table>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default BuyListings;
