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
                
                if (data === "buy"){
                    if(searchKey === '' || data === searchKey){
                        Object.keys(snap.val()[data]).map((sub_data, sub_index)=>{
                        
                            Object.keys(snap.val()[data][sub_data]).map((sub_item, sub_item_index)=>{
                                
                                Object.keys(snap.val()[data][sub_data][sub_item]).map((sub_timestamp,sub_timestamp_index)=>{
                                    var tempData = snap.val()[data][sub_data][sub_item][sub_timestamp]
                                    var tempJson = {
                                        type            :data,
                                        model           :sub_data,
                                        userId          :sub_item,
                                        timeStamp       :sub_timestamp,
                                        description     :tempData.moredescription,
                                        Img             :tempData.moreimage,
                                        region          :tempData.moreregional,
                                        stockcondition  :tempData.morestockcondition,
                                        storage         :tempData.morestorage,
                                        selColor        :tempData.selColor,
                                        selPartNo       :tempData.selPartNo,
                                        selQuantity     :tempData.selQuantity,
                                        selStockType    :tempData.selStockType,
                                        selectedcategory:tempData.selectedcategory,
                                        selectedproducttype :tempData.selectedproducttype,
                                        selmake         :tempData.selmake,
                                        selmodel        :tempData.selmodel,
                                        useravarta      :tempData.useravarta,
                                        usercountryid   :tempData.usercountryid,
                                        usercountryname :tempData.usercountryname,
                                        username        :tempData.username,
                                        useronline      :tempData.useronline,
                                        usertitle       :tempData.usertitle,
                                    }
                                    
                                    temp.push(tempJson)
                                   
                                })
                            })
                        })
                    }
                    
                } else {
                    if( data === searchKey){
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

    removeUser = (id) => {
        
        confirmAlert({
          message: 'Are you sure to delete this user?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                                firebase.firestore().ref(`/users/${id}/`).remove()
                                .catch(error => {console.log(error)})
                                .then(data=> {
                                    alert("Remove Success")
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
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product Type</th>
                                                <th>Make</th>                                                   
                                                <th>Model</th>                                              
                                                <th>Part No</th>                                              
                                                <th>Stock Type</th>                                              
                                                <th>Stock Condition</th>                                              
                                                <th>Actions</th>        
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.listings.length > 0 &&
                                                this.state.listings.map((data, index) => {

                                                    return (
                                                        <tr key={index}>
                                                            <th>{index + 1}</th>
                                                            <td> {data.selectedproducttype} </td>
                                                            <td> {data.selmake} </td>
                                                            <td> {data.selmodel} </td>
                                                            <td> {data.selPartNo} </td>
                                                            <td> {data.selStockType} </td>
                                                            <td> {data.morestockcondition} </td>
                                                        
                                                         
                                                            <td>
                                                                <NavLink className = "btn btn-success btn-xs" title="Update" style = {{color:"white"}} to={{pathname:"/listings/updatelistings", aboutProps:{
                                                                    id:data.id,
                                                                    make:data.make,
                                                                    model:data.model,
                                                                    // productType:data.productType.name,
                                                                  
                                                                    
                                                                }}}><i className = "fa fa-edit" style = {{fontSize: 16}}></i></NavLink>
                                                                
                                                                <Button className = "btn btn-danger btn-xs"  title="Remove" data-toggle="tooltip" >
                                                                    <i className = "fa fa-remove" style = {{fontSize: 16}}></i>
                                                                </Button>
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