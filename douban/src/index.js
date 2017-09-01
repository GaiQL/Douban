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
import RegistrationT from './component/registrationT';
import HomePage from './component/homePage';
import Movie_list from './component/movie_list';

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
class Movie_classification extends Component{
  render(){
    return (
      <Link to={
        {
          pathname:"/Moviecon/"+this.props.fication,
          state:this.props.fication,
          jump:this.props.fication
        }
      }><li>{this.props.fication}<span></span></li></Link>
    )
  }
}
class Movie_listList extends Component{
  render(){
    console.log(this.props);
    return (
      <Link to={
        {
          pathname:"/movie_list/"+this.props.search,
          jump:this.props.search,
          id:this.props.id
        }
      }><li>{this.props.findmoive}</li></Link>
    )
  }
}
class Totality extends Component{
  render(){
    let {movie_classification} = this.props.data;
    let {movie_list} = this.props.data;
    console.log(this.props.data)
    console.log(movie_list)
    let list = movie_classification.map((e,i)=>{
      let data = {
        fication:e,
        key:i,
      }
      return  <Movie_classification {...data}/>
    });
    let findmoiveList = movie_list.map((e,i)=>{
      let data = {
        findmoive:e.listName,
        search:e.search,
        key:i,
        id:i
      }
      return  <Movie_listList {...data}/>
    });
    console.log(this.props);
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
          <div className="moive_findmoiveListOut">
            <ul className="moive_findmoiveList clear">
              {findmoiveList}
            </ul>
            <ul className="moive_findmoiveList clear">

            </ul>
          </div>
        </section>
        <section className="moive_classify">
          <header className="moive_head">
            <h3>分类浏览</h3>
          </header>
          <ul className="moive_classifylist clear">
            {list}
          </ul>
        </section>
        <section className="model_footer">
          <dl className="model_footerlist clear">
            <dt><img src="https://img3.doubanio.com/f/talion/7837f29dd7deab9416274ae374a59bc17b5f33c6/pics/card/douban-app-logo.png"/></dt>
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
        <h3><Link to="/"><img src={require('./img/logo.png')}/></Link></h3>
        <ul className="clear" id="nav">
          <Link to="/moive"><li>电影</li></Link>
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
const registrationFinishT = { type: 'registrationFinishT' }
const registrationHalfT = {type:'registrationHalfT'}
const registrationFinishF = { type: 'registrationFinishF' }
const registrationHalfF = {type:'registrationHalfF'}
const touchStart = {type:'touchStart'}
const yearIncrease = {type:'yearIncrease'}
const movielist = {type:'movielist'}
if(!window.localStorage.length){
  localStorage.setItem('data',JSON.stringify(dataLogin))
}
function counter(state = JSON.parse(localStorage.getItem('data')), action) {
  switch (action.type) {
    case 'landfallBol':
      console.log(action.data)
      var landObj = deepClone(state);
      landObj.landfallBol = !landObj.landfallBol;
      landObj.userNow = action.data;
      localStorage.setItem('data',JSON.stringify(landObj))
      return landObj
    case 'registrationHalfT':
      var landObj = deepClone(state);
      landObj.registrationHalf = true;
      localStorage.setItem('data',JSON.stringify(landObj))
      return landObj
    case 'registrationFinishT':
      var landObj = deepClone(state);
      landObj.registrationFinish = true;
      localStorage.setItem('data',JSON.stringify(landObj))
      return landObj
      case 'registrationHalfF':
        var landObj = deepClone(state);
        landObj.registrationHalf = false;
        localStorage.setItem('data',JSON.stringify(landObj))
        return landObj
      case 'registrationFinishF':
        var landObj = deepClone(state);
        landObj.registrationFinish = false;
        localStorage.setItem('data',JSON.stringify(landObj))
        return landObj
      case 'touchStart':
        var landObj = deepClone(state);
        landObj.touchStart = action.touchStartNum;
        landObj.touchNowSty = action.nowSty;
        landObj.liH = action.liH;
        localStorage.setItem('data',JSON.stringify(landObj))
        return landObj
        break;
      case 'yearIncrease':
        var landObj = deepClone(state);
        landObj.birthdayYear = landObj.birthdayYear.map((e,i)=>{
          return e+1;
        })
        localStorage.setItem('data',JSON.stringify(landObj))
        return landObj
      case 'movielist':
      var landObj = deepClone(state);
        landObj.movie_list[action.listid].data = action.movieList;
        localStorage.setItem('data',JSON.stringify(landObj))
        return landObj
    default:
      return state
  }
}
// return state.map((elt)=>{
//   if(elt.id === id){
//     elt.value--;
//   }
//   return state;
// })
function mapStateToPropss(state) {
  return {
    data:state
  }
}
function mapDispatchToPropss(dispatch) {
  return {
    landfallBol: (e) => {
      dispatch({ type: 'landfallBol' ,data:e})
    },
    registrationFinishT: () => dispatch(registrationFinishT),
    registrationHalfT: () => dispatch(registrationHalfT),
    registrationFinishF: () => dispatch(registrationFinishF),
    registrationHalfF: () => dispatch(registrationHalfF),
    touchStart:(e,Sty,liH) => {
      dispatch({ type: 'touchStart' , touchStartNum:e , nowSty:Sty , liH:liH})
    },
    yearIncrease: () => dispatch(yearIncrease),
    movielist: (list,id) => {
      dispatch({ type: 'movielist' , movieList:list , listid:id })
    },
  }
}
class Lqq extends Component{
  render(){
    let header = <Header {...this.props}/>
    return (
      <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={()=>{
              return <div>{header}<HomePage /></div>
            }}></Route>
            <Route path="/moive"  render={(props)=>{
              return <div>{header}<Totality {...props}{...this.props}/></div>
            }}></Route>
            <Route path="/Moive_detailed/:id" render={(props)=>{
              return <div>{header}<Moive_detailed {...props}/></div>
            }}></Route>
            <Route path="/Moviecon/:id" render={(props)=>{
              return <div>{header}<Moviecon {...props}/></div>
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
            <Route path="/registration" render={(props)=>{
              if(this.props.data.registrationHalf){
                return <Redirect to="/registrationt" />
              }else{
                return <Registration {...props}{...this.props}/>
              }
            }}></Route>
            <Route path="/personal" render={(props)=>{
              if(this.props.data.landfallBol){
                return <div>{header}<Personal {...props}{...this.props}/></div>
              }else{
                return <Redirect to="/login" />
              }
            }}></Route>
            <Route path="/registrationt" render={()=>{
              if(this.props.data.registrationFinish){
                return <Redirect to="/login" />
              }else{
                return <RegistrationT {...this.props}/>
              }
            }}></Route>
            <Route path="/movie_list" render={(props)=>{
              return <div>{header}<Movie_list {...this.props}{...props}/></div>
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
