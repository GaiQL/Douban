import React, {Component} from 'react';
import {Link,Route} from 'react-router-dom';
class Personal_movieCollectLi extends Component{
  render(){
    let {inner} = this.props
    console.log(inner)
    return (
      <Link to={
        {
          pathname:"/movie_list/"+inner.search,
          jump:inner.search,
          id:inner.id
        }
      }>
        <div className="movie_listParticularsL">
          <div className="movie_listParticularsTop clear">
            <div className="personal_movieCollectImg">
              <img src={inner.data.subjects[0].images.large}/>
              <img src={inner.data.subjects[1].images.large}/>
              <img src={inner.data.subjects[2].images.large}/>
              <img src={inner.data.subjects[3].images.large}/>
            </div>
            <div className="movie_listParticularsParagraph">
              <p>{inner.listName}</p>
              <p className="star clear movie_listStar">
              </p>
              <p style={{margin:0}}>{inner.loveNum}人收藏</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}
class Personal_movieCollect extends Component{
  render(){
    let {data} = this.props;
    let personal_movieCollectLi = null;
    personal_movieCollectLi = data.userNow.Personal_collect.map((e,i)=>{
      console.log(data.userNow.Personal_collect)
      let dataA = {
        key:i,
        inner:data.userNow.Personal_collect[i]
      }
      return <Personal_movieCollectLi {...dataA}/>
    })
    return (
      <div id="page">
        <section className="personal_movieTop clear">
          <div className="personal_movieTopActive personal_movieCollect">我的喜欢</div>
        </section>
        <div className="movie_listPad">
        <section className="movie_listParticulars">
          {personal_movieCollectLi}
        </section>
      </div>
    </div>
    )
  }
}
export default Personal_movieCollect;
