import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase'
import Aux from "../../hoc/_Aux";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

class Product extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            listings:[],
            Ids:[]            
        }
    }
    componentDidMount(){
        
        this.getListings(listings=>{
            this.setState({listings:listings})
            console.log(listings)
        })       
    }

    getListings = (callback) => {
        let temp = []
        firebase.database().ref(`/Make/`).on('value', snap=>{
            console.log("=========================")
            
            Object.keys(snap.val()).map((data,index)=>{
                
                Object.keys(snap.val()[data]).map((subdata,subindex)=>{
                    
                    Object.keys(snap.val()[data][subdata]).map((item, itemIndex)=>{
                        
                        temp.push({
                            id:item,
                            make: data,
                            model:subdata,
                            productType:snap.val()[data][subdata][item]
                        })
                    })
                })
            })
            callback(temp)
        })
    }
    randomString = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    remove = (id, make, model) => {
        console.log(id, make, model)
        confirmAlert({
            message: 'Are you sure to delete this product?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                                firebase.database().ref(`/Make/${make}/${model}/${id}/`).remove()
                                .then(data=>{alert("Delete Success!")})
                                this.getListings(listings=>{
                                    this.setState({listings:listings})
                                    console.log(listings)
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

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Products</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                <button className="btn btn-primary shadow-2 mb-4" style={{float:"right"}}><NavLink style = {{color:"white"}} to="/products/addproducts">Add New</NavLink></button>
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Make</th>
                                                <th>Product Type</th>
                                                <th>Model</th>   
                                                <th>Actions</th>                                              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.listings.length > 0 &&
                                                this.state.listings.map((data, index) => {

                                                    return (
                                                        <tr key = {index}>
                                                            <th>{index + 1}</th>
                                                             <td> {data.make} </td>
                                                            <td> {data.model} </td>
                                                            <td> {data.productType.name} </td>
                                                         
                                                            <td>
                                                                <DropdownButton as={InputGroup.Prepend} title="Action" >
                                                                    <Dropdown.Item>
                                                                    <NavLink className = "" title="Update" style = {{color:"black"}} to={{pathname:"/products/updateproducts", aboutProps:{
                                                                            id:data.id,
                                                                            make:data.make,
                                                                            model:data.model,
                                                                            productType:data.productType.name,
                                                                        }}}><i className = "fa fa-edit" style = {{fontSize: 16}}></i>&nbsp;Edit</NavLink>
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item onClick = {() => this.remove(data.id, data.make, data.model)}><i className = "fa fa-remove" style = {{fontSize: 16}}></i>&nbsp;Delete</Dropdown.Item>
                                                                </DropdownButton>
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

export default Product;
