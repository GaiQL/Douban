import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom'
import {Personal_movieWLlist} from './personal_movie'
class Search extends Component{
  constructor(){
    super();
    this.state = {
      data:[],
    }
  }
  change = () => {
    let that = this;
    $.ajax({
      url:'https://api.douban.com/v2/movie/search?q='+this.refs.change.value,
      dataType:'jsonp',
      success:function(data){
        console.log(data)
        that.setState({
          data
        });
      }
    })
  }
  render(){
    console.log(this.state.data)
    let movielist = null;
    if(this.state.data.subjects){
      movielist = this.state.data.subjects.map((e,i)=>{
        let data = {
          inner:e,
          key:i,
        }
        return  <Personal_movieWLlist {...data}/>
      })
    }
    return (
      <div>
        <div className="search_top clear">
          <Link to="/"><div className="search_close">关闭</div></Link>
          <input type="text" className="search_input" placeholder="请输入您想要搜索的电影" onChange={this.change} ref="change"/>
        </div>
        <div>
          {movielist}
        </div>
      </div>
    )
  }
}
export default Search;
