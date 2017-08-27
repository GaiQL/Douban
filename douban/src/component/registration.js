import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom'
class Registration extends Component{
  render(){
    return (
      <div className="registration">
        <h3 className="registration_welcome">欢迎加入豆瓣</h3>
        <input type="text" className="regloginput" placeholder="账号"/>
        <input type="text" className="regloginput" placeholder="密码（最少六位）"/>
        <input type="text" className="regloginput regloginputBorder" placeholder="昵称"/>
        <input type="button" className="regloginputBtn" value="下一步"/>
        <p className="reglogP">点击【下一步】代表你已经阅读并同意<a href="https://accounts.douban.com/app/agreement">用户使用协议</a></p>
        <Link to="/login"><p className="reglogPCb">返回</p></Link>
      </div>
    )
  }
}
export default Registration
