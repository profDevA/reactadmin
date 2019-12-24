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
            Ids:[],
            makelist:[]          
        }
    }
    componentDidMount(){
        
        // this.getListings(listings=>{
        //     this.setState({listings:listings})
        //     console.log(listings)
        // })  
        this.getMake(value=>{
            this.setState({makelist:value})
        })     
    }

    getMake=(callback)=>{
        let temp =[]
        firebase.database().ref(`/MakeTemplate/`).on("value", snap=>{
            Object.keys(snap.val()).map((data)=>{
                console.log(snap.val()[data])
                let tempdata={
                    id:data,
                    data:snap.val()[data].name
                }
                temp.push(tempdata)
            })
            callback(temp)            
        })       
    }

    randomString = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    remove = (id, make) => {
        console.log(id, make)
        let temp = {}
        temp[id]=make
        confirmAlert({
            message: 'Are you sure to delete this product?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                                firebase.database().ref(`/MakeTemplate/${id}`).remove()
                                .then(data=>{alert("Delete Success!")})
                                this.getMake(value=>{
                                    this.setState({makelist:value})
                                })  
                              }
              },
              {
                label: 'No',
  
              }
            ]
          })
    }
    saveMake = () => {
        if (this.make.value===''){
            alert("Please insert make!")
        } else {
            let index = 0
            let temp = {}
            firebase.database().ref(`/MakeTemplate/`).once("value", snap=>{
                
                Object.keys(snap.val()).map(data=>{
                    index = data
                })
                
                temp['name'] = this.make.value
                // alert(temp)
                firebase.database().ref(`/MakeTemplate/${parseInt(index)+1}`).set(temp)
                
            })
        }
       
    }



    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                            
                                <Card.Title as="h5">Add Make</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                <Form.Group controlId="addStaffForm.Mobile">
                                                <Form.Label>Make Name</Form.Label>
                                                <Form.Control ref={(ref) => {this.make = ref}} placeholder="Enter Make Name" 
                                                // value={this.state.productType} 
                                                    onChange={this.setProductType}/>
                                            </Form.Group> 
                                <button className="btn btn-primary shadow-2 mb-4" style={{float:"right"}} onClick={this.saveMake}>Add Make</button>
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Make</th>
                                                <th>Action</th>                                          
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.makelist.length > 0 &&
                                                this.state.makelist.map((data, index) => {

                                                    return (
                                                        <tr key = {index}>
                                                            <th>{index + 1}</th>
                                                             <td> {data.data} </td>
                                                            
                                                         
                                                            <td>
                                                                <DropdownButton as={InputGroup.Prepend} title="Action" >
                                                                    {/* <Dropdown.Item> */}
                                                                    {/* <NavLink className = "" title="Update" style = {{color:"black"}} to={{pathname:"/products/updateproducts", aboutProps:{
                                                                            id:data.id,
                                                                            make:data.make,
                                                                            model:data.model,
                                                                            productType:data.productType.name,
                                                                        }}}><i className = "fa fa-edit" style = {{fontSize: 16}}></i>&nbsp;Edit</NavLink> */}
                                                                    {/* </Dropdown.Item> */}
                                                                    {/* <Dropdown.Divider /> */}
                                                                    <Dropdown.Item onClick = {() => this.remove(data.id, data.data)}><i className = "fa fa-remove" style = {{fontSize: 16}}></i>&nbsp;Delete</Dropdown.Item>
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
