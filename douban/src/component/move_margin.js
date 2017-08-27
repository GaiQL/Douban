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
    let that = this;
    let jump = null;
    console.log(1);
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
  // change = (jump) => {
  //   // let that = this;
  //   // $.ajax({
  //   //   url:'https://api.douban.com/v2/movie/celebrity/'+jump,
  //   //   data:{
  //   //     count:8
  //   //   },
  //   //   dataType:'jsonp',
  //   //   success:function(data){
  //   //     that.setState({
  //   //       data:data
  //   //     });
  //   //   }
  //   // })
  // }
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
    console.log(data)
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
      <div id="page">
        <div className="move_margin">
  				<h3 className="move_filmmakerTitle">{data.name} - {data.name_en}</h3>
  				<section className="move_filmmakerIntroduce clear">
  					<div className="move_filmmakerIntroduceLeft">
  						<p>3651人收藏</p>
  						<p>
  			        性别: {data.gender}
  							星座: 白羊座
  							出生日期: 1974-04-03
  							出生地: {data.born_place}
  							更多中文名:
  			      </p>
  						<p>更多资料</p>
  					</div>
  					<img src={images}/>
  				</section>
  				<section className="move_filmmakerCollect">收藏</section>
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
  						<dt><img src="img/DB.png"/></dt>
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
export default Move_margin
