import React from 'react'
import {Row, Col, Card, Form,  InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase'
import Aux from "../../hoc/_Aux";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import SelectModel from './Components/SelectModel';
import SelectModel2 from './Components/SelectModel2';
import SelectModel3 from './Components/SelectModel3';




class AddListings extends React.Component{
    constructor(props){
        super(props)
        this.state={
            width:window.innerWidth,
            height:window.innerHeight,
            model:'',
            step:1,
            productMake:'',
            productType:'',
            productModel:'',
            partNo:'',
            quantity:'',
            stockType:'',
            color:'',
            stockCondition:'',
            regionalSpecs:'',
            storage:'',
            users:[],
            user:'',
            id:'',
        }
    }

    componentDidMount(){
        this.getUsers(  user => {  this.setState({users:user}) });
    }

    getUsers = (callback) => {  
        let temp = []
        firebase.firestore().collection("users").where("id", ">", "")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                temp.push(doc.data())
                callback (temp)
                // console.log('---------------------------------------------------',temp);
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    //Set  User SelectBox
    showUser = () => {
        this.setState({user:this.user.value,id:this.user.id })
        console.log("-------------",this.user)
    }

    useStyles =()=> makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        },
    }));

    setModel = (data) =>{
        this.setState({model:data})
        console.log(data)
    }

    goNext = () => {
        if(this.state.step===1){
            if(this.state.model===''){
                alert("Please select model!")
            } else {
                this.setState({step:this.state.step+1})
            }
        } else if (this.state.step === 2) {
            this.setState({step:this.state.step+1})
        } else if (this.state.step === 3) {
            this.setState({step:this.state.step+1})
        }

        
    }
    goBack = () => {
        this.setState({step:this.state.step-1})
    }

    ////////////////////////////////////////////
    setMake = (data) =>{
        this.setState({productMake:data})    
    }

    setTypes = (data) =>{
        this.setState({productType:data})    
    }

    setProductModel = (data) => {
        this.setState({productModel:data})
    }

    setPartNo = (data) =>{
        this.setState({partNo:data})
    }

    setQuantity = (data) =>{
        this.setState({quantity:data})
    }

    setStockType =(data) => {
        this.setState({stockType: data})
    }

    setColor = (data) => {
        this.setState({color:data})
    }

    setStockCondition = (data) => {
        this.setState({stockCondition:data})
    }

    setRegionalSpecs = (data) => {
        this.setState({regionalSpecs:data})
    }

    setStorage = (data) => {
        this.setState({storage:data})
    }

    render(){
        const classes = this.useStyles();
        const {width, height} = this.state;
        return(
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add Listings</Card.Title>
                            </Card.Header>
                            <Card.Body style={{display:'flex',flexDirection:'row', flex:1}}>
                                <Form.Group>
                                    <Form.Control as="select" ref={(ref) => {this.user = ref}} onChange={this.showUser} value={this.state.user}
                                    >
                                        <option value={null}>Select User</option>
                                        {
                                            this.state.users.map((data, index)=>{
                                                console.log(data)
                                                return(
                                                    <option value={data.id} id={data.id}>{data.username}</option>
                                                )                                                
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Card.Body>
                            <Card.Body style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                                <Card.Body style={this.state.step>0&&{ marginRight:20, padding:2, backgroundColor:'#1ab394', height:25, alignItems:'center', justifyContent:'center'}}>
                                    <Card.Text>1. Post Type</Card.Text>
                                </Card.Body>
                                
                                <Card.Body style={this.state.step>2?{ marginRight:20, padding:2, backgroundColor:'#1ab394', height:25, alignItems:'center', justifyContent:'center'}:{ marginRight:20, padding:2, backgroundColor:'#595959', height:25, alignItems:'center', justifyContent:'center'}}>
                                    <Card.Text>2. More Info</Card.Text>
                                </Card.Body>
                                <Card.Body style={this.state.step>3?{ marginRight:20, padding:2, backgroundColor:'#1ab394', height:25, alignItems:'center', justifyContent:'center'}:{ marginRight:20, padding:2, backgroundColor:'#595959', height:25, alignItems:'center', justifyContent:'center'}}>
                                    <Card.Text>3. Detail</Card.Text>
                                </Card.Body>
                            </Card.Body>
                            {this.state.step===1&&                            
                                <Card.Body style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                                    <Button
                                        onClick={()=>this.setModel("sell")}
                                        style={{width:width/10, height:height/13}}
                                        variant="contained"
                                        color="default"
                                        className={classes.button}>
                                        Sell
                                    </Button>
                                    <Button
                                        onClick={()=>this.setModel("buy")}
                                        style={{width:width/10, height:height/13}}
                                        variant="contained"
                                        color="default"
                                        className={classes.button}>
                                            Buy
                                    </Button>
                                    <Button
                                        onClick={()=>this.setModel("service")}
                                        style={{width:width/10, height:height/13}}
                                        variant="contained"
                                        color="default"
                                        className={classes.button}>
                                        Service
                                    </Button>
                                </Card.Body>
                            }
                            {
                                this.state.step===2&&
                                <SelectModel setMake={this.setMake} setTypes={this.setTypes} setProductModel={this.setProductModel} setPartNo = {this.setPartNo} setQuantity = {this.setQuantity} setStockType={this.setStockType} setColor = {this.setColor} />
                            }

                            {
                                this.state.step===3&&
                                <SelectModel2 setStockCondition={this.setStockCondition} setRegionalSpecs={this.setRegionalSpecs}  setStorage={this.setStorage} />
                            }

                            {
                                this.state.step===4&&
                                <SelectModel3 />
                            }

                        
                            <Card.Body style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                            {this.state.step>1&&
                                    <Button
                                        onClick = {this.goBack}
                                        style={{ marginLeft:30, marginRight:30, marginBottom:30, width:100, alignSelf:'flex-end' }}
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        firstIcon={<Icon>back</Icon>}>
                                        Previous
                                    </Button>
                                }
                                <Button
                                    onClick = {this.goNext}
                                    style={{ marginLeft:30, marginRight:30, marginBottom:30, width:100, alignSelf:'flex-end' }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<Icon>send</Icon>}>
                                    Next
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

export default AddListings;