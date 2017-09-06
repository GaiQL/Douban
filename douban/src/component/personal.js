import React, {Component} from 'react';
import {Link,Route} from 'react-router-dom';
class Personal extends Component{
  change = () => {
    this.props.landfallBol()
  }
  render(){
    return (
      <div id="page">
        <div className="personal_bg">
          <section className="personal_top clear">
            <img src={this.props.data.userNow.headImage}/>
            <div className="personal_message">
              <div className="clear personal_messageT">
                <p className="personal_name">
                  <span>{this.props.data.userNow.userName}</span>
                  <span>ID:{this.props.data.userNow.id}</span>
                </p>
                <Link to="/" onClick={this.change}><p className="personal_page">退出登录 ></p></Link>
              </div>
              <p className="personal_messageB"><span> 性别 : {this.props.data.userNow.sex}</span></p>
            </div>
          </section>
          <ul className="personal_bottom clear">
              <Link to='/personal/collect'><li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/091d828e06cc8fa88ad7be161becfea88e14cf1c/pics/card/favourite.png"/>
                <span>喜欢</span>
              </li></Link>
              <Link to='/personal/moviestar'><li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/15be66dc7121d728f11cbf4e3ac674a0a68331ca/pics/card/diary.png"/>
                <span>影人收藏</span>
              </li></Link>
              <Link to='/personal/movie'><li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/7d8c1ccedee37780b29e790e311da66ac863cd7b/pics/card/movie.png"/>
                <span>电影</span>
              </li></Link>
              <Link to='/personal/edit'><li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/aaa90ee88850f7665f858011bd5ea3219fca0647/pics/card/dou list.png"/>
                <span>编辑资料</span>
              </li></Link>
          </ul>
          <div className="registrationT_bookFirstOne registrationT_bookPadding clear heightAuot">
            <p>标签</p>
            <div className="textarea" ref="contentEditable">{this.props.data.userNow.profile}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Personal;
