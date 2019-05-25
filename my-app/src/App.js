import React, { Component } from 'react';
import Header from './components/Header';
import ShowUsers from './components/ShowUsers';
import PushNotify from './components/PushNotify';
import socketIOClient from "socket.io-client";
import styles from './styles';

class App extends Component {
  constructor(){
    super()
    this.state = {
        newData:[],
        endpoint:'http://localhost:5000',
        signal:false
      }
  }
  //create client socket to listen when new users added
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data =>this.setState({newData:data.users}));
  }
  // to show push notification window 
  NewPushNotification=()=>{
    if(this.state.newData.length!==0)
      return (<PushNotify NewUsers={this.state.newData}  close={this.ClosePushNotification} />)
  }
  // closing push notification
  ClosePushNotification=()=>{
    this.setState({newData:[],signal:true});
  }

  render() {
    return (
      <div  style={styles.App}>
        {this.NewPushNotification()}
        <Header ></Header>
        <ShowUsers signal={this.state.signal}/>
      </div>
      
      
    );
  }
}

export default App;
