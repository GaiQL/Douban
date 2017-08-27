import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Personal extends Component{
  change = () => {
    this.props.landfallBol()
  }
  render(){
    return (
      <div id="page">
        <div className="personal_bg">
          <section className="personal_top clear">
            <img src="https://img1.doubanio.com/icon/user_normal.jpg"/>
            <div className="personal_message">
              <div className="clear personal_messageT">
                <p className="personal_name">
                  <span>{this.props.data.userNow.userName}</span>
                  <span>ID:{this.props.data.userNow.id}</span>
                </p>
                <Link to="/" onClick={this.change}><p className="personal_page">退出登录 ></p></Link>
              </div>
              <p className="personal_messageB"><span>关注 0</span><span>被关注 0</span></p>
            </div>
          </section>
          <ul className="personal_bottom clear">
              <li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/091d828e06cc8fa88ad7be161becfea88e14cf1c/pics/card/favourite.png"/>
                <span>喜欢</span>
              </li>
              <li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/15be66dc7121d728f11cbf4e3ac674a0a68331ca/pics/card/diary.png"/>
                <span>日记</span>
              </li>
              <li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/1a4604b83e0d7e091c610fe662c9a50518188193/pics/card/album.png"/>
                <span>相册</span>
              </li>
              <li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/a827877341968d09f309b70646f409d9fe39a2f9/pics/card/broadcast.png"/>
                <span>我的广播</span>
              </li>
              <li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/7d8c1ccedee37780b29e790e311da66ac863cd7b/pics/card/movie.png"/>
                <span>电影</span>
              </li>
              <li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/d0ffbee4f5ce5b59594dc53fad59c93cb3e8f646/pics/card/read.png"/>
                <span>读书</span>
              </li>
              <li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/d91d24876aaf5a441a4677a893a8d86068fbf5b1/pics/card/music.png"/>
                <span>音乐</span>
              </li>
              <li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/aaa90ee88850f7665f858011bd5ea3219fca0647/pics/card/dou list.png"/>
                <span>我的豆列</span>
              </li>
              <li className="personal_bottomL">
                <img src="https://img3.doubanio.com/f/talion/175762b338bf0d1b64ca2f33f18469d3db1160ba/pics/card/activity.png"/>
                <span>同城活动</span>
              </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Personal
