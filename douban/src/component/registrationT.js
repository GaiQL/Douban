import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom'
class BirthdayBoxLi extends Component{
  componentWillMount(){
    console.log(this.props)
  }
  render(){
    return (
      <li>{this.props.year}</li>
    )
  }
}
class RegistrationT extends Component{
  constructor(){
    super();
    this.state = {
      onOff:true,
    }
  }
  save = () => {
    if(!(/^\s{0,}\S{1,}$/.test(this.refs.inputname.value))){
      alert('昵称不能为空');
      return;
    }
    console.log(1);
    this.props.registrationFinishT(this.refs.inputname.value,this.refs.contentEditable.innerHTML,this.refs.sexShow.innerHTML);
  }
  sex = () => {
    this.refs.mask.style.display = 'block';
    this.refs.sexBox.style.display = 'block';
  }
  disappear = () => {
    this.refs.mask.style.display = 'none';
    this.refs.sexBox.style.display = 'none';
    this.refs.birthdayBox.style.display = 'none';
  }
  birthday = () => {
    this.refs.mask.style.display = 'block';
    this.refs.birthdayBox.style.display = 'block';
  }
  sexChange = (ev) => {
    this.refs.sexShow.innerHTML = ev.target.innerHTML;
    this.disappear();
  }
  move = (ev) => {
    var _x=ev.touches[0].pageX;
    var _y=ev.touches[0].pageY;

    var _tit = this.props.data.touchStart-_y;
    var liH = this.props.data.liH;
    var ulT = this.refs.birthdayBoxListOutSec.offsetTop;
    // console.log(ulT,liH,_tit)
    if(_tit >= liH){
      // console.log(parseInt(Math.abs(_tit)),ulT)只执行一次
        if(this.state.onOff){
          this.setState({
              onOff:false,
            },()=>{
              this.props.touchStart(_y,-(liH),liH);
              this.props.yearIncrease();
              console.log(1);
            })
      }
    }
    let touchNowSty = this.props.data.touchNowSty
    this.refs.birthdayBoxListOutSec.style.top = this.props.data.touchNowSty - _tit + 'px';
ulT = this.refs.birthdayBoxListOutSec.offsetTop;
  console.log(ulT,liH,_tit)
    if(Math.abs(touchNowSty)===180){
      this.setState({
        onOff:true,
      })
    }
  }
  start = (ev) => {
    var _y=ev.touches[0].pageY;
    var nowSty = parseInt(getComputedStyle(this.refs.birthdayBoxListOutSec).top)
    var liH = parseInt(getComputedStyle(this.refs.birthdayBoxListOutSec).height)/5
    this.props.touchStart(_y,nowSty,liH);
  }
  componentDidMount(){
    let {data} = this.props
    let {inputname,contentEditable,sexShow} = this.refs;
    if(data.landfallBol){
      inputname.value = data.userNow.userName;
      contentEditable.innerHTML = data.userNow.profile;
      sexShow.innerHTML = data.userNow.sex;
    }
  }
  imgChange = () => {
    let {headImage,file} = this.refs;
    var oFReader = new FileReader();
    let _that = this;
    var fileSe = file.files[0];
        oFReader.readAsDataURL(fileSe);
        oFReader.onloadend = function(oFRevent){
            var src = oFRevent.target.result;
            _that.props.headImageChange(src);
            headImage.src = src;
        }
  }
  render(){
    let {birthdayYear} = this.props.data
    let birthdayBoxLi = birthdayYear.map((e,i)=>{
      let data = {
        year:e,
        key:i,
      }
      return  <BirthdayBoxLi {...data}/>
    });
    let save = null;
    let headImage = null;
    console.log(this.props.data)
    if(this.props.data.landfallBol){
      save = <Link to="/personal"><p onClick={this.save}>保存</p></Link>
      headImage = this.props.data.userNow.headImage
    }else{
      save = <p onClick={this.save}>保存</p>
      headImage = require("./img/heh.png")
    }
    return (
      <div>
        <header className="registrationT">
          <span>个人资料</span>
          {save}
        </header>
        <ul className="registrationT_bookList">
          <li className="registrationT_bookFirst registrationT_bookPadding">
              <input id="input-file" type="file" onChange={this.imgChange} ref='file'/>
              <p>头像</p>
              <p className="enter"></p>
              <img src={headImage} ref='headImage'/>
          </li>
          <li className="registrationT_bookFirstOne registrationT_bookPadding">
            <p>昵称</p>
            <input type="text" ref="inputname"/>
          </li>
          <li className="registrationT_bookFirstOne registrationT_bookPadding clear heightAuot">
            <p>标签</p>
            <div contentEditable="true" className="textarea" ref="contentEditable"></div>
          </li>
          <li className="registrationT_bookFirstOne registrationT_bookPadding" onClick={this.sex}>
            <p>性别</p>
            <div className="registrationT_bookSex" ref="sexShow"></div>
            <p className="enter"></p>
          </li>
        </ul>
        <div className="mask" style={{width:window.innerWidth,height:window.innerHeight}} ref="mask" onClick={this.disappear}></div>
        <ul className="sexBox" ref="sexBox">
          <li onClick={this.sexChange}>男</li>
          <li onClick={this.sexChange}>女</li>
          <li onClick={this.sexChange}>保密</li>
        </ul>
        <div className="birthdayBox" ref="birthdayBox">
          <p className="birthdayBox_top">选择生日</p>
          <div className="clear" className="birthdayBox_changeday">
            <div className="birthdayBoxListOut" onTouchMove={this.move} onTouchStart={this.start} onTouchEnd={this.end}>
              <ul className="birthdayBoxList" ref="birthdayBoxListOutSec">
                {birthdayBoxLi}
              </ul>
            </div>
            <div className="birthdayBoxListOut">
              <ul className="birthdayBoxList">
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
              </ul>
            </div>
            <div className="birthdayBoxListOut">
              <ul className="birthdayBoxList">
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>16</li>
              </ul>
            </div>
            <div className="birthdayBox_blueH"></div>
            <div className="birthdayBox_blueH"></div>
            <div className="birthdayBox_blueH"></div>
            <div className="birthdayBox_blueH"></div>
            <div className="birthdayBox_blueH"></div>
            <div className="birthdayBox_blueH"></div>
          </div>
          <div className="birthdayBox_chioce clear">
            <p>确定</p>
            <p onClick={this.disappear}>取消</p>
          </div>
        </div>
      </div>
    )
  }
}
// <li className="registrationT_bookFirstOne registrationT_bookPadding">
//   <p>城市</p>
//   <input type="text"/>
//   <p className="enter"></p>
// </li>
// <li className="registrationT_bookFirstOne registrationT_bookPadding" onClick={this.birthday}>
//   <p>生日</p>
//   <div className="registrationT_bookSex">未设置</div>
//   <p className="enter"></p>
// </li>
export default RegistrationT
