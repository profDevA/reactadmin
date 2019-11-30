import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase'
import { withRouter } from 'react-router'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';



import Aux from "../../hoc/_Aux";



class UpdateStaff extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:'',
            userGroup:'',
            fullName:'',
            country:'',
            region:'',
            mobile:'',
            email: '',
            password: '',
            status:'',
        }

    }

    componentDidMount(){
        this.setState ({ id: this.props.location.aboutProps.id }) 
        this.setState ({ userGroup: this.props.location.aboutProps.userGroup })
        this.setState ({ fullName: this.props.location.aboutProps.fullName })
        this.setState ({ country: this.props.location.aboutProps.country })
        this.setState ({ region: this.props.location.aboutProps.region })
        this.setState ({ email: this.props.location.aboutProps.email })
        this.setState ({ mobile: this.props.location.aboutProps.mobile })
        this.setState ({ password: this.props.location.aboutProps.password })
        this.setState ({ status: this.props.location.aboutProps.status })

        this.getCountry(countries=>{this.setState({countries:countries})})
        this.getUserGroup(userGroup=>{this.setState({userGroups:userGroup})})

        console.log("adsfasdfasdfasdf")

    }

     //Get User Group
     getUserGroup = (callback) =>{
        let temp=[]
        firebase.database().ref(`/userGroup/`).on("child_added", value=>{
            temp.append(value.val())
            callback(temp)
        })
    }
    //Get Country
    getCountry = (callback) =>{
        let temp=[]
        firebase.database().ref(`/country/`).on("child_added", value=>{
            temp.append(value.val())
            callback(temp)
        })
    }
    

    //Show User Group
    showUserGroup = async () => {
        await this.setState({userGroup:this.userGroup.value})
        await console.log(this.state.userGroup)
    }

    //show Full Name
    showFullName = () => {
        this.setState({fullName:this.fullName.value})
        console.log(this.state.fullName)
    }

    //Show Country
    selectCountry = async (val) => {
        await this.setState({ country: val });
        await console.log(this.state.country)
    }

    //Show Region
    selectRegion = (val) => {
        this.setState({ region: val });
        console.log(this.state.region)
    }

    //showMobile
    showMobile = () => {
        this.setState({mobile:this.mobile.value})
        console.log(this.state.mobile)
    }

    //Show Email
    showEmail = () => {
        this.setState({email:this.email.value})
        console.log(this.state.email)
    }

    //Show Password
    showPassword = () => {
        this.setState({password:this.password.value})
        console.log(this.state.password)
    }

    //Show Status
    showStatus = async () => {
        await this.setState({status:this.status.value})
        await console.log(this.state.status)
    }



    onSave=()=>{
        if(!this.state.userGroup) {
            alert('Slect User Group')
            return
        }

        if ( !this.state.fullName) {
            alert("Enter your full name.")
            return
        }

        if(!this.state.country) {
            alert('Slect User Country')
            return
        }

        if ( !this.state.region) {
            alert("Slect region")
            return
        }

        if(!this.state.mobile) {
            alert('Enter your number')
            return
        }

        if ( !this.state.email) {
            alert("Enter your email.")
            return
        }

        if(!this.state.password) {
            alert('Enter your password.')
            return
        }

        if ( !this.state.status) {
            alert("Selct status")
            return
        }

       
        let id = this.state.id;

        firebase.database().ref(`/staff/${id}/`).set({
            id:id,
            fullName:this.state.fullName,
            email:this.state.email,
            userGroup:this.state.userGroup,
            country:this.state.country,
            region: this.state.region,
            mobile: this.state.mobile,
            password: this.state.password,
            status: this.state.status,
        })
        .catch(error=>{alert(error)})
        .then(data=>{
            alert("Added Successfully")
        })
        
        this.props.history.go(-1)

        console.log('success')
    }
    render() {

        const { country, region } = this.state;

        return (
            
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Edit Staff Member</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="editStaffForm.UserGroupSelect"  >
                                                <Form.Label>User Group</Form.Label>
                                                <Form.Control as="select" ref={(ref) => {this.userGroup = ref}} onChange={this.showUserGroup} value={this.state.userGroup}>
                                                    <option value={null}>Select Group</option>
                                                    
                                                    <option>Admin</option>
                                                    <option>Customer Support</option>
                                                    <option>Full Access</option>
                                                    <option>Moderators</option>
                                                    <option>Sales Staff</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="editStaffForm.FullName">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control ref={(ref) => {this.fullName = ref}} type="text" placeholder="Enter your Full Name" value = {this.state.fullName} onChange={this.showFullName}/>
                                            </Form.Group>

                                            <Form.Group controlId="editUserForm.Country">
                                                <Form.Label>Country</Form.Label>
                                                <CountryDropdown className={'form-control'} ref={(ref) => {this.country = ref}} value={country} onChange={(val) => this.selectCountry(val)} />
                                            </Form.Group>

                                            <Form.Group controlId="editStaffForm.Region">
                                                <Form.Label>Region</Form.Label>
                                                <RegionDropdown className={'form-control'} ref={(ref) => {this.region = ref}} country={country} value={region} onChange={(val) => this.selectRegion(val)} />
                                            </Form.Group>

                                            <Form.Group controlId="editStaffForm.Mobile">
                                                <Form.Label>Mobile</Form.Label>
                                                <Form.Control ref={(ref) => {this.mobile = ref}} type="number" placeholder="Enter your mobile number" value={this.state.mobile} 
                                                    onChange={this.showMobile}/>
                                            </Form.Group>

                                            <Form.Group controlId="editStaffForm.NewPassword">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="Enter your email address" ref={(ref) => {this.email = ref}} value={this.state.email} onChange={this.showEmail} />
                                            </Form.Group>

                                            <Form.Group controlId="editStaffForm.NewPassword">
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control type="password" placeholder="Enter your new password" ref={(ref) => {this.password = ref}} value={this.state.password} onChange={this.showPassword} />
                                            </Form.Group>

                                            <Form.Group controlId="editStaffForm.Status">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control as="select" ref={(ref) => {this.status = ref}} onChange={this.showStatus} value={this.state.status}  >
                                                    <option value={null}>Select Status</option>
                                                    <option value={"available"}>Availble</option>
                                                    <option value={"used"}>Used</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button className="btn-success float-left" name="addNewStaff" onClick={this.onSave} >Save</Button>
                                            <Button className="btn-default float-right" name="cancel" onClick="" ><NavLink style = {{color:"white"}} to="/user/staff">Cancel</NavLink></Button>
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

const UpdateStaffWithRouter = withRouter(UpdateStaff)

export default UpdateStaff;
