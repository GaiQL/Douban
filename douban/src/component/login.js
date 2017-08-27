import React, {Component} from 'react';
import $ from 'jquery';
import {Link,Redirect} from 'react-router-dom';
import dataLogin from './data/dataLogin.js';

class Login extends Component{
  landing = () => {
    if(this.props.data.user.filter(e=>e.account === this.refs.account.value).length){
      this.props.data.user.forEach((e,i)=>{
        if(e.account === this.refs.account.value){
          if(e.password === this.refs.password.value){
            this.props.landfallBol(e);
          }else{
            alert('您输入的密码有误')
            return
          }
        }
      })
    }else{
      alert('用户名不存在');
    }
    // if(this.props.data.user.filter(e=>e.account === this.refs.account.value).length){
    //
    // }else{
    //   alert('此用户名不存在');
    // }
  }
  render(){
    console.log(this.props.data)
    return (
      <div>
        <div className="login">
    			<h3 className="login_title">
    				<Link to="/"><span className="login_cancel">取消</span></Link>
    				<span>登录豆瓣</span>
    			</h3>
    		</div>
    		<div className="login_accounts">
    			<input type="text" className="login_input" placeholder="账号" ref="account"/>
    			<input type="password" className="login_input" placeholder="密码" ref="password"/>
    			<input type="button" className="login_inputBtn" value="登陆" onClick={this.landing}/>
    			<Link to="/registration"><p className="login_inputP">注册豆瓣账号</p></Link>
    		</div>
      </div>
    )
  }
}
export default Login
