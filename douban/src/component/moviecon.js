import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
class Moviecon extends Component{
  constructor(){
    super();
    this.state = {
      data:[],
      onOff:true,
      num:1
    }
  }
  componentDidMount(){
    let that = this;
    let jump = null;
    if(this.props.location.jump){
      jump = this.props.location.jump;
    }else{
      jump = window.location.pathname.split('/')[2];
    }
    $.ajax({
      url:'https://api.douban.com/v2/movie/'+jump,
      data:{
        count:18,
        // start:30
      },
      dataType:'jsonp',
      success:function(data){
        that.setState({
          data:data
        });
      }
    })
    // var num = 1;
    // var onOff = true;
      // document.addEventListener('touchmove',function(){
      //     console.log(1);
      // });
      $('#page').scroll(function(){
        // var index = $('li').eq(minHeight());
        // if(index.height() <= $(window).innerHeight() + $(window).scrollTop()){
        //   if(onOff){
        //     num++;
        //     xr();
        //   }
        // };
        console.log(1);
      })
  }
  touch = (ev) => {
    if(Math.abs(this.refs.page.getBoundingClientRect().top)+window.innerHeight >= this.refs.moviecon.clientHeight){
      if(this.state.onOff){
        this.setState({
          onOff:false
        })
        let that = this;
        let jump = window.location.pathname.split('/')[2];
        this.state.num++;
        $.ajax({
          url:'https://api.douban.com/v2/movie/'+jump,
          data:{
            count:18*this.state.num,
            // start:30
          },
          dataType:'jsonp',
          success:function(data){
            console.log(data);
            that.setState({
              data:data,
              onOff:true
            });
          }
        })
      }
    }
  }
  render(){
    let {data} = this.state;
    let dataS = null;
    let movie_propaganda = null;

    if(data.subjects){
      dataS = Object.assign(data.subjects);
      movie_propaganda = dataS.map((e,i)=>{
        let data = {
          key:i,
          images:e.images.medium,
          name:e.title,
          stars:e.rating.stars,
          average:e.rating.average,
          id:e.id
        }
        return <Movie_propaganda {...data}/>
      })
    }
    return (
      <div id="page" ref="page">
          <div id="moviecon" onTouchMove={this.touch} ref="moviecon">
  					<h3>{this.props.location.state}</h3>
  					<div className="clear">
  							{movie_propaganda}
  					</div>
  			</div>
      </div>
    )
  }
}
class Movie_propaganda extends Component{
  render(){
    return (
      <Link to={{pathname:"/Moive_detailed/"+this.props.id,state:this.props.id}}>
        <dl className="movie_propaganda">
          <dt><img src={this.props.images}/></dt>
          <dd>
            <p>{this.props.name}</p>
            <p className="star clear">
              <span className="ystar"></span>
              <span className="ystar"></span>
              <span className="ystar"></span>
              <span className="ystar"></span>
              <span className="hstar"></span>
              <b>{this.props.average}</b>
            </p>
          </dd>
        </dl>
      </Link>
    )
  }
}
export default Moviecon
