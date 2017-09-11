import React, {Component} from 'react';
import {Link,Route} from 'react-router-dom';
class Personal_movie extends Component{
  constructor(){
    super();
    this.state = {
      acquiescence:null,
      onOff:false
    }
  }
  cancel = () => {
    this.setState({
      acquiescence:null,
    })
  }
  Ctrue = () => {
    this.setState({
      onOff:true
    })
  }
  Cfalse = () => {
    this.setState({
      onOff:false
    })
  }
  componentDidMount(){
    this.setState({
      acquiescence:<Personal_movieWant {...this.props}/>,
    })
  }
  render(){
    console.log(this.props.data.userNow)
    return (
      <div id="page">
        <section className="personal_movieTop clear">
          <Link to="/personal/movie/want"><div className={this.state.onOff?'':"personal_movieTopActive"}>想看</div></Link>
          <Link to="/personal/movie/look"><div className={this.state.onOff?"personal_movieTopActive":''}>看过</div></Link>
        </section>
        <div className="movie_listPad">
        {this.state.acquiescence}
        <Route path="/personal/movie/want" render={()=>{
          return <Personal_movieWant {...this.props} cancel={this.cancel} Cfalse={this.Cfalse}/>
        }}></Route>
        <Route path="/personal/movie/look" render={()=>{
          return <Personal_movieLook {...this.props} cancel={this.cancel} Ctrue={this.Ctrue}/>
        }}></Route>
      </div>
    </div>
    )
  }
}
class Personal_movieWLlist extends Component{
  render(){
    let {inner} = this.props;
    let arr = [];
    let average = '';
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
      <section className="movie_listParticulars">
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
        </div>
      </section>
      </Link>
    )
  }
}
class Personal_movieWant extends Component{
  componentDidMount(){
    if(this.props.cancel){
      this.props.cancel();
      this.props.Cfalse();
    }
  }
  render(){
    let movielist = null;
    if(this.props.data){
      movielist = this.props.data.userNow.Personal_movieWant.map((e,i)=>{
        let data = {
          inner:e,
          key:i,
        }
        return  <Personal_movieWLlist {...data}/>
      })
    }
    return (
      <div>
        {movielist}
      </div>
    )
  }
}
class Personal_movieLook extends Component{
  componentDidMount(){
    if(this.props.cancel){
      this.props.cancel();
      this.props.Ctrue();
    }
  }
  render(){
    let movielist = null;
    if(this.props.data){
      movielist = this.props.data.userNow.Personal_movieLook.map((e,i)=>{
        let data = {
          inner:e,
          key:i,
        }
        return  <Personal_movieWLlist {...data}/>
      })
    }
    return (
      <div>
        {movielist}
      </div>
    )
  }
}
export {Personal_movie};
export {Personal_movieWLlist};
