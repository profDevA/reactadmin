import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase'
import { withRouter } from 'react-router'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


import Aux from "../../hoc/_Aux";



class UpdateUser extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:'',
            fullName:'',
            email: '',
            package:'',
            country:'',
            region: '',
            mobile:'',
        }
    }

    componentDidMount(){
        this.setState ({ id: this.props.location.aboutProps.id }) 
        this.setState ({ fullName: this.props.location.aboutProps.fullName })
        this.setState ({ email: this.props.location.aboutProps.email })
        this.setState ({ package: this.props.location.aboutProps.package })
        this.setState ({ country: this.props.location.aboutProps.country })
        this.setState ({ mobile: this.props.location.aboutProps.mobile })
        console.log( this.props.location.aboutProps.id, "--------------------")
    }

   
    //show Full Name
    showFullName = () => {
        this.setState({fullName:this.fullName.value})
        console.log('this is test test',this.state.fullName)
    }

    //Show Email
    showEmail = () => {
        this.setState({email:this.email.value})
        console.log(this.state.email)
    }

    //Show Package
    showPackage = () => {
        this.setState({package:this.package.value})
        console.log(this.state.package)
    }

    

     selectCountry = async (val) => {
        await this.setState({ country: val });
        await console.log(this.state.country)
    }

    selectRegion = (val) => {
        this.setState({ region: val });
        console.log(this.state.region)
    }
    

    //showMobile
    showMobile = () => {
        this.setState({mobile:this.mobile.value})
        console.log(this.state.mobile)
    }

    sa
    onSave=()=>{

        if ( !this.state.fullName) {
            alert("Enter your full name.")
            return
        }

        if ( !this.state.email) {
            alert("Enter your Email.")
            return
        }

        if(!this.state.package) {
            alert('Slect Package.')
            return
        }

        if(!this.state.country) {
            alert('Slect User Country')
            return
        }

        if(!this.state.mobile) {
            alert('Enter your number')
            return
        }

        let id = ""
        id = this.state.id;
        firebase.firestore().collection('users')
        .doc(id)
        .update({
            id:id,
            username:this.state.fullName,
            email:this.state.email,
            isbasicuser: this.state.package,
            countryname:this.state.country,
            phonenumber: this.state.mobile,
        })
        .catch(function(error) {
            console.log("Error setting documents: ", error);
        })
        .then(data=>{
            alert("Added Successfully")
        })
        this.props.history.go(-1)

        console.log('success')
    }

    /* render part*/ 
    render() {
        const { country, region } = this.state;
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Edit User Data</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="editUserForm.FullName">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control ref={(ref) => {this.fullName = ref}} type="text" placeholder="Enter your Full Name" value = {this.state.fullName} onChange={this.showFullName}/>
                                            </Form.Group>

                                            <Form.Group controlId="editUserForm.Email">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control ref={(ref) => {this.email = ref}} type="text" placeholder="Enter your Email" value = {this.state.email} onChange={this.showEmail}/>
                                            </Form.Group>
                                            
                                            <Form.Group controlId="editUserForm.Country">
                                                <Form.Label>Package</Form.Label>
                                                <Form.Control as="select" ref={(ref) => {this.package = ref}} onChange={this.showPackage} value={this.state.package}>
                                                    <option value={null}>Select Package</option>
                                                    <option>Basic</option>
                                                    <option>Premium</option>
                                                    <option>Business pro</option>
                                                    <option>Admin</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="editUserForm.Country">
                                                <Form.Label>Country</Form.Label>
                                                <CountryDropdown className={'form-control'} ref={(ref) => {this.country = ref}} value={country} onChange={(val) => this.selectCountry(val)} />
                                            </Form.Group>
                                           
                                            <Form.Group controlId="editUserForm.Mobile">
                                                <Form.Label>Mobile</Form.Label>
                                                <Form.Control ref={(ref) => {this.mobile = ref}} type="text" placeholder="Enter your mobile number" value={this.state.mobile} 
                                                    onChange={this.showMobile}/>
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button className="btn-success float-left" name="addNewStaff" onClick={this.onSave} >Save</Button>
                                            <Button className="btn-default float-right" name="cancel" onClick="" ><NavLink style = {{color:"white"}} to="/user/users">Cancel</NavLink></Button>
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

const UpdateUserWithRouter = withRouter(UpdateUser)

export default UpdateUser;
