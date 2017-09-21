import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Moive_show from './component/moive_show';
import Moive_showS from './component/moive_showS';
import Moive_showT from './component/moive_showT';
import Moive_detailed from './component/moive_detailed';
import Move_margin from './component/move_margin';
import Login from './component/login';
import Registration from './component/registration';
import {dataLogin} from './component/data/dataLogin';
import {changeSqd} from './component/data/dataLogin';

import Personal from './component/personal';
import RegistrationT from './component/registrationT';
import Movie_list from './component/movie_list';
import {Personal_movie} from './component/personal_movie';
import Personal_movieCollect from './component/personal_movieCollect';
import Personal_moviestar from './component/personal_moviestar';
import Search from './component/search';

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

// url(//img3.doubanio.com/dae/accounts/resources/c936707/movie/assets/lg_movie_a12_2.png) no-repeat 0 12px
// <Link to="/moive"><li>电影</li></Link>
// <li>图书</li>
// <li>广播</li>
if(!window.localStorage.length){
  localStorage.setItem('data',JSON.stringify(dataLogin))
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
const personal_movieWant = {type:'personal_movieWant'}
const personal_movieLook = {type:'personal_movieLook'}
const personal_collect = {type:'personal_collect'}
const personal_movieDelete = {type:'personal_movieDelete'}
const personal_moviestar = {type:'personal_moviestar'}
const headImageChange = {type:'headImageChange'}



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
      let useraccountArr = [];
      landObj.user.forEach((e,i)=>{
        useraccountArr.push(e.id);
      })
      useraccountArr = useraccountArr.sort((a,b)=>b-a);
      landObj.registrationNow = {
        id:useraccountArr[0]+1,
        account:action.account,
        password:action.password,
      };
      console.log(landObj.user)
      landObj.registrationHalf = true;
      localStorage.setItem('data',JSON.stringify(landObj))
      return landObj
    case 'registrationFinishT':
      var landObj = deepClone(state);
      console.log(landObj.userNow)
      if(landObj.landfallBol){
        landObj.user.forEach((e,i)=>{
          if(landObj.userNow.id === e.id){
              e.userName=action.username
              e.profile=action.profile
              e.sex=action.sex
              landObj.userNow = e;
          }
        })
      }else{
        landObj.registrationNow = {
          ...landObj.registrationNow,
          userName:action.username,
          headImage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504687565409&di=4f7796c278827f6d9a46560176896def&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F59%2F55%2F67n58PICB7J_1024.png',
          Personal_movieWant:[],
          Personal_movieLook:[],
          Personal_collect:[],
          Personal_moviestar:[],
          profile:action.profile,
          sex:action.sex,
        }
        landObj.user.push(landObj.registrationNow)
        alert('注册成功，返回登录')
        window.location.reload()
        landObj.registrationFinish = true;
      }
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
        landObj.movie_list.forEach((e,i)=>{
          if(e.search === action.listid){
            e.data = action.movieList;
            landObj.movie_listNow = e;
          }
        })
        localStorage.setItem('data',JSON.stringify(landObj))
        return landObj
      case 'personal_movieWant':
        var landObj = deepClone(state);
        let Personal_movieWantIdArr = [];
        landObj.user.forEach((e,i)=>{
          if(e.id===action.id){
            let user = e;
            if(e.Personal_movieWant.length){
              e.Personal_movieWant.forEach((e,i)=>{
                Personal_movieWantIdArr.push(e.id)
              });
              if(!Personal_movieWantIdArr.includes(action.obj.id)){
                user.Personal_movieWant.push(action.obj);
              }
            }else{
              e.Personal_movieWant.push(action.obj);
            }
            e.Personal_movieLook = e.Personal_movieLook.filter((e,i)=>{
              return action.obj.id !== e.id
            })
            landObj.userNow = e;
          }
        })
        localStorage.setItem('data',JSON.stringify(landObj));
        return landObj
      case 'personal_movieLook':
        var landObj = deepClone(state);
        let Personal_movieLookIdArr = [];
        landObj.user.forEach((e,i)=>{
          if(e.id===action.id){
            let user = e;
            if(e.Personal_movieLook.length){
              e.Personal_movieLook.forEach((e,i)=>{
                Personal_movieLookIdArr.push(e.id)
              });
              if(!Personal_movieLookIdArr.includes(action.obj.id)){
                user.Personal_movieLook.push(action.obj);
              }
            }else{
              e.Personal_movieLook.push(action.obj);
            }
            e.Personal_movieWant = e.Personal_movieWant.filter((e,i)=>{
              return action.obj.id !== e.id
            })
            landObj.userNow = e;
          }
        })
        localStorage.setItem('data',JSON.stringify(landObj));
        return landObj
      case 'personal_collect':
        var landObj = deepClone(state);
        if(action.onOff){
          let Personal_collectArr = [];
          landObj.user.forEach((e,i)=>{
            if(e.id===landObj.userNow.id){
              console.log(e.Personal_collect)
              e.Personal_collect.forEach((e,i)=>{
                console.log(e.search)
                Personal_collectArr.push(e.search);
              })
              if(!Personal_collectArr.includes(action.obj.search)){
                  e.Personal_collect.push(action.obj);
                  landObj.movie_list.forEach((e,i)=>{
                    if(e.search === landObj.movie_listNow.search){
                      e.loveNum++;
                    }
                  })
              }
              landObj.userNow = e;
            }
          })
        }else{
          landObj.user.forEach((e,i)=>{
            if(e.id === landObj.userNow.id){
              e.Personal_collect = e.Personal_collect.filter((e,i)=>{
                if(e.search === action.obj.search){
                  landObj.movie_list.forEach((e,i)=>{
                    if(e.search === landObj.movie_listNow.search){
                      e.loveNum--;
                    }
                  })
                }
                console.log(e.search,)
                return e.search !== action.obj.search;
              })
              landObj.userNow = e;
            }
          })
        }
        localStorage.setItem('data',JSON.stringify(landObj));
        return landObj;
      case 'personal_movieDelete':
        var landObj = deepClone(state);
        landObj.user.forEach((e,i)=>{
          if(e.id === landObj.userNow.id){
            e.Personal_movieWant =  e.Personal_movieWant.filter((e,i)=>{
              return e.id !== action.obj.id;
            })
            e.Personal_movieLook =  e.Personal_movieLook.filter((e,i)=>{
              return e.id !== action.obj.id;
            })
            landObj.userNow = e;
          }
        })
        localStorage.setItem('data',JSON.stringify(landObj));
        return landObj;
      case 'personal_moviestar':
        var landObj = deepClone(state);
        if(action.onOff){
          let Personal_moviestarArr = [];
          landObj.user.forEach((e,i)=>{
            if(e.id === landObj.userNow.id){
              e.Personal_moviestar.forEach((e,i)=>{
                Personal_moviestarArr.push(e.id);
              })
              if(!Personal_moviestarArr.includes(action.obj.id)){
                  e.Personal_moviestar.push(action.obj);
              }
              landObj.userNow = e;
            }
          })
        }else{
          landObj.user.forEach((e,i)=>{
              if(e.id === landObj.userNow.id){
                e.Personal_moviestar = e.Personal_moviestar.filter((e,i)=>{
                  return action.obj.id !== e.id
                })
                landObj.userNow = e;
              }
          })
        }
        localStorage.setItem('data',JSON.stringify(landObj));
        return landObj;
      case 'headImageChange':
        var landObj = deepClone(state);
        if(landObj.landfallBol){
          landObj.user.forEach((e,i)=>{
            if(e.id === landObj.userNow.id){
              e.headImage = action.img;
              landObj.userNow = e;
            }
          })
        }else{
          landObj.registrationNow.headImage = action.img;
        }
        localStorage.setItem('data',JSON.stringify(landObj));
        return landObj;
      case 'unmount':
        var landObj = deepClone(state);
        landObj.movie_listNow = {};
        localStorage.setItem('data',JSON.stringify(landObj));
        return landObj;
    default:
      console.log(state)
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
      dispatch({ type: 'landfallBol' ,data:e})
    },
    registrationFinishT: (username,profile,sex) => {
      dispatch({type:'registrationFinishT',username:username,profile:profile,sex:sex})
    },
    registrationHalfT: (account,password) => {
      dispatch({type:'registrationHalfT',account:account,password:password})
    },
    registrationFinishF: () => dispatch(registrationFinishF),
    registrationHalfF: () => dispatch(registrationHalfF),
    touchStart:(e,Sty,liH) => {
      dispatch({ type: 'touchStart' , touchStartNum:e , nowSty:Sty , liH:liH})
    },
    yearIncrease: () => dispatch(yearIncrease),
    movielist: (list,id) => {
      dispatch({ type: 'movielist' , movieList:list , listid:id })
    },
    personal_movieWant:(obj,id)=>{
      dispatch({ type: 'personal_movieWant',obj:obj,id:id  })
    },
    personal_movieLook:(obj,id)=>{
      dispatch({ type: 'personal_movieLook',obj:obj,id:id})
    },
    personal_collect:(obj,onOff)=>{
      dispatch({ type: 'personal_collect',obj:obj,onOff:onOff})
    },
    personal_movieDelete:(obj)=>{
      dispatch({ type: 'personal_movieDelete',obj:obj })
    },
    personal_moviestar:(obj,onOff)=>{
      dispatch({ type: 'personal_moviestar',obj:obj,onOff:onOff })
    },
    headImageChange:(img)=>{
      dispatch({ type: 'headImageChange',img:img});
    },
    unmount:()=>{
      dispatch({ type: 'unmount'});
    }
  }
}
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
    console.log(this.props.search);
    return (
      <Link to={
        {
          pathname:"/movie_list/"+this.props.search,
          jump:this.props.search,
          id:this.props.id
        }
      } onClick={this.click}><li>{this.props.findmoive}</li></Link>
    )
  }
}
class Totality extends Component{
  componentDidMount(){
    this.refs.node.scrollIntoView();
  }
  render(){
    console.log(JSON.parse(localStorage.getItem('data')),this.props.data)
    let {movie_classification} = this.props.data;
    let {movie_list} = this.props.data;
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
    return (
      <div ref="node">
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
        <h3><Link to="/"><img src='//img3.doubanio.com/dae/accounts/resources/c936707/movie/assets/lg_movie_a12_2.png'/></Link></h3>
        <ul className="clear" id="nav">
          {land}
          <Link to={
            {
              pathname:'/search'
            }
          }><li className="hunt"><img src={require("./img/ss.png")}/></li></Link>
        </ul>
      </header>
    )
  }
}
// var Haha = React.createClass({
//   getInitialState: function() {//组件相关的状态对象
//        return {clickNum:0};
//    },
//    handClick:function(){
//      var num = this.state.clickNum;
//      num++;
//      this.setState({clickNum:num});
//    },
//    render:function(){
//      return(
//        <div>
//         <p onClick={this.handClick}>this.state.clickNum</p>
//        </div>
//      )
//    }
// })
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
              return <div>{header}<Totality {...this.props}{...props}/></div>
            }}></Route>
            <Route path="/Moive_detailed/:id" render={(props)=>{
              return <div>{header}<Moive_detailed {...props}{...this.props}/></div>
            }}></Route>
            <Route path="/Moviecon/:id" render={(props)=>{
              return <div>{header}<Moviecon {...props}{...this.props}/></div>
            }}></Route>
            <Route path="/move_margin/:id" render={(props)=>{
              return <div>{header}<Move_margin {...props}{...this.props}/></div>
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
            <Route exact path="/personal" render={(props)=>{
              if(this.props.data.landfallBol){
                return <div>{header}<Personal {...props}{...this.props}/></div>
              }else{
                alert('登录后添加')
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
            <Route path="/movie_list/:id" render={(props)=>{
              return <div>{header}<Movie_list {...this.props}{...props}/></div>
            }}></Route>
            <Route path="/personal/movie" render={(props)=>{
              return <div>{header}<Personal_movie {...this.props}{...props}/></div>
            }}></Route>
            <Route path="/personal/collect" render={(props)=>{
              return <div>{header}<Personal_movieCollect {...this.props}{...props}/></div>
            }}></Route>
            <Route path="/personal/moviestar" render={(props)=>{
              return <div>{header}<Personal_moviestar {...this.props}{...props}/></div>
            }}></Route>
            <Route path="/personal/edit" render={(props)=>{
              return <div>{header}<div id='page'><RegistrationT {...this.props}{...props}/></div></div>
            }}></Route>
            <Route path="/search" render={(props)=>{
              return <div><Search {...this.props}{...props}/></div>
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
