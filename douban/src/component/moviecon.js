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
    let urlLs = '';
    let dataLs = '';
    if(this.props.location.jump){
      jump = this.props.location.jump;
    }else{
      jump = window.location.pathname.split('/')[2];
    }
    // function tohanzi(data)
    // {
    //     if(data == '') return '请输入十六进制unicode';
    //     data = data.split('\u');
    //     var str ='';
    //     for(var i=0;i<data.length;i++)
    //     {
    //         str+=String.fromCharCode(parseInt(data[i],16).toString(10));
    //     }
    //     return str;
    // }
    // console.log(decodeURI(jump))
    // console.log(/[\u4e00-\u9fa5]+/.test(decodeURI(jump)))

    if(/[\u4e00-\u9fa5]+/.test(decodeURI(jump))){
      urlLs = 'https://api.douban.com/v2/movie/search?q='+decodeURI(jump);
    }else{
      urlLs = 'https://api.douban.com/v2/movie/'+jump;
    }
    $.ajax({
      url:urlLs,
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
        let urlLs = '';
        let that = this;
        let jump = window.location.pathname.split('/')[2];
        if(/[\u4e00-\u9fa5]+/.test(decodeURI(jump))){
          urlLs = 'https://api.douban.com/v2/movie/search?q='+decodeURI(jump);
        }else{
          urlLs = 'https://api.douban.com/v2/movie/'+jump;
        }
        this.state.num++;
        $.ajax({
          url:urlLs,
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
          images:e.images.large,
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
          <div id="moviecon" onTouchMove={this.touch} ref="moviecon" onWheel={this.touch}>
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
    let arr = [];
    let str = '';
    let star = Number(this.props.stars.substring(0,1));
    if(star){
      for(var j=0;j<5;j++){
        if(j<star){
          arr.push(<span className="ystar" key={j}></span>);
        }else{
          arr.push(<span className="hstar" key={j}></span>);
        }
      }
    }else{
      arr.push(<i key={0} className="moive_showTextBottom" style={{display:'inline'}}>暂无评分</i>)
    }
    if(this.props.average == '0'){
      str = '';
    }else{
      str = this.props.average;
    }
    return (
      <Link to={{pathname:"/Moive_detailed/"+this.props.id,state:this.props.id}}>
        <dl className="movie_propaganda">
          <dt><img src={this.props.images}/></dt>
          <dd>
            <p>{this.props.name}</p>
            <p className="star clear">
              {arr};
              <b>{str}</b>
            </p>
          </dd>
        </dl>
      </Link>
    )
  }
}
export default Moviecon
