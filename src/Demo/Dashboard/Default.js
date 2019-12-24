import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import LineDemo from './LineDemo';
import BuyingSelling from './BuyingSelling';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import PieChart from 'react-minimal-pie-chart';
import ReactMinimalPieChart from 'react-minimal-pie-chart'
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import firebase from 'firebase';


let session;

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            users:[],
            onlineUsers:'',
            totalPosts:0, 
            usersdatas:[],
            todaypost:0 ,
            recentposts:0,
            sellcount:0,
            buycount:0,      
            premiumcount:0,
            businessprocount:0,
            basicusercount:0,
            countrydata:[],
            weeklycount:0,
            partiCountries:[],
            buydata:[],
            selldata:[],
            servicedata:[],

        }
        session = this
    }
    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    async componentDidMount(){
        let count = 0
        
        await this.getRegisteredUsers(async value => {
            
            let premiumcount = 0
            let basicusercount = 0
            let businessprocount = 0
            let tempCountry = []
            let temppartiCountries = []
            value.map(data=>{
                
                if (data.isbasicuser==="Premium"){
                    premiumcount += 1
                } else if (data.isbasicuser==="Business pro"){
                    businessprocount += 1
                } else if(data.isbasicuser==="Basic") {
                    basicusercount += 1
                }
                
                let countryData = {}
                let flag = 0
                countryData[data.countryname] = 0
                let partiCountries = {}

                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
                }
                partiCountries['title'] = data.countryname
                partiCountries['color'] = color
                partiCountries['value'] = 1
                tempCountry.map((tempdata, index)=>{
                    flag = 0
                    // console.log(Object.keys(tempdata))
                    if(Object.keys(tempdata)[0]===data.countryname){
                        countryData[data.countryname] = tempdata[data.countryname] + 1
                        tempCountry.splice(index,1)
                        temppartiCountries.splice(index,1)
                        tempCountry.push(countryData)
                        temppartiCountries.push(partiCountries)
                    } else {
                        flag = 1
                        return
                    }
                    
                })
                if (tempCountry.length===0 || flag===1){
                    tempCountry.push(countryData)
                    temppartiCountries.push(partiCountries)
                }        
                
            })
            // console.log(temppartiCountries)
            this.setState({partiCountries:temppartiCountries})
            this.setState({countrydata:tempCountry})
            this.setState({premiumcount:premiumcount})
            this.setState({businessprocount:businessprocount})
            this.setState({basicusercount:basicusercount})
            this.setState({users:value})            
            let temp = []
            await this.getTotalPosts(value => {                
                this.state.users.map(async (user,index)=>{  
                    let count = 0  
                    let testcount=0                                
                    Object.keys(value).map((data)=>{
                        if(data==='sell'){
                            Object.keys(value[data]).map((sub_data)=>{
                                Object.keys(value[data][sub_data]).map(item=>{                                   
                                    if(item===user.id){
                                        Object.keys(value[data][sub_data][item]).map(sub_item=>{
                                            count = count + 1
                                        })
                                        
                                    }
                                })
                            })
                        } else if(data==='buy'){
                            Object.keys(value[data]).map((sub_data)=>{
                                Object.keys(value[data][sub_data]).map(item=>{
                                    // console.log('======',item)
                                    if(item===user.id){
                                        Object.keys(value[data][sub_data][item]).map(sub_item=>{
                                            count = count + 1
                                        })
                                        
                                    }
                                })
                            })
                        } else {
                            Object.keys(value[data]).map((sub_data)=>{
                                Object.keys(value[data][sub_data]).map(item=>{
                                    // console.log("----", sub_data)
                                    if(user.id===sub_data){
                                        count = count + 1
                                    }                                
                                })
                            })
                        }               
                    }) 
                    let verify = "Unverified"
                    
                    await firebase.database().ref(`/VerificationID/`).once("value", snap=>{
                        Object.keys(snap.val()).map((data)=>{
                          
                            if(data===user.id){
                                verify = "Verified"
                            }
                        })
                    })
                    // console.log(verify)
                     
                    let data = {
                        username:user.username,
                        phonenumber:user.phonenumber,
                        businessname:user.businessname,
                        countryname:user.countryname,
                        totalpost:String(count),
                        verified:verify,
                        isbasicuser:user.isbasicuser,
                        useravarta:user.useravarta
                    }
                    temp.push(data)
                    // console.log(data)
                    
                    this.setState({usersdatas:temp})
                })
                Object.keys(value).map((data)=>{
                    if(data!=='services'){
                        Object.keys(value[data]).map((sub_data)=>{
                            Object.keys(value[data][sub_data]).map(item=>{
                                Object.keys(value[data][sub_data][item]).map(sub_item=>{
                                    count = count + 1
                                   
                                })
                            })
                        })
                    } else {
                        Object.keys(value[data]).map((sub_data)=>{
                            Object.keys(value[data][sub_data]).map(item=>{
                                count = count + 1
                                this.state.users.map((data,index)=>{
                                    if(data.id===sub_data){
                                        // console.log('-----------------------')
                                    }
                                })
                            })
                        })
                    }               
                })
                
            })  
        })

        this.getPostsCount(value=>{
            let count = 0     
            let sellcount = 0
            let buycount = 0   
            
            let tempBuying  = []     
            let sellingData = {}
            let buyingData  = {}  
            let selltemp = []  
            let buytemp  =[]
            let servicetemp = []                 
            Object.keys(value).map((data)=>{
                if(data==='sell'){
                    Object.keys(value[data]).map((sub_data)=>{
                        Object.keys(value[data][sub_data]).map(item=>{
                            Object.keys(value[data][sub_data][item]).map(sub_item=>{                                
                                count = count + 1
                                sellcount  += 1
                                // console.log(value[data][sub_data][item][sub_item])
                                let tempData = {
                                    username:value[data][sub_data][item][sub_item].username,
                                    useravarta:value[data][sub_data][item][sub_item].useravarta,
                                    selmake:value[data][sub_data][item][sub_item].selmake,
                                    selmodel:value[data][sub_data][item][sub_item].selmodel,
                                    selPartNo:value[data][sub_data][item][sub_item].selPartNo,
                                    selQuantity:value[data][sub_data][item][sub_item].selQuantity,
                                    morestorage:value[data][sub_data][item][sub_item].morestorage,
                                    selColor:value[data][sub_data][item][sub_item].selColor,
                                    selStockType:value[data][sub_data][item][sub_item].selStockType,
                                    morestockcondition:value[data][sub_data][item][sub_item].morestockcondition
                                }
                                selltemp.push(tempData)                                   
                               
                            })         
                        })
                    })
                    this.setState({selldata:selltemp})
                } else if(data==='buy'){
                    Object.keys(value[data]).map((sub_data)=>{
                        Object.keys(value[data][sub_data]).map(item=>{
                            Object.keys(value[data][sub_data][item]).map(sub_item=>{                                
                                count = count + 1
                                buycount += 1
                                let tempData = {
                                    username:value[data][sub_data][item][sub_item].username,
                                    useravarta:value[data][sub_data][item][sub_item].useravarta,
                                    selmake:value[data][sub_data][item][sub_item].selmake,
                                    selmodel:value[data][sub_data][item][sub_item].selmodel,
                                    selPartNo:value[data][sub_data][item][sub_item].selPartNo,
                                    selQuantity:value[data][sub_data][item][sub_item].selQuantity,
                                    morestorage:value[data][sub_data][item][sub_item].morestorage,
                                    selColor:value[data][sub_data][item][sub_item].selColor,
                                    selStockType:value[data][sub_data][item][sub_item].selStockType,
                                    morestockcondition:value[data][sub_data][item][sub_item].morestockcondition
                                }
                                buytemp.push(tempData)    
                                // console.log("-------bue",item)
                            })         
                        })
                    })
                    this.setState({buydata:buytemp})
                } else {
                    Object.keys(value[data]).map((sub_data)=>{
                        Object.keys(value[data][sub_data]).map(item=>{
                                count = count + 1
                                console.log(value[data][sub_data][item])
                                let tempData = {
                                    username    :value[data][sub_data][item].username,
                                    useravarta  :value[data][sub_data][item].useravarta,
                                    servicetitle     :value[data][sub_data][item].servicetitle,
                                    servicedescription    :value[data][sub_data][item].servicedescription,
                                   
                                }
                                servicetemp.push(tempData)    
                        })
                    })
                    this.setState({servicedata:servicetemp})
                }               
            }) 
            buyingData['value']=buycount
            buyingData['color']="#E38627"
            buyingData['title']="Buying"
            sellingData['value']=sellcount
            sellingData['color']="#9b22ea"
            sellingData['title']="Selling"
            tempBuying.push(buyingData)
            tempBuying.push(sellingData)
            this.setState({sellingbuying:tempBuying})
            // console.log()
            this.setState({sellcount:sellcount})
            this.setState({buycount:buycount})
            this.setState({totalPosts:count})
        })
        this.getRecentPost(value=>{
            let count = 0
            let weeklycount = 0
            var date = new Date();
            var yesterday = new Date(date.getTime() - 24*60*60*1000);
            var weekly = new Date(date.getTime() - 168*60*60*1000);
            // console.log(yesterday)
            Object.keys(value).map((data)=>{
                if(data!=='services'){
                    Object.keys(value[data]).map((sub_data)=>{
                        Object.keys(value[data][sub_data]).map(item=>{
                            Object.keys(value[data][sub_data][item]).map(sub_item=>{
                                // console.log(sub_item)
                                if(sub_item>yesterday){
                                    count=count+1
                                } 
                                if (sub_item>weekly){
                                    weeklycount += 1
                                }
                            })
                        })
                    })
                } else {
                    Object.keys(value[data]).map((sub_data)=>{
                        Object.keys(value[data][sub_data]).map(item=>{
                            if(item>yesterday){
                                count=count+1
                            }
                            if (item>weekly){
                                weeklycount += 1
                            }
                        })
                    })
                }               
            })
            console.log(count)
            this.setState({recentposts:count})
            this.setState({weeklycount:weeklycount})

        })  

             
    }

    getUserInfo = (id, callback)=>{
        firebase.firestore().collection('users')
        .doc(id)
        .get()
        .then(data=>{
            callback(data.data())
        })
    }

    getRecentPost = (callback) => {
        
        // console.log(yesterday.getTime())
        firebase.database().ref(`/NewPosts/`).once("value", snap=>{
            callback(snap.val())
        })
    }

    getPostsCount = (callback) => {
        firebase.database().ref(`/NewPosts/`).once("value", snap=>{
            callback(snap.val())
        })
    }
    
    getTotalPosts = (callback) => {
        firebase.database().ref(`/NewPosts/`).once("value", snap=>{
            callback(snap.val())
        })
    }
    getRegisteredUsers = (callback) => {
        let temp = []
        let count = 0
        let premiumcount=0
        let businessprocount = 0
        let basicusercount = 0
        firebase.firestore().collection("users").where("id", ">", "")
        .get()
        .then(function(querySnapshot) {
            // console.log(querySnapshot)
            
            querySnapshot.forEach(function(doc) {
                // doc.data().push({count:0})
                const res = {...doc.data(), count:0}
                // console.log(res)
                temp.push(res)
                if (doc.data().online===true){
                    count = count + 1
                    session.setState({onlineUsers:count})

                    // console.log(count)
                }
                
                
                callback (temp)
                // console.log(temp);
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    render() {
        const value = String(Math.floor(parseInt(this.state.onlineUsers)/parseInt(this.state.users.length)*100))+"%"
        const tabContent = (
            <Aux>
                <Card.Body className='px-0 py-2' style={{height:"320px", overflow:'scroll'}}>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Part No</th>
                                <th>Quantity</th>
                                <th>Storage(GB)</th>
                                <th>Color</th>
                                <th>Stock Type</th>
                                <th>Condition</th>
                            </tr>
                        </thead>
                        <tbody className = "h-25">
                                
                            {this.state.selldata.map((data, index)=>{
                                return(
                                    <tr className="unread " key={index}>
                                        <td><img className="rounded-circle" style={{width: '40px', height:'40px'}} src={data.useravarta?data.useravarta:avatar3} alt=""/></td>
                                        <td>
                                            <h6 className="mb-1">{data.username}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selmake}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selmodel}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selPartNo}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selQuantity}</h6>                                            
                                        </td>                                     
                                        <td>
                                            <h6 className="mb-1">{data.morestorage}</h6>                                            
                                        </td>   
                                        <td>
                                            <h6 className="mb-1">{data.selColor}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selStockType}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.morestockcondition}</h6>                                            
                                        </td>                                
                                    </tr>
                                )
                            })}                                   
                        
                        </tbody>
                    </Table>   
                </Card.Body>           
            </Aux>
        );

        const buytabContent = (
            <Aux>
                <Card.Body className='px-0 py-2' style={{height:"320px", overflow:'scroll'}}>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Part No</th>
                                <th>Quantity</th>
                                <th>Storage(GB)</th>
                                <th>Color</th>
                                <th>Stock Type</th>
                                <th>Condition</th>
                            </tr>
                        </thead>
                        <tbody className = "h-25">
                                
                            {this.state.buydata.map((data, index)=>{
                                return(
                                    <tr className="unread " key={index}>
                                        <td><img className="rounded-circle" style={{width: '40px', height:'40px'}} src={data.useravarta?data.useravarta:avatar3} alt=""/></td>
                                        <td>
                                            <h6 className="mb-1">{data.username}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selmake}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selmodel}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selPartNo}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selQuantity}</h6>                                            
                                        </td>                                     
                                        <td>
                                            <h6 className="mb-1">{data.morestorage}</h6>                                            
                                        </td>   
                                        <td>
                                            <h6 className="mb-1">{data.selColor}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.selStockType}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.morestockcondition}</h6>                                            
                                        </td>                                
                                    </tr>
                                )
                            })}                                   
                        
                        </tbody>
                    </Table>   
                </Card.Body>           
            </Aux>
        );
        const servicetabContent = (
            <Aux>
                <Card.Body className='px-0 py-2' style={{height:"320px", overflow:'scroll'}}>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>Title</th>
                                <th>Description</th>
                                
                               
                            </tr>
                        </thead>
                        <tbody className = "h-25">
                                
                            {this.state.servicedata.map((data, index)=>{
                                return(
                                    <tr className="unread " key={index}>
                                        <td><img className="rounded-circle" style={{width: '40px', height:'40px'}} src={data.useravarta?data.useravarta:avatar3} alt=""/></td>
                                        <td>
                                            <h6 className="mb-1">{data.username}</h6>                                            
                                        </td>
                                        <td>
                                            <h6 className="mb-1">{data.servicetitle}</h6>                                            
                                        </td>
                                        <td style={{maxWidth:200, whiteSpace:'pre-wrap'}}>
                                            <h6 className="mb-1">{data.servicedescription}</h6>                                            
                                        </td>
                                                                    
                                    </tr>
                                )
                            })}                                   
                        
                        </tbody>
                    </Table>   
                </Card.Body>           
            </Aux>
        );
        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Registered Users</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{this.state.users.length}</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        {/* <p className="m-b-0">50%</p> */}
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: this.state.users.length}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Users Online</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5"/> {this.state.onlineUsers}</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{String(Math.floor(parseInt(this.state.onlineUsers)/parseInt(this.state.users.length)*100))}%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: value}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="10"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Posts</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> {String(this.state.totalPosts)}</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        {/* <p className="m-b-0">70%</p> */}
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '30%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Recent Users</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2' style={{height:"400px", overflow:'scroll'}}>
                                <Table responsive hover>
                                    <tbody className = "h-25">
                                        {this.state.usersdatas.map((data, index)=>{
                                            return(
                                                <tr className="unread " key={index}>
                                                    <td><img className="rounded-circle" style={{width: '40px', height:'40px'}} src={data.useravarta?data.useravarta:avatar2} alt=""/></td>
                                                    <td>
                                                        <h6 className="mb-1">{data.username}</h6>
                                                        
                                                    </td>
                                                    <td>
                                                        <h6 className="mb-1">{data.businessname}</h6>
                                                        
                                                    </td>
                                                    <td>
                                                        <h6 className="mb-1">{data.phonenumber}</h6>
                                                        
                                                    </td>
                                                    
                                                    <td>{
                                                        data.verified==='Unverified'?
                                                        <a href={DEMO.BLANK_LINK} className="label theme-bg3 text-white f-12" style = {{backgroundColor: 'orange'}}>{data.verified}</a>
                                                        :
                                                        <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" style = {{backgroundColor: 'white'}}>{data.verified}</a>
                                                        }
                                                    </td>    
                                                    <td>
                                                        <a href={DEMO.BLANK_LINK}  className="label theme-bg text-white f-12 w-25 ">{data.isbasicuser}</a>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{String(data.totalpost)}</h6>
                                                    </td>
                                                </tr>
                                            )
                                        })}                                   
                                    
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-event'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Today's Post</h5>
                                    </div>
                                    <div className="col-auto">
                                        <label className="label theme-bg2 text-white f-14 f-w-400 float-right">{String(Math.floor(this.state.recentposts/this.state.totalPosts*100))}%</label>
                                    </div>
                                </div>
                                <h2 className="mt-2 f-w-300">{String(this.state.recentposts)}</h2>
                                
                                <i className="fa fa-angellist text-c-purple f-50"/>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-zap f-30 text-c-green"/>
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{String(this.state.sellcount)}</h3>
                                        <span className="d-block text-uppercase">Selling</span>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-map-pin f-30 text-c-blue"/>
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{this.state.buycount}</h3>
                                        <span className="d-block text-uppercase">Buying</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-user text-primary f-36"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>{String(this.state.basicusercount)}</h3>
                                        <h5 className="text-c-green mb-0"><span className="text-muted">Basic</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            {/* <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>35,098</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>350</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '45%', height: '6px'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body> */}
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-user text-c-blue f-36"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>{String(this.state.premiumcount)}</h3>
                                        <h5 className="text-c-purple mb-0"><span className="text-muted">Premium</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            {/* <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>34,185</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-green" role="progressbar" style={{width: '40%', height: '6px'}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>800</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-blue" role="progressbar" style={{width: '70%', height: '6px'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body> */}
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-user text-c-red f-36"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>{this.state.businessprocount}</h3>
                                        <h5 className="text-c-blue mb-0"><span className="text-muted">Business Pro</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            {/* <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>25,998</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '80%', height: '6px'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>900</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '50%', height: '6px'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body> */}
                        </Card>
                    </Col>
                    <Col md={6} xl={3}>
                        <Card>
                            <Card.Header>
                                <Card.Title as='h5'>Users by Country</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {/* <div className="row align-items-center justify-content-center m-b-20">
                                    <div className="col-6">
                                        <h2 className="f-w-300 d-flex align-items-center float-left m-0">4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow"/></h2>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="d-flex  align-items-center float-right m-0">0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10"/></h6>
                                    </div>
                                </div> */}

                                <div className="row">
                                    {this.state.countrydata.map((data, index)=>{
                                        let percent = ''
                                        if (data[Object.keys(data)[0]]===0){
                                            percent = String(Math.floor(1/this.state.users.length*100))+"%"
                                        } else {
                                            percent = String(Math.floor(data[Object.keys(data)[0]]/this.state.users.length*100))+"%"
                                        }
                                        // console.log(value)
                                        return (
                                            <div className="col-xl-12" key={index}>
                                                <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>{Object.keys(data)[0]}</h6>
                                                <h6 className="align-items-center float-right">{data[Object.keys(data)[0]]===0?1:data[Object.keys(data)[0]]}</h6>
                                                <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: percent}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                                </div>
                                            </div> 
                                        )
                                    })}
                                                             
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={9} className='m-b-30'>
                        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
                            <Tab eventKey="today" title="Buy">
                                {buytabContent}
                            </Tab>
                            <Tab eventKey="week" title="Sell">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="all" title="Service">
                                {servicetabContent}
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col md={6} xl={6}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                            <h6 className='mb-4'>Monthly new Users Progress</h6>
                            <ReactMinimalPieChart
                                animate={true}
                                animationDuration={1000}
                                animationEasing="ease-out"
                                cx={50}
                                cy={25}
                                data={[
                                    {
                                    color: '#1dc6e6',
                                    value: 82
                                    }
                                ]}
                                label
                                labelPosition={0}
                                labelStyle={{
                                    fontFamily: 'sans-serif',
                                    fontSize: '10px'
                                }}
                                lengthAngle={360}
                                lineWidth={20}
                                onClick={undefined}
                                onMouseOut={undefined}
                                onMouseOver={undefined}
                                paddingAngle={0}
                                radius={20}
                                rounded={false}
                                startAngle={0}
                                totalValue={100}
                                viewBoxSize={[
                                    100,
                                    50
                                ]}
                                />
                            </Card.Body>                        
                        </Card>
                        
                    </Col>
                    <Col md={6} xl={6}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                            <h6 className='mb-4'>Monthly Posts Progress</h6>
                            <ReactMinimalPieChart
                                animate={true}
                                animationDuration={1000}
                                animationEasing="ease-out"
                                cx={50}
                                cy={25}
                                data={[
                                    {
                                    color: '#1dc6e6',
                                    value: this.state.weeklycount
                                    }
                                ]}
                                label
                                labelPosition={0}
                                labelStyle={{
                                    fontFamily: 'sans-serif',
                                    fontSize: '10px'
                                }}
                                lengthAngle={360}
                                lineWidth={20}
                                onClick={undefined}
                                onMouseOut={undefined}
                                onMouseOver={undefined}
                                paddingAngle={0}
                                radius={20}
                                rounded={false}
                                startAngle={0}
                                totalValue={this.state.totalPosts}
                                viewBoxSize={[
                                    100,
                                    50
                                ]}
                                />
                            </Card.Body>                        
                        </Card>
                        
                    </Col>
                    <Col md={4} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                            <h6 className='mb-4'>Monthly posts by Country</h6>
                            <ReactMinimalPieChart
                                animate={false}
                                animationDuration={500}
                                animationEasing="ease-out"
                                cx={50}
                                cy={20}
                                data={this.state.partiCountries}
                                label = {props => { return props.data[props.dataIndex].title;}}
                                labelPosition={70}
                                labelStyle={{
                                    fontFamily: 'sans-serif',
                                    fontSize: '2px'
                                }}
                                lengthAngle={360}
                                lineWidth={20}
                                onClick={undefined}
                                onMouseOut={undefined}
                                onMouseOver={undefined}
                                paddingAngle={18}
                                radius={20}
                                rounded
                                startAngle={0}
                                viewBoxSize={[
                                    100,
                                    45
                                ]}
                                />
                            </Card.Body>                        
                        </Card>
                        
                    </Col>
                    <Col md={4} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>                            
                            <BuyingSelling />
                            </Card.Body>                        
                        </Card>
                        
                    </Col>
                     <Col md={4} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                            
                            <LineDemo/>

                            </Card.Body>                        
                        </Card>
                        
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Dashboard;