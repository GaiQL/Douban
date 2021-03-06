import React, {Component} from 'react';
import $ from 'jquery';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Moive_detailed from './moive_detailed';

class Move_filmmakerCooperationL extends Component{
  click = () => {
    // let jump = '';
    // jump = this.props.id;
    // this.props.change(jump)
    window.location.reload();
  }
  render(){
    let images = null
    if(this.props.images){
      images = this.props.images.medium
    }else{
      return null
    }
    return (
      <li className="move_filmmakerCooperationL">
          <Link to={
            {
              pathname:'/move_margin/'+this.props.id,
              jump:this.props.id
            }
          } onClick={this.click}>
            <img src={images}/>
            <p>{this.props.name}</p>
          </Link>
      </li>
    )
  }
}
class Move_filmmakerIndividual extends Component{
  render(){
    let {subject} = this.props
    return (
      <li>
        <Link to={{
          pathname:"/Moive_detailed/"+subject.id,
          state:subject.id
        }}>
          <img src={subject.images.medium} className="moive_showImg"/>
          <p className="moive_showText">{subject.title}</p>
          <p className="moive_star clear">
            <span className="ystar"></span>
            <span className="ystar"></span>
            <span className="ystar"></span>
            <span className="ystar"></span>
            <span className="hstar"></span>
            <b>7.5</b>
          </p>
        </Link>
      </li>
    )
  }
}
class Move_margin extends Component{
  constructor(){
    super();
    this.state = {
      data:[]
    }
  }
  componentDidMount(){
    this.refs.node.scrollIntoView();
    let that = this;
    let jump = null;
    if(this.props.location.jump){
      jump = this.props.location.jump;
    }else{
      jump = window.location.pathname.split('/')[2];
    }
    $.ajax({
      url:'https://api.douban.com/v2/movie/celebrity/'+jump,
      data:{
        count:8
      },
      dataType:'jsonp',
      success:function(data){
        that.setState({
          data:data
        });
      }
    })
  }
  render(){
    let {data} = this.state;
    // let {photos} = this.state;
    let images = null;
    let move_filmmakerIndividual = null;
    let move_filmmakerCooperationL = [];
    let moive_showL = null;
    let move_filmmakerCooperationLW = null;
    let n = 0;
    let arrId = [];
    arrId.push(data.id);
    if(data.avatars){
      images = data.avatars.medium;
      move_filmmakerIndividual = data.works.map((e,i)=>{
        let data={
          key:i,
          subject:e.subject
        }
        // e.subject.casts.forEach((e,i) => {
        for(var i=0;i<e.subject.casts.length;i++){
          if(arrId.includes(e.subject.casts[i].id)){
            continue;
          }
          n++;
          let data = {
            key:n,
            name:e.subject.casts[i].name,
            id:e.subject.casts[i].id,
            images:e.subject.casts[i].avatars,
            // change:this.change,
          }
          arrId.push(e.subject.casts[i].id);
          move_filmmakerCooperationL.push(<Move_filmmakerCooperationL {...data}/>)
        }
        // })
        return <Move_filmmakerIndividual {...data}/>
      })
      moive_showL = 216*data.works.length;
      move_filmmakerCooperationLW = 166*n;
    }
    return (
      <div id="page" ref="node">
        <div className="move_margin">
  				<h3 className="move_filmmakerTitle">{data.name} - {data.name_en}</h3>
  				<section className="move_filmmakerIntroduce clear">
  					<div className="move_filmmakerIntroduceLeft">
  						<p>
  			        性别: {data.gender}
  							星座: 白羊座
  							出生日期: 1974-04-03
  							出生地: {data.born_place}
  							更多中文名:
  			      </p>
  					</div>
  					<img src={images}/>
  				</section>
  				    <Movie_movieStar moviestar={this.state.data} {...this.props}/>
  				<section className="move_filmmakerIndividual">
  					<h4 className="move_filmmakerBTitle">个人作品</h4>
  					<div className="move_filmmakerWorks">
  						<ul className="moive_show clear" style={{width:moive_showL/45+'rem'}}>
  							{move_filmmakerIndividual}
  						</ul>
  					</div>
  				</section>
  				<section>
  					<h4 className="move_filmmakerBTitle">合作过的影人</h4>
  					<div className="move_filmmakerWorks">
  						<ul className="move_filmmakerCooperation" style={{width:move_filmmakerCooperationLW/45+'rem'}}>
                {move_filmmakerCooperationL}
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
class Movie_movieStar extends Component{
  constructor(){
    super();
    this.state = {
      onOff:false,
      str:'收藏'
    }
  }
  componentDidMount(){
    console.log(this.props.match.url.split('/')[2])
    let jump = null;
    let {data,moviestar} = this.props;
    if(this.props.match.url){
      jump = this.props.match.url.split('/')[2];
    }
    if(data.landfallBol){
      data.userNow.Personal_moviestar.forEach((e,i)=>{
        if(jump === e.id){
          this.setState({
            onOff:true,
            str:'已收藏'
          })
        }
      })
    }
  }
  moviestar = () => {
    this.setState({
      onOff:!this.state.onOff
    },()=>{
      this.props.personal_moviestar(this.props.moviestar,this.state.onOff);
    })
    if(this.state.onOff){
      this.setState({
        str:'收藏'
      })
    }else{
      this.setState({
        str:'已收藏'
      })
    }
  }
  render(){
    let {str} = this.state;
    if(this.props.data.landfallBol){
      return(
        <section className={this.state.onOff?'move_filmmakerCollect move_filmmakerCollectActive':'move_filmmakerCollect'} onClick={this.moviestar}>{str}</section>
      )
    }else{
      return (
        <Link to='/personal'><section className="move_filmmakerCollect">{str}</section></Link>
      )
    }
  }
}
export default Move_margin
