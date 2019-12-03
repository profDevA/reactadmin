import React from 'react'
import {Row, Col, Card, Form,  InputGroup, FormControl, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import firebase from 'firebase'
import Aux from "../../hoc/_Aux";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from "react-firebase-file-uploader";
import SelectModel from './Components/SelectModel';





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
            productImage:'',
            description:'',
            timestamp:'',
            serviceTitle:'',
            serviceDescription:'',
            serviceImage:'',
            serviceImageURL:'',
            isUploading: false,
            progress:0,

        }
    }

    componentDidMount(){
        this.getUsers( user => {  this.setState({users:user}) });
        this.setState({timestamp: new Date().getTime()})
        console.log("this is timestamp", this.state.timestamp)
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

    useStyles =()=> makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        },
    }));

    setModel = (data) =>{
        this.setState({model:data})
        console.log("this is model",data)
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

    setUser = () => {
        console.log(this.user.value)
        this.setState({id:this.user.value})
        console.log('this is user value',this.user.value)
    }

    setProductImage = (data) => {
        this.setState({productImage:data})
    }

    setDescription = (data) => {
        this.setState({description:data})
    }

    //service part
    setServiceTitle = () => {
        this.setState({serviceTitle:this.serviceTitle.value})
        console.log(this.serviceTitle.value)
    }

    setServiceDescription = () => {
        this.setState({serviceDescription:this.serviceDescription.value})
        console.log(this.serviceDescription.value)
    }

    //Service Image Upload
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
        // console.log("----------------",filename)
      this.setState({ serviceImage: filename, progress: 100, isUploading: false });
      firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => {
            this.setState({ serviceImageURL: url })
            console.log("----------------",url)
        });
    };

    onSave = () => {
        console.log('service title',this.state.serviceTitle)
        console.log('service description', this.state.serviceDescription)

        if (this.state.id==='') {
            alert('Please select user!')
        } else {
            let useravarta ='undefined', usercountryid= 0, usercountryname='', username='', useronline='', usertitle=''
            this.state.users.map((data, index)=>{
                if (data.id === this.state.id) {
                    useravarta = data.useravarta ? data.useravarta : 'http://'
                    usercountryid = data.countryID ? data.countryID : 0
                    usercountryname = data.countryname ? data.countryname : ''
                    username = data.username
                    useronline =  data.online ? data.online :'null' 
                    usertitle = data.businesstype? data.businesstype: 'null'
    
                }     
            })
    
            if (this.state.model!=='services') {
                if (this.state.productMake===''){
                    alert("Please select make!")
                }else if (this.state.productType===''){
                    alert("Please select type!")
                }else if (this.state.productModel===''){
                    alert("Please select model!")
                }else if (this.state.partNo===''){
                    alert("Please enter part no!")
                }else if (this.state.quantity===''){
                    alert("Please enter quantity!")
                }else if (this.state.stockType===''){
                    alert("Please select stock type!")
                } else if (this.state.color===''){
                    alert("Please select color!")
                } else if (this.state.stockCondition===''){
                    alert("Please select stock condition!")
                } else if (this.state.regionalSpecs===''){
                    alert("Please select regional specs!")
                } else if (this.state.storage===''){
                    alert("Please select storage!")
                } else if (this.state.productImage===''){
                    alert("Please upload image!")
                } else if (this.state.description===''){
                    alert("Please enter description!")
                } else {
                    firebase.database().ref(`/NewPosts/${this.state.model}/${this.state.productType}/${this.state.id}/${this.state.timestamp}/`).set({
                        moredescription     :this.state.description,
                        moreimage           :this.state.productImage,
                        moreregional        :this.state.regionalSpecs,
                        morestockcondition  :this.state.stockCondition,
                        morestorage         :this.state.storage,
                        selColor            :this.state.color,
                        selPartNo           :this.state.partNo,
                        selQuantity         :this.state.quantity,
                        selStockType        :this.state.stockType,
                        selectedcategory    :this.state.model,
                        selectedproducttype :this.state.productType,
                        selmake             :this.state.productMake,
                        selmodel            :this.state.productModel,
                        useravarta          :useravarta,
                        usercountryid       :usercountryid,
                        usercountryname     :usercountryname,
                        username            :username,
                        useronline          :useronline,
                        usertitle           :usertitle,
                    }).catch(e => {alert(e)})
                    .then(data => {
                        console.log(usercountryid, 'this is user countryid')
                        alert('Added Successfully!')
                        window.location.reload()
                    })
                }
            } else if (this.state.model==='services') {
    
                console.log(this.state.serviceImageURL)
    
                if(this.state.serviceTitle==='') {
                    alert("Please enter service title!")
                    return
                } else if (this.state.serviceDescription==='') {
                    alert ("Please enter service description!")
                    return
                } else if (this.state.serviceImageURL==='') {
                    alert("Please upload service image!")
                    return
                }
    
                firebase.database().ref(`/NewPosts/${this.state.model}/${this.state.id}/${this.state.timestamp}/`).set({
                    servicedescription  :this.state.serviceDescription,
                    servicetitle        :this.state.serviceTitle,
                    serviceimage        :this.state.serviceImageURL,
                    useravarta          :useravarta,
                    usercountryid       :usercountryid,
                    usercountryname     :usercountryname,
                    username            :username,
                    useronline          :useronline,
                    usertitle           :usertitle,
                }).catch(e => {alert(e)})
                .then(data => {
                    alert('Added Successfully!')
                    window.location.reload()
                })
            }
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
                            <Card.Body>
                            {this.state.step===1&&  <Card.Body style={{display:'flex',flexDirection:'row', flex:1}}>
                                <Form.Group>
                                    <Form.Control as="select" ref={(ref) => {this.user = ref}} onChange={this.setUser} >
                                        <option value={null}>Select User</option>
                                        {
                                            this.state.users.map((data, index)=>{
                                                console.log('user data--------', data)
                                                return(
                                                    <option value={data.id} id={data.id}>{data.username}</option>
                                                )                                                
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Card.Body>}
                            
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
                                    onClick={()=>this.setModel("services")}
                                    style={{width:width/10, height:height/13}}
                                    variant="contained"
                                    color="default"
                                    className={classes.button}>
                                    Service
                                </Button>
                            </Card.Body>

                            {
                                (this.state.model=='buy' || this.state.model==='sell') &&
                                    <SelectModel 
                                        setMake={this.setMake} 
                                        setTypes={this.setTypes} 
                                        setProductModel={this.setProductModel} 
                                        setPartNo = {this.setPartNo} 
                                        setQuantity = {this.setQuantity} 
                                        setStockType={this.setStockType} 
                                        setColor = {this.setColor} 
                                        setStockCondition={this.setStockCondition} 
                                        setRegionalSpecs={this.setRegionalSpecs}  
                                        setStorage={this.setStorage} 
                                        setProductImage={this.setProductImage} 
                                        setDescription={this.setDescription}
                                    />
                            }
                            
                            {
                                (this.state.model==='services') &&
                                // <Card.Body style={{display:'flex', flexDirection:'row', }}>
                                    <Row style={{flex:1}}>
                                        <Col sm={12} md={4}>
                                            <Form.Group >
                                                <Form.Label>Service Title</Form.Label>
                                                <Form.Control ref={(ref) => {this.serviceTitle = ref}} type="text" placeholder="Enter Service Title" value={this.state.serviceTitle} onChange={this.setServiceTitle}/>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={4}>
                                            <Form.Group>
                                                <Form.Label>Upload Service Image</Form.Label>
                                                <FileUploader
                                                    accept="image/*"
                                                    name="serviceImage"
                                                    randomizeFilename
                                                    storageRef={firebase.storage().ref("images")}
                                                    onUploadStart={this.handleUploadStart}
                                                    onUploadError={this.handleUploadError}
                                                    onUploadSuccess={this.handleUploadSuccess}
                                                    onProgress={this.handleProgress}
                                                />
                                            </Form.Group>
                                            {this.state.serviceImageURL!==''&&
                                                <img  src = {this.state.serviceImageURL} style={{height:100, maxWidth:170}} />
                                            }
                                        </Col>
                                        <Col sm={12} md={4}>
                                            <Form.Group>
                                                <Form.Label>Servide Description</Form.Label>
                                                <textarea className={'form-control'} rows="5" ref={(ref) => this.serviceDescription = ref} onChange={this.setServiceDescription} value={this.state.serviceDescription}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                // </Card.Body>
                            }

                            {
                                (this.state.model!=='')&&
                                <Row>
                                    <Col style={{display:'flex', flexDirection:'row-reverse'}}>
                                    <Button
                                        onClick = {this.onSave}
                                        style={{ marginLeft:30, marginRight:30, marginBottom:30, width:100, alignSelf:'flex-end' }}
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<Icon>save</Icon>}
                                    >
                                        Save
                                    </Button>
                                    </Col>
                                </Row>

                            }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}
export default AddListings;