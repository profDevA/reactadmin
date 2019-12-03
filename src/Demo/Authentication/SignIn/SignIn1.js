import React from 'react';
import {NavLink} from 'react-router-dom';
import ReactDOM from "react-dom";

import firebase from 'firebase';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import Redirect from "../../../App/redirect";






class SignUp1 extends React.Component {
    constructor(props){
        super(props)
        
        this.state={
            isVisibleDashboard:false,
            email:'',
            password:''
        }
    }

    componentDidMount(){       
        
        if(localStorage.getItem("UID")){
            this.setState({isVisibleDashboard:true})
        }
    }
    redirect = ()=> {        
        // this.setState({isVisibleDashboard:true})    
        if(this.state.email===''){
            alert("Enter email!")
        }  else if (this.state.password==='') {
            alert("Enter password!")
        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(data=>{
                console.log(data.user)
                localStorage.setItem("UID",data.user.uid)
                localStorage.setItem("Name",data.user.email)
                this.setState({isVisibleDashboard:true})
            })
            .catch(error=>{alert(error)})
        }     
        
        
    }

    setEmail = () => {
        this.setState({email:this.email.value})        
    }

    setPassword = () => {
        this.setState({password:this.password.value})
        console.log(this.state.password)
    }

    
    render () {
        return(
            <Aux>
                {/* <Breadcrumb/> */}
                {
                this.state.isVisibleDashboard?
                <Redirect />
                :
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
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" ref={(ref) => {this.email = ref}} onChange={this.setEmail} value={this.state.email} />
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" value={this.state.password} ref={(ref)=>{this.password = ref}} onChange={this.setPassword}/>
                                </div>
                                <div className="form-group text-left">
                                    {/* <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1"/>
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div> */}
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.redirect}><NavLink to="/dashboard/default">Login</NavLink></button>
                                {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p> */}
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
                
            </Aux>
        );
    }
}

export default SignUp1;