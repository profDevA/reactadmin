import React from 'react'
import {Row, Col, Card, Form,  InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
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
            step:1
        }
    }
    componentDidMount(){
        console.log(window.innerWidth)
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
                            <Card.Body style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                                <Card.Body style={this.state.step>0&&{ marginRight:20, padding:2, backgroundColor:'#1ab394', height:25, alignItems:'center', justifyContent:'center'}}>
                                    <Card.Text>1. Post Type</Card.Text>
                                </Card.Body>
                                <Card.Body style={this.state.step>1?{ marginRight:20, padding:2, backgroundColor:'#1ab394', height:25, alignItems:'center', justifyContent:'center'}:{ marginRight:20, padding:2, backgroundColor:'#595959', height:25, alignItems:'center', justifyContent:'center'}}>
                                    <Card.Text>2. Make & Model</Card.Text>
                                </Card.Body>
                                <Card.Body style={this.state.step>2?{ marginRight:20, padding:2, backgroundColor:'#1ab394', height:25, alignItems:'center', justifyContent:'center'}:{ marginRight:20, padding:2, backgroundColor:'#595959', height:25, alignItems:'center', justifyContent:'center'}}>
                                    <Card.Text>3. More Info</Card.Text>
                                </Card.Body>
                                <Card.Body style={this.state.step>3?{ marginRight:20, padding:2, backgroundColor:'#1ab394', height:25, alignItems:'center', justifyContent:'center'}:{ marginRight:20, padding:2, backgroundColor:'#595959', height:25, alignItems:'center', justifyContent:'center'}}>
                                    <Card.Text>4. Detail</Card.Text>
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
                                <SelectModel />
                            }

                            {
                                this.state.step===3&&
                                <SelectModel2 />
                            }

                            {
                                this.state.step===3&&
                                <SelectModel3 />
                            }

                        
                            <Card.Body style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                            {this.state.step>1&&
                                    <Button
                                        onClick = {this.goNext}
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