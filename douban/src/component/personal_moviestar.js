import React, {Component} from 'react';
import {Link,Route} from 'react-router-dom';
class Personal_moviestar extends Component{
  render(){
    let {data} = this.props;
    let personal_moviestar = null;
    personal_moviestar = data.userNow.Personal_moviestar.map((e,i)=>{
      let data = {
        key:i,
        inner:e,
      }
      return <Personal_moviestarLi {...data}{...this.props}/>
    })
    return (
      <div id="page">
        <section className="personal_movieTop clear">
          <div className="personal_movieTopActive personal_movieCollect">影人收藏</div>
        </section>
        <section className="movie_listParticulars">
          {personal_moviestar}
        </section>
      </div>
    )
  }
}
class Personal_moviestarLi extends Component{
  render(){
    let {inner} = this.props;
    let str = '';
    inner.works.forEach((e,i)=>{
      str += e.subject.title + ' / ';
    })
    return (
      <Link to={
        {
          pathname:'/move_margin/'+inner.id,
          jump:inner.id
        }
      }>
        <div className="movie_listParticularsListPad">
          <div className="movie_listParticularsTop clear">
            <img src={inner.avatars.large}/>
            <div className="movie_listParticularsParagraph">
              <p>{inner.name}</p>
              <p className="star clear movie_listStar">
              </p>
              <p style={{margin:0,fontSize:(25/45)+'rem'}}>代表作：{str}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}
export default Personal_moviestar;
