import React from 'react'
import {Row, Col, Card, Form,  InputGroup, FormControl, DropdownButton, Dropdown, Table, Container} from 'react-bootstrap';
import { fromBase64 } from 'bytebuffer';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";


class SelectModel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            makes:[],
            types:[],
            models:[],
            productType:'',
            productMake:'',
            productModel:'',
            stockType:'',
            partNo:'',
            quantity:'',
            color:'',
            stockCondition:'',
            regionalSpecs:'',
            storage:'',
            username: "",
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: "",
            description:'',
            
        }
    }
    componentDidMount(){
        this.getMake(make =>{
            this.setState({makes:make})
        })
    }

    getMake = (callback) =>{
        let temp = []
        firebase.database().ref(`/Make/`).on("value", snap=>{
            console.log(Object.keys(snap.val()))
            temp.push(snap.val())
            callback(Object.keys(snap.val()))
        })
    }

    setMake = () => {
        console.log(this.make.value)
        this.setState({productMake:this.make.value})
        firebase.database().ref(`/Make/${this.make.value}/`).on("value", snap=>{
            this.setState({types:Object.keys(snap.val())})
        })
        this.props.setMake(this.make.value)
    }

    setTypes = () => {
        let temp = []
        console.log(this.types.value)
        this.setState({productType:this.types.value})
        firebase.database().ref(`/Make/${this.state.productMake}/${this.types.value}`).on("value", snap=>{
            Object.keys(snap.val()).map((data, index)=>{
                console.log(snap.val()[data].name)
                temp.push(snap.val()[data].name)
                this.setState({models:temp})
            })
        })
        this.props.setTypes(this.types.value)
    }

    //set Model
    setModel = () => {
        console.log(this.model.value)
        this.setState({productModel:this.model.value})
        this.props.setProductModel(this.model.value)
    }

    //show stock
    showStockType = () => {
        this.setState({stockType:this.stockType.value})
        this.props.setStockType(this.stockType.value)
        console.log(this.stockType.value)
    }

    //Set Part No
    setPartNo = () => {
        this.setState({partNo:this.partNo.value})
        console.log(this.partNo.value)
        this.props.setPartNo(this.partNo.value)
    }
    //Set Quantity
    setQuantity = () => {
        this.setState({quantity:this.quantity.value})
        this.props.setQuantity(this.quantity.value)
        console.log(this.quantity.value)
    }

    //Set Color
    setColor = () => {
        this.setState({color:this.color.value})
        this.props.setColor(this.color.value)
        console.log(this.color.value)
    }

    //set stockcondition

    setStockCondition = () => {
        this.setState({stockCondition:this.setStockCondition.value})
        this.props.setStockCondition(this.stockCondition.value)
        console.log (this.stockCondition.value)
    }

    //set regional specs
    setRegionalSpecs = () => {
        this.setState({regionalSpecs:this.regionalSpecs.value})
        this.props.setRegionalSpecs(this.regionalSpecs.value)
        console.log (this.regionalSpecs.value)
    }

    //set Stroage
    setStorage = () => {
        this.setState({storage:this.storage.value})
        this.props.setStorage(this.storage.value)
        console.log (this.storage.value)
    }
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
        // console.log("----------------",filename)
      this.setState({ avatar: filename, progress: 100, isUploading: false });
      firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => {
            this.setState({ avatarURL: url })
            console.log("----------------",url)
            this.props.setProductImage(url)
        });
    };

    //Set Description Area
    setDescription = () => {
        this.setState({description:this.description.value})
        this.props.setDescription(this.description.value)
        console.log(this.description.value)
    }

    render(){
        
        return(
            <Container>
                <Card.Body style={{display:'flex', flexDirection:'row', }}>
                        <Row style={{flex:1}}>
                            <Col md={4} sm={12} >
                                <Form.Group>
                                    <Form.Label>Make</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.make = ref}} 
                                    onChange={this.setMake} value={this.state.productMake}
                                    >
                                        <option value={null}>Select Make</option>
                                        {
                                            this.state.makes.map((data, index)=>{
                                                return(
                                                    <option value={data}>{data}</option>
                                                )                                                
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={4} sm={12}>
                                <Form.Group>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.types = ref}} 
                                        onChange={this.setTypes} value={this.state.productType}
                                    >
                                        <option value={null}>Select Type</option>
                                        {
                                            this.state.types.map((data, index)=>{
                                                return(
                                                <option value={data}>{data}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={4} sm={12}>
                                <Form.Group>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.model = ref}} 
                                    onChange={this.setModel} value={this.state.productModel}
                                    >
                                        <option value={null}>Select Model</option>
                                        {
                                            this.state.models.map((data, index)=>{
                                                return(
                                                <option value={data}>{data}</option>
                                                )                                            
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>

                    <Card.Body>
                        <Row style={{flex:1}}>
                            <Col md={4} sm={12}>
                                <Form.Group>
                                    <Form.Label>Part No</Form.Label>
                                    <Form.Control ref={(ref) => {this.partNo = ref}} type="text" placeholder="Enter Part No" value = {this.state.partNo} onChange={this.setPartNo}/>
                                </Form.Group>
                            </Col>
                            <Col md={4} sm={12}>
                                <Form.Group>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control ref={(ref) => {this.quantity = ref}} type="text" placeholder="Enter Quantity" value = {this.state.quantity} onChange={this.setQuantity}/>
                                </Form.Group>
                            </Col>
                            <Col md={4} sm={12}>
                                <Form.Group>
                                    <Form.Label>Stock Type</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.stockType = ref}} 
                                    onChange={this.showStockType} value={this.state.stockType}
                                    >
                                        <option value={null}>Select Stock Type</option>
                                        <option value="New">New</option>
                                        <option value="Used">Used</option>
                                        <option value="Rerfubished">Rerfubished</option>
                                        <option value="CPO">CPO</option>
                                        <option value="BER">Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>

                    <Card.Body>
                        <Row style={{flex:1}}>
                            <Col sm={12} md={4}>
                                <Form.Group>
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.color = ref}} 
                                    onChange={this.setColor} value={this.state.color}
                                    >
                                        <option value={null}>Select Color</option>
                                        <option value="Black">Black</option>
                                        <option value="Gray">Gray</option>
                                        <option value="Silver">Silver</option>
                                        <option value="White">White</option>
                                        <option value="Rose">Rose</option>
                                        <option value="Other">Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={4}>
                                <Form.Group>
                                    <Form.Label>Stock Condition</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.stockCondition = ref}} onChange={this.setStockCondition} value={this.state.stockCondition} >
                                        <option value={null}>Select Condition</option>
                                        <option>Boxed</option>
                                        <option>HSO</option>
                                        <option>Grade A</option>
                                        <option>Grade B</option>
                                        <option>Mix</option>
                                        <option>Tested</option>
                                        <option>BER</option>
                                        <option>Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={4}>
                                <Form.Group>
                                    <Form.Label>Regional Specs</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.regionalSpecs = ref}} onChange={this.setRegionalSpecs} value={this.state.regionalSpecs} >
                                        <option value={null}>Select Regional Specs</option>
                                        <option>US</option>
                                        <option>UK</option>
                                        <option>EU</option>
                                        <option>CAN</option>
                                        <option>IN</option>
                                        <option>ASIA</option>
                                        <option>Jap</option>
                                        <option>KR</option>
                                        <option>MEA</option>
                                        <option>AUS</option>
                                        <option>Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>

                    <Card.Body>
                        <Row style={{flex:1}}>
                            <Col sm={12} md={4}>
                                <Form.Group>
                                    <Form.Label>Storage</Form.Label>
                                    <Form.Control as="select" ref={(ref) => {this.storage = ref}} onChange={this.setStorage} value={this.state.storage} 
                                    >
                                        <option value={null}>Select Storage</option>
                                        <option>4GB</option>
                                        <option>8GB</option>
                                        <option>16GB</option>
                                        <option>32GB</option>
                                        <option>64GB</option>
                                        <option>128GB</option>
                                        <option>256GB</option>
                                        <option>512GB</option>
                                        <option>1TB</option>
                                        <option>Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={4}>
                                <Form.Group>
                                    <Form.Label>Upload Your Image</Form.Label>
                                    <FileUploader
                                        accept="image/*"
                                        name="avatar"
                                        randomizeFilename
                                        storageRef={firebase.storage().ref("images")}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess}
                                        onProgress={this.handleProgress}
                                    />
                                </Form.Group>
                                {this.state.avatarURL!==''&&
                                    <img  src = {this.state.avatarURL} style={{height:100, maxWidth:250 }} />
                                }
                            </Col>
                            <Col sm={12} md={4}>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <textarea className={'form-control'} rows="6" ref={(ref) => this.description = ref} onChange={this.setDescription} value={this.state.description}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
            </Container>
            
        )
    }
}

export default SelectModel;