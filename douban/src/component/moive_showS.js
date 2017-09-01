import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
class star extends Component{
  render(){
    return(
      <p className="moive_star clear">
        <span className="ystar" key="1"></span>
        <span className="ystar" key="2"></span>
        <span className="ystar" key="3"></span>
        <span className="ystar" key="4"></span>
        <span className="hstar" key="5"></span>
        <b>{this.props.scoring}</b>
      </p>
    )
  }
}
class Moive_showS extends Component{
  constructor(){
    super();
    this.state = {
      data:[]
    }
  }
  componentDidMount(){
    let that = this;
    $.ajax({
      url:'https://api.douban.com/v2/movie/coming_soon',
      data:{
        count:8
      },
      dataType:'jsonp',
      success:function(data){
        that.setState({
          data
        });
      }
    })
  }
  render(){
    let {data} = this.state;
    let dataS = null;
    if(data.subjects){
      dataS = Object.assign(data.subjects);
      dataS = dataS.map((e,i)=>{
        let arr = [];
        let str = '';
        let star = Number(e.rating.stars.substring(0,1))
        if(star){
          for(var j=0;j<5;j++){
            if(j<star){
              arr.push(<span className="ystar" key={j}></span>);
            }else{
              arr.push(<span className="hstar" key={j}></span>);
            }
          }
        }else{
          arr.push(<i key={i} className="moive_showTextBottom">暂无评分</i>)
        }
        if(e.rating.average == '0'){
          str = '';
        }else{
          str = e.rating.average;
        }
        return   <li key={i}>
            <Link to={
              {
                pathname:"/Moive_detailed/"+e.id,
                state:e.id
              }
            }>
            <img src={e.images.large} className="moive_showImg" />
            <p className="moive_showText">{e.original_title}</p>
            <p className={(arr.length>1)?'moive_star clear':''}>
              {arr}
              <b>{str}</b>
            </p>
            </Link>
          </li>
      });

    }
    return(
      <section className="moive_model">
        <header className="moive_head clear">
          <h3>即将上映</h3>
          <Link to={
            {
              pathname:"/Moviecon/coming_soon",
              state:'即将上映',
              jump:'coming_soon'
            }
          }><p>更多</p></Link>
        </header>
        <div className="moive_showOut">
          <ul className="moive_show clear">
            {dataS}
          </ul>
        </div>
      </section>
      )
  }
}
export default Moive_showS;
