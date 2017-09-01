import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
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
class Movie_list extends Component{
  constructor(){
    super();
    this.state = {
      onOff:false,
      num:1
    }
  }
  componentDidMount(){
    let that = this;
    let jump = null;
    let id = 0;
    if(this.props.location.jump){
      jump = this.props.location.jump;
    }else{
      jump = window.location.pathname.split('/')[2];
    }
    if(decodeURI(jump) == 'top250'){
      id = 0;
    }else if(decodeURI(jump) == '不正常'){
      id = 1;
    }else if(decodeURI(jump) == '悬疑惊悚'){
      id = 2;
    }
    $.ajax({
      url:'https://api.douban.com/v2/movie/search?q='+decodeURI(jump),
      data:{
        count:10,
      },
      dataType:'jsonp',
      success:function(data){
        that.props.movielist(data,id);
      }
    })
  }
  unfurled = () => {
    this.setState({
      onOff:true
    })
  }
  // next = () => {
  //   console.log(this.state.num)
  //   let that = this;
  //   let jump = null;
  //   let id = 0;
  //   if(this.props.location.jump){
  //     jump = this.props.location.jump;
  //   }else{
  //     jump = window.location.pathname.split('/')[2];
  //   }
  //   if(decodeURI(jump) == 'top250'){
  //     id = 0;
  //   }else if(decodeURI(jump) == '不正常'){
  //     id = 1;
  //   }else if(decodeURI(jump) == '悬疑惊悚'){
  //     id = 2;
  //   }
  //   $.ajax({
  //     url:'https://api.douban.com/v2/movie/search?tag='+decodeURI(jump),
  //     data:{
  //       count:10,
  //       start:that.state.num*10
  //     },
  //     dataType:'jsonp',
  //     success:function(data){
  //       that.props.movielist(data,id);
  //     }
  //   })
  //   this.setState({
  //     num:++this.state.num
  //   })
  //
  // }
  render(){
    console.log(this.state.num)
    let id = 1;
    let jump = null;
    if(this.props.location.jump){
      jump = this.props.location.jump;
    }else{
      jump = window.location.pathname.split('/')[2];
    }
    if(decodeURI(jump) == 'top250'){
      id = 0;
    }else if(decodeURI(jump) == '不正常'){
      id = 1;
    }else if(decodeURI(jump) == '悬疑惊悚'){
      id = 2;
    }
    let {movie_list} = this.props.data;
    let movielist = null;
    if(movie_list[id].data){
      movielist = movie_list[id].data.subjects.map((e,i)=>{
        let data = {
          inner:e,
          key:i,
        }
        return  <Movie_listParticularsL {...data}/>
      });
      movie_list = movie_list[id]
    }
    let listProfile = '';
    if(this.state.onOff){
      listProfile = movie_list.listProfileAll;
    }else{
      listProfile = movie_list.listProfileShort;
    }
    console.log(this.state.num);
    return (
      <div id="page">
      <div className="movie_listPad">
        <section className="movie_listTOP">
          <p>{movie_list.listName}</p>
          <p>{movie_list.listAuthor}</p>
          <p>{listProfile}<br></br><span style={{color:"#42BD56"}} onClick={this.unfurled} className={this.state.onOff?'hidden':''}>(展开)</span></p>
        </section>
        <section className="movie_listLove"><span>{movie_list.loveNum}</span></section>
        <section className="movie_listParticulars">
          {movielist}
        </section>
        <section className="movie_listPage">
          <p>· {this.state.num} ·</p>
          <div className="movie_listPageUD clear">
            <div className="movie_listPageUDC">上页</div>
            <Link to={
              {
                pathname:"/movie_list/"+this.props.search,
                jump:this.props.search,
                id:this.props.id
              }
            }><div>下页</div></Link>
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
export default Movie_list;
