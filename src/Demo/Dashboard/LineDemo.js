import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import firebase from 'firebase';

export default class LineDemo extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [0, 0, 0, 0, 0, 0, 0]
                  },
                ]
              }
        }
        
    }
    async componentWillMount(){
        let todaycount=0
        let onecount = 0
        let twocount = 0
        let threecount = 0
        let fourcount = 0
        let fivecount = 0
        let sixcount = 0
        let today = this.getDate(new Date().getTime())
        let one = this.getDate(new Date().getTime()-24*60*60*1000)
        let two = this.getDate(new Date().getTime()-48*60*60*1000)
        let three = this.getDate(new Date().getTime()-72*60*60*1000)
        let four = this.getDate(new Date().getTime()-96*60*60*1000)
        let five = this.getDate(new Date().getTime()-120*60*60*1000)
        let six = this.getDate(new Date().getTime()-144*60*60*1000)
        let seven = this.getDate(new Date().getTime()-168*60*60*1000)
        await this.getPostData(value=>{
          Object.keys(value).map((data)=>{
            if(data==='sell'){
                Object.keys(value[data]).map((sub_data)=>{
                    Object.keys(value[data][sub_data]).map(item=>{
                        Object.keys(value[data][sub_data][item]).map(sub_item=>{    
                          
                          if(parseInt(sub_item)>=new Date().getTime()-24*60*60*1000 && parseInt(sub_item)<new Date().getTime()){
                            todaycount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-48*60*60*1000) && parseInt(sub_item)<new Date().getTime()-24*60*60*1000){
                            onecount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-72*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-48*60*60*1000)){
                            twocount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-96*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-72*60*60*1000)){
                            threecount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-120*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-96*60*60*1000)){
                            fourcount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-144*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-120*60*60*1000)){
                            fivecount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-168*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-144*60*60*1000)){
                            sixcount += 1
                          }
                        })         
                    })
                })
            } else if(data==='buy'){
                Object.keys(value[data]).map((sub_data)=>{
                    Object.keys(value[data][sub_data]).map(item=>{
                        Object.keys(value[data][sub_data][item]).map(sub_item=>{                                
                          if(parseInt(sub_item)>=new Date().getTime()-24*60*60*1000 && parseInt(sub_item)<new Date().getTime()){
                            todaycount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-48*60*60*1000) && parseInt(sub_item)<new Date().getTime()-24*60*60*1000){
                            onecount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-72*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-48*60*60*1000)){
                            twocount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-96*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-72*60*60*1000)){
                            threecount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-120*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-96*60*60*1000)){
                            fourcount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-144*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-120*60*60*1000)){
                            fivecount += 1
                          } else if (parseInt(sub_item)>=this.getDate(new Date().getTime()-168*60*60*1000) && parseInt(sub_item)<this.getDate(new Date().getTime()-144*60*60*1000)){
                            sixcount += 1
                          }
                        })         
                    })
                })
            } else {
                Object.keys(value[data]).map((sub_data)=>{
                    Object.keys(value[data][sub_data]).map(item=>{                          
                      if(parseInt(item)>=new Date().getTime()-24*60*60*1000 && parseInt(item)<new Date().getTime()){
                        todaycount += 1
                      } else if (parseInt(item)>=this.getDate(new Date().getTime()-48*60*60*1000) && parseInt(item)<new Date().getTime()-24*60*60*1000){
                        onecount += 1
                      } else if (parseInt(item)>=this.getDate(new Date().getTime()-72*60*60*1000) && parseInt(item)<this.getDate(new Date().getTime()-48*60*60*1000)){
                        twocount += 1
                      } else if (parseInt(item)>=this.getDate(new Date().getTime()-96*60*60*1000) && parseInt(item)<this.getDate(new Date().getTime()-72*60*60*1000)){
                        threecount += 1
                      } else if (parseInt(item)>=this.getDate(new Date().getTime()-120*60*60*1000) && parseInt(item)<this.getDate(new Date().getTime()-96*60*60*1000)){
                        fourcount += 1
                      } else if (parseInt(item)>=this.getDate(new Date().getTime()-144*60*60*1000) && parseInt(item)<this.getDate(new Date().getTime()-120*60*60*1000)){
                        fivecount += 1
                      } else if (parseInt(item)>=this.getDate(new Date().getTime()-168*60*60*1000) && parseInt(item)<this.getDate(new Date().getTime()-144*60*60*1000)){
                        sixcount += 1
                      }
                    })
                })
            }               
          }) 
          this.setState({data:{
            labels: [six, five, four, three, two, one, today],
            datasets: [
              {
                label: 'Post Numbers',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [sixcount, fivecount, fourcount, threecount, twocount, onecount, todaycount]
              },
            ]
          }})
        })
        
    }

    getPostData =(callback)=>{
      firebase.database().ref(`/NewPosts/`).once("value", snap=>{
        callback(snap.val())
      })
    }
    getDate = (timestamp) => {        
        var date = new Date(                          // Convert to date
            parseInt(                                   // Convert to integer
                timestamp                  // Take only the part right of the "("
            )
          );
        // console.log( [
        //     ("0" + date.getDate()).slice(-2),           // Get day and pad it with zeroes
        //     ("0" + (date.getMonth()+1)).slice(-2),      // Get month and pad it with zeroes
        //     date.getFullYear()                          // Get full year
        //   ].join('/'))
          return [
            ("0" + date.getDate()).slice(-2),           // Get day and pad it with zeroes
            ("0" + (date.getMonth()+1)).slice(-2),      // Get month and pad it with zeroes
            date.getFullYear()                          // Get full year
          ].join('/');   
    }
  render() {
      
    return (
      <div>
        <h6>Daily number of posts chart</h6>
        <Line ref="chart" data={this.state.data} />        
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);
  }
}