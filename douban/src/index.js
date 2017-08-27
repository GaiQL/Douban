import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Moive_show from './component/moive_show';
import Moive_showS from './component/moive_showS';
import Moive_showT from './component/moive_showT';
import Moive_detailed from './component/moive_detailed';
import Move_margin from './component/move_margin';
import Login from './component/login';
import Registration from './component/registration';
import dataLogin from './component/data/dataLogin';
import Personal from './component/personal';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';


import Moviecon from './component/moviecon';
// import TryO from './component/tryO';
// import TryT from './component/tryT';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './css/style.css';
import './css/reglogcss.css';
import './component/pixel';
class Totality extends Component{
  //在全局定义一个id,当我点击li时，将我的id从组建传递到全局，然后再由全局传递到另一个子组件
  render(){
    return (
      <div>
        <div id="page">
              <Moive_show />
              <Moive_showS />
              <Moive_showT />
        </div>
        <section className="moive_findmoive">
          <header className="moive_head">
            <h3>发现好电影</h3>
          </header>
          <ul className="moive_findmoiveList clear">
            <li>同时入选IMDB250和豆瓣电影250的电影</li>
            <li>同时入选IMDB250和豆瓣电影250的电影</li>
            <li>带你进入不正常的世界</li>
            <li>带你进入不正常的世界</li>
          </ul>
        </section>
        <section className="moive_classify">
          <header className="moive_head">
            <h3>分类浏览</h3>
          </header>
          <ul className="moive_classifylist clear">
            <li>经典<span></span></li>
            <li>冷门佳片<span></span></li>
            <li>豆瓣高分<span></span></li>
            <li>动作<span></span></li>
            <li>喜剧<span></span></li>
            <li>爱情<span></span></li>
            <li>悬疑<span></span></li>
            <li>恐怖<span></span></li>
            <li>科幻<span></span></li>
            <li>治愈<span></span></li>
            <li>文艺<span></span></li>
            <li>成长<span></span></li>
            <li>动画<span></span></li>
            <li>华语<span></span></li>
            <li>欧美<span></span></li>
            <li>韩国<span></span></li>
            <li>日本<span></span></li>
          </ul>
        </section>
        <section className="model_footer">
          <dl className="model_footerlist clear">
            <dt><img src="img/DB.png"/></dt>
            <dd>
              <p>豆瓣</p>
              <p>我们的精神角落</p>
            </dd>
          </dl>
          <p className="model_footerAdd">免费下载 Android 客户端</p>
        </section>
      </div>
    )
  }
}
class Header extends Component{
  render(){
    let land = null;
    let onOff = null;
    if(this.props.data){
      onOff = this.props.data.landfallBol
    }
    if(onOff){
      land = <Link to="/personal"><li id="account">{this.props.data.userNow.userName}</li></Link>

    }else{
      land = <Link to="/login"><li>登录</li></Link>
    }
    return (
      <header id="top" className="clear" ref="top">
        <h3><img src={require('./img/logo.png')}/></h3>
        <ul className="clear" id="nav">
          <Link to="/"><li>电影</li></Link>
          <li>图书</li>
          <li>广播</li>
          {land}
          <li id="hunt"><img src={require("./img/ss.png")}/></li>
        </ul>
      </header>
    )
  }
}
const store = createStore(counter);
const deepClone=(obj)=>{
   var proto=Object.getPrototypeOf(obj);
   return Object.assign({},Object.create(proto),obj);
}
const increaseAction = { type: 'landfallBol' }
const jianfai = { type: 'jianfai1' }
if(!window.localStorage.length){
  localStorage.setItem('data',JSON.stringify(dataLogin))
}
function counter(state = JSON.parse(localStorage.getItem('data')), action) {
  switch (action.type) {
    case 'landfallBol':
      console.log(action.data)
      let landObj = deepClone(state);
      landObj.landfallBol = !landObj.landfallBol;
      landObj.userNow = action.data;
      localStorage.setItem('data',JSON.stringify(landObj))
      return landObj
    // case 'jianfai1':
    //   return
    default:
      return state
  }
}
function mapStateToPropss(state) {
  return {
    data:state
  }
}
function mapDispatchToPropss(dispatch) {
  return {
    landfallBol: (e) => {
      console.log(e);
      dispatch({ type: 'landfallBol' ,data:e})
    },
    hehe: () => dispatch(jianfai)
  }
}
class Lqq extends Component{
  render(){
    console.log(this.props)
    let header = <Header {...this.props}/>
    return (
      <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/"  render={(props)=>{
              return <div>{header}<Totality {...props  }/></div>
            }}></Route>
            <Route path="/Moive_detailed/:id" render={(props)=>{
              return <div>{header}<Moive_detailed {...props  }/></div>
            }}></Route>
            <Route path="/Moviecon/:id" render={(props)=>{
              return <div>{header}<Moviecon {...props  }/></div>
            }}></Route>
            <Route path="/move_margin/:id" render={(props)=>{
              return <div>{header}<Move_margin {...props  }/></div>
            }}></Route>
            <Route path="/login" render={(props)=>{
              if(this.props.data.landfallBol){
                return <Redirect to="/" />
              }else{
                return <Login {...this.props}{...props}/>
              }
            }}></Route>
            <Route path="/registration" component={Registration}></Route>
            <Route path="/personal" render={(props)=>{
              if(this.props.data.landfallBol){
                return <div>{header}<Personal {...props}{...this.props}/></div>
              }else{
                return <Redirect to="/login" />
              }
            }}></Route>
          </Switch>
        </div>
      </Router>
      </Provider>
    )
  }
}
const AppLogin = connect(
  mapStateToPropss,
  mapDispatchToPropss
)(Lqq)
ReactDOM.render(
  <Provider store={store}>
    <AppLogin />
  </Provider>
  , document.getElementById('root'));
if (module.hot) {
  module.hot.accept();
}
// <div>
//   <TryO />
//   <TryT />
// </div>
