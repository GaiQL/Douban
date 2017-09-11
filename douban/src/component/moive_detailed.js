import React, {Component} from 'react';
import $ from 'jquery';
import Move_margin from './move_margin';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
class Moive_detailedActors extends Component{
  render(){
    return (
      <li>
        <Link to={
          {
            pathname:'/move_margin/'+this.props.id,
            jump:this.props.id
          }
        }>
          <img src={this.props.images}/>
          <p>{this.props.name}</p>
          <p>演员</p>
        </Link>
      </li>
    )
  }
}
class Moive_detailedDirector extends Component{
  render(){
    return (
      <li>
        <Link to={
          {
            pathname:'/move_margin/'+this.props.id,
            jump:this.props.id
          }
        }>
          <img src={this.props.images}/>
          <p>{this.props.name}</p>
          <p>导演</p>
        </Link>
      </li>
    )
  }
}
class Moive_detailed extends Component{
  constructor(){
    super();
    this.state = {
      data:[],
      unfold:false
    }
  }
  componentDidMount(){
    this.refs.node.scrollIntoView();
    let that = this;
    $.ajax({
      url:'https://api.douban.com/v2/movie/subject/'+this.props.location.state,
      dataType:'jsonp',
      success:function(data){
        that.setState({
          data
        });
      }
    })
  }
  // 'https://api.douban.com/v2/movie/subject/'+'26363254'
  click = () => {
    this.setState({
      unfold:true
    })
  }
  render(){
    let {data} = this.state
    let images = null;
    let summary = null;
    let directorL = null;
    let actorsL = null;
    let average = null;
    let arr = [];
    let n = 0;
    let str = '';
    if(data.images){
      images = data.images.medium;
      if(data.rating.average == '0'){
        average = '暂无评论'
      }else{
        average = data.rating.average
      }
      data.aka.forEach((e,i)=>{
        str += e + ' / '
      })
      data.genres.forEach((e,i)=>{
        str += e + ' / '
      })
      if(this.state.unfold){
        summary = data.summary
      }else{
        summary = data.summary.substr(0,60)
      }
      directorL = data.directors.map((e,i) => {
        let images = null;
        if(e.avatars){
          images = e.avatars.medium;
        }else{
          return;
        }
        let data={
          key:i,
          images:images,
          name:e.name,
          id:e.id
        }
        n++;
        str += e.name+'(导演) / '
        return <Moive_detailedDirector {...data}/>
      })
      actorsL = data.casts.map((e,i) => {
        let images = null;
        if(e.avatars){
          images = e.avatars.medium;
        }else{
          return;
        }
        let data={
          key:i,
          images:images,
          name:e.name,
          id:e.id
        }
        n++;
        str += e.name+' / '
        return <Moive_detailedActors {...data}/>
      })
      str += data.year + ' / '
      data.countries.forEach((e,i)=>{
        str += '('+ e + ')';
      })
      str += '上映';
      let star = Number(data.rating.stars.substring(0,1));
      for(var j=0;j<5;j++){
        if(j<star){
          arr.push(<span className="ystar" key={j}></span>);
        }else{
          arr.push(<span className="hstar" key={j}></span>);
        }
      }
    }
    return (
      <div id="page" ref="node">
        <div id="moive_detailed">
          <h1 className="moive_detailedTitle">{data.title}</h1>
          <section className="clear">
            <div className="moive_detailedSynopsis">
              <p className="star clear moive_detailedStar">
                {arr}
                <b>{average}</b>
                <b>{data.ratings_count}人评价</b>
              </p>
              <p>{str}</p>
            </div>
            <img className="moive_detailedPoster" src={images}/>
          </section>
          <LoginJump {...this.props} Personal_movie={this.state.data}/>
          <section className="moive_detailedIntro">
            <h3 className="moive_detailedSectionTitle">{data.title}的剧情简介</h3>
            <p className={this.state.unfold?'moive_detailedIntroP moive_detailedIntroPH':'moive_detailedIntroP'}>{summary}<span className={this.state.unfold?'hidden':''}>...</span><span style={{color:'#42bd56'}} onClick={this.click} className={this.state.unfold?'hidden':''}>(展开)</span></p>
          </section>
          <section>
            <h3 className="moive_detailedSectionTitle">影人</h3>
            <div className="moive_detailedmaker">
              <ul className="moive_detailedmakerList clear" style={{width:(n*166)/45+'rem'}}>
                {directorL}
                {actorsL}
              </ul>
            </div>
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
      </div>
    )
  }
}
class LoginJump extends Component{
  want = () => {
    this.props.personal_movieWant(this.props.Personal_movie,this.props.data.userNow.id);
  }
  look = () => {
    this.props.personal_movieLook(this.props.Personal_movie,this.props.data.userNow.id);
  }
  render(){
    let strW = '想看';
    let strL = '看过';
    let strDe = null;
    let {data,Personal_movie} = this.props;
    let Personal_movieWantIdArr = [];
    let Personal_movieLookIdArr = [];
    if(data.userNow){
      data.userNow.Personal_movieWant.forEach((e,i)=>{
        Personal_movieWantIdArr.push(e.id);
        if(e.id === Personal_movie.id){
          strW='以保存至想看';
          strDe = <Moive_detailedWBottomDe text={'我想看这部电影'} {...this.props}/>;
        }
      })
      data.userNow.Personal_movieLook.forEach((e,i)=>{
        Personal_movieLookIdArr.push(e.id);
        if(e.id === Personal_movie.id){
          strL='以保存至看过';
          strDe = <Moive_detailedWBottomDe text={'这部电影我看过'} {...this.props}/>;
        }
      })
    }
    if(this.props.data.landfallBol){
      return (
        <div>
          <section className="moive_detailedW clear">
            <p onClick={this.want} className={Personal_movieWantIdArr.includes(Personal_movie.id)?'aaa':''}>{strW}</p>
            <p onClick={this.look} className={Personal_movieLookIdArr.includes(Personal_movie.id)?'aaa':''}>{strL}</p>
          </section>
          {strDe}
        </div>
      )
    }else{
      return (
        <section className="moive_detailedW clear">
          <Link to="/personal"><p>想看</p></Link>
          <Link to="/personal"><p>看过</p></Link>
        </section>
      )
    }
  }
}
class Moive_detailedWBottomDe extends Component{
  delete = () => {
    this.props.personal_movieDelete(this.props.Personal_movie);
  }
  render(){
    return (
      <p className="moive_detailedWBottom">{this.props.text}<span className="moive_detailedWBottomDe" onClick={this.delete}>(删除)</span></p>
    )
  }
}
export default Moive_detailed
//当前电影页面的数据
//当前登录的用户
//将当前的电影数据放到当前用户的想看或看过数组下
//用当前用户的数据去渲染两个组件
