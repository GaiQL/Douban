import React, {Component} from 'react';
import dataLogin from './data/dataLogin.js';
import Login from './login';
class Transfer extends Component{
  constructor(){
    super();
    this.state = {
      dataLogin:dataLogin,
      countVal:'',
      passwordVal:'',
    }
  }
  changeCount = (ev) => {
    this.setState({
      countVal:ev.target.value
    })
  }
  changePassword = (ev) => {
    this.setState({
      passwordVal:ev.target.value
    })
  }
  render(){
    return(
      <Login state={this.state} changeCount={this.changeCount} changePassword={this.changePassword}/>
    )
  }
}
export default Transfer;
