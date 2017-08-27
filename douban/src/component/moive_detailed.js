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
    console.log(data)
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
      <div id="page">
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
          <section className="moive_detailedW clear">
            <p>想看</p>
            <p>看过</p>
          </section>
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
        </div>
      </div>
    )
  }
}
export default Moive_detailed
