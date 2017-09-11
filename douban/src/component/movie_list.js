import React, {Component} from 'react';
import $ from 'jquery';
import {Link,Route} from 'react-router-dom';
class Movie_listParticularsL extends Component{
  render(){
    let {inner} = this.props;
    let genres = '';
    let average = '';
    inner.genres.forEach((e,i)=>{
      genres += e +' ';
    })
    let arr = [];
    let star = Number(inner.rating.stars.substring(0,1))
      for(var j=0;j<5;j++){
        if(j<star){
          arr.push(<span className="ystar" key={j}></span>);
        }else{
          arr.push(<span className="hstar" key={j}></span>);
        }
      }
    if(inner.rating.average == '0'){
      average = '暂无评分';
    }else{
      average = inner.rating.average;
    }
    return (
      <Link to={
        {
          pathname:"/Moive_detailed/"+inner.id,
          state:inner.id
        }
      }>
      <div className="movie_listParticularsL">
        <div className="movie_listParticularsTop clear">
          <img src={inner.images.large}/>
          <div className="movie_listParticularsParagraph">
            <p>{inner.title}</p>
            <p className="star clear movie_listStar">
              {arr}
              <b>{average}</b>
            </p>
            <p>刘鹏博/盖奇龙/张特/黄文静/徐畅/张益豪/管金亮</p>
          </div>
        </div>
        <p className="movie_listParticularsBottom">类型：{genres}</p>
      </div>
      </Link>
    )
  }
}
// class Movie_list extends Component{
//   render(){
//     return (
//       <div>
//         <Movie_listIn {...this.props}/>
//         <Route path='/movie_list/美国/2' component={Movie_list}/>
//       </div>
//     )
//   }
// }
class Movie_list extends Component{
  constructor(){
    super();
    this.state = {
      onOff:false,
      num:1
    }
  }
  componentWillUnmount(){
    this.props.unmount();
  }
  componentDidMount(){
    this.refs.node.scrollIntoView();
    let that = this;
    let jump = null;
    let id = decodeURI(window.location.pathname.split('/')[2]);
    let num = Number(window.location.pathname.split('/')[3]);
    if(num){
      this.setState({
        num:num
      },()=>{
        $.ajax({
          url:'https://api.douban.com/v2/movie/search?tag='+decodeURI(jump),
          data:{
            count:10,
            start:(that.state.num-1)*10
          },
          dataType:'jsonp',
          success:function(data){
            console.log(2);
            console.log(that.state.num,data)
            that.props.movielist(data,id);
          }
        })
      })
    }else{
      this.setState({
        num:1
      },()=>{
        $.ajax({
          url:'https://api.douban.com/v2/movie/search?tag='+decodeURI(jump),
          data:{
            count:10,
            start:(that.state.num-1)*10
          },
          dataType:'jsonp',
          success:function(data){
            console.log(that.state.num,data)
            that.props.movielist(data,id);
          }
        })
      })
    }
    if(this.props.location.jump){
      jump = this.props.location.jump;
    }else{
      jump = window.location.pathname.split('/')[2];
    }

  }
  unfurled = () => {
    this.setState({
      onOff:true
    })
  }
  prev = () => {
    console.log(this.state.num)
    this.props.unmount();
    this.refs.node.scrollIntoView();
    console.log(this.state.num)
      let jump = null;
      if(this.props.location.jump){
        jump = this.props.location.jump;
      }else{
        jump = window.location.pathname.split('/')[2];
      }
      let id = decodeURI(window.location.pathname.split('/')[2]);
      let that = this;
      this.setState({
        num:--this.state.num
      })
      $.ajax({
        url:'https://api.douban.com/v2/movie/search?tag='+decodeURI(jump),
        data:{
          count:10,
          start:(this.state.num-1)*10
        },
        dataType:'jsonp',
        success:function(data){
          that.props.movielist(data,id);
        }
      })
  }
  next = () => {
  this.props.unmount();
  this.refs.node.scrollIntoView();
    let jump = null;
    if(this.props.location.jump){
      jump = this.props.location.jump;
    }else{
      jump = window.location.pathname.split('/')[2];
    }
    let id = decodeURI(window.location.pathname.split('/')[2]);
    let that = this;
    this.setState({
      num:++this.state.num
    })
    $.ajax({
      url:'https://api.douban.com/v2/movie/search?tag='+decodeURI(jump),
      data:{
        count:10,
        start:(this.state.num-1)*10
      },
      dataType:'jsonp',
      success:function(data){
        that.props.movielist(data,id);
      }
    })
  }
  render(){
    let {movie_listNow} = this.props.data;
    let movielist = null;
    if(movie_listNow.data){
      movielist = movie_listNow.data.subjects.map((e,i)=>{
        let data = {
          inner:e,
          key:i,
        }
        return  <Movie_listParticularsL {...data}/>
      });
    }
    let listProfile = '';
    let prevbtn = null;
    if(this.state.onOff){
      listProfile = movie_listNow.listProfileAll;
    }else{
      listProfile = movie_listNow.listProfileShort;
    }
    if(!(this.state.num <= 1)){
      prevbtn = <Link to={this.props.match.url+'/'+(this.state.num-1)} onClick={this.prev}><div>上页</div></Link>
    }else{
      prevbtn = <div className="movie_listPageUDC">上页</div>
    }
    return (
      <div id="page" ref="node">
      <div className="movie_listPad">
        <section className="movie_listTOP">
          <p>{movie_listNow.listName}</p>
          <p>{movie_listNow.listAuthor}</p>
          <p>{listProfile}<br></br><span style={{color:"#42BD56"}} onClick={this.unfurled} className={this.state.onOff?'hidden':''}>(展开)</span></p>
        </section>
        <Movie_listLove {...this.props}/>
        <section className="movie_listParticulars">
          {movielist}
        </section>
        <section className="movie_listPage">
          <p>· {this.state.num} ·</p>
          <div className="movie_listPageUD clear">
            {prevbtn}
            <Link to={this.props.match.url+'/'+(this.state.num+1)} onClick={this.next}><div>下页</div></Link>
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
class Movie_listLove extends Component{
  constructor(){
    super();
    this.state={
      onOff:false
    }
  }
  collect = () => {
    let id = 1;
    let {movie_listNow} = this.props.data;
    console.log(movie_listNow)
    let jump = window.location.pathname.split('/')[2];
    this.setState({
      onOff:!this.state.onOff
    },()=>{
      this.props.personal_collect(movie_listNow,this.state.onOff);
    })
  }
  componentDidMount(){
    let jump = null;
    if(this.props.location.jump){
      jump = this.props.location.jump;
    }else{
      jump = window.location.pathname.split('/')[2];
    }
    let {data} = this.props;
    let {movie_listNow} = this.props.data
    console.log(jump)
    if(data.landfallBol){
      data.userNow.Personal_collect.forEach((e,i)=>{

        if(jump === e.search){
          this.setState({
            onOff:true
          },()=>{
            console.log(this.state.onOff)
          })
        }
      })
    }
  }
  render(){
    let {movie_listNow} = this.props.data
    console.log(movie_listNow)
    if(this.props.data.landfallBol){
      return (
        <section className="movie_listLove"><span onClick={this.collect} className={this.state.onOff?'movie_listRedLove':''}>{this.props.data.movie_listNow.loveNum}</span></section>
      )
    }else{
      return (
        <section className="movie_listLove"><Link to='/personal'><span>{this.props.data.movie_listNow.loveNum}</span></Link></section>
      )
    }
  }
}
export default Movie_list;
