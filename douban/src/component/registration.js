import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom'
class Registration extends Component{
  next = () => {
    console.log(this.props);
    console.log(this.refs.account.value);
    if(!/^[A-Za-z].{5,}$/.test(this.refs.account.value)){
      alert('输入的账号格式有误');
      return
    }
    if(!/^\d{6,}$/.test(this.refs.password.value)){
      alert('输入的密码格式有误');
      return
    }
    if(this.refs.confirm.value !== this.refs.password.value){
      alert('两次输入的不一样');
      return
    }
    this.props.registrationHalfT();
  }
  render(){
    return (
      <div className="registration">
        <h3 className="registration_welcome">欢迎加入豆瓣</h3>
        <input type="text" className="regloginput" placeholder="账号（最少六位，字母开头）" ref="account"/>
        <input type="password" className="regloginput" placeholder="密码（最少六位）" ref="password"/>
        <input type="password" className="regloginput regloginputBorder" placeholder="再次确认密码" ref="confirm"/>
        <input type="button" className="regloginputBtn" value="下一步" onClick={this.next}/>
        <p className="reglogP">点击【下一步】代表你已经阅读并同意<a style={{textDecoration:'underline'}} href="https://accounts.douban.com/app/agreement">用户使用协议</a></p>
        <Link to="/login"><p className="reglogPCb">返回</p></Link>
      </div>
    )
  }
}
export default Registration
