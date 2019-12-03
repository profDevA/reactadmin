import React from 'react';
import {NavLink} from 'react-router-dom';
import app from 'firebase/app';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";
import firebase from 'firebase';

import { withRouter } from 'react-router'



class SignUp1 extends React.Component {
    constructor(props){
        super(props)
        // app.initializeApp(firebaseConfig);
        this.state={
            email               :'',
            password            :'',
            confrimPassword     :'',
            isVisibleConfirmError: false,           
            
        }
      
    }


    setEmail = () => {
        this.setState({email:this.email.value})
    }

    setPassword = () => {
        this.setState({password:this.password.value})
    }

    setConfirmPassword  = () => {
        this.setState({confrimPassword:this.confirmpassword.value})
    }

    signUp = () => {
        console.log(this.state.email)
        console.log(this.state.password)
        console.log(this.state.confrimPassword)
        if (this.state.email === ''){
            alert("Enter Eamil!")
        } else if (this.state.password!==this.state.confrimPassword) {
            alert("Please confrim password!")
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(data=>{
                console.log(data.user.uid)    
                this.props.history.go(-1)            
            })
            
        }        
    }

    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Sign up</h3>
                                
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email"
                                        ref = {(ref)=>{this.email=ref}} onChange={this.setEmail} value={this.state.email}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Password"
                                        ref = {(ref)=>{this.password=ref}} onChange={this.setPassword} value={this.state.password}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Confirm Password"
                                        ref = {(ref)=>{this.confirmpassword=ref}} onChange={this.setConfirmPassword} value={this.state.confrimPassword}/>
                                    
                                </div>                                
                                <div className="form-group text-left">
                                    {/* <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                            <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label>
                                    </div> */}
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4"  onClick = {this.signUp}>Sign up</button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default withRouter(SignUp1);