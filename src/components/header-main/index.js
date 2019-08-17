import React,{Component} from 'react';
import {Button,Modal,message} from 'antd';
import {withRouter} from 'react-router-dom';
import './index.less';
import {removeItem} from '../../utils/storage';
import data from '../../utils/store';
import {menuList} from '../../config';
import dayjs from 'dayjs';
import {reqWheather} from '../../api'
const { confirm } = Modal;
 class HeaderMain extends Component{
   getTime = () =>{
     return dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
   };
   state = {
     title: '',
     time: this.getTime(),
     weather: '晴天',
     dayPictureUrl:'http://api.map.baidu.com/images/weather/day/qing.png'
   };
  handCheckOut = () =>{
    confirm({
      title: '您确定要退出登录吗?',
      okText:'确定',
      cancelText:'取消',
      onOk:() => {
        removeItem();
        data.user = {};
        this.props.history.replace('/login')
      },
    });
  };
  static getDerivedStateFromProps(nextProps,nextState){
    const {pathname} = nextProps.location;
    if (pathname === '/'){
      return {
        title:'首页'
      }
    }
    for (let i = 0; i <menuList.length ; i++) {
      const menu = menuList[i];
      if (menu.children){
        const children = menu.children;
        for (let j = 0; j <children.length ; j++) {
          const cmenu = children[j]
          if ( cmenu.key===pathname ){
            return {
              title:cmenu.title
            }
          }
        }
      } else{
        if (menu.key === pathname){
          return {
            title:menu.title
          }
        }
      }
    }
  };
  componentDidMount() {
    this.timer = setInterval(() =>{
      this.setState({
        time:this.getTime(),
      })
    });
    reqWheather('深圳')
      .then((res) =>{
        message.success('天气更新成功啦',2);
        this.setState(res)
      })
      .catch((err) =>{
        message.error('err',2)
      })
  }
   render() {
    const {title,time,dayPictureUrl,weather}  = this.state;
    return (
      <div className='header-main'>
        <div className='head-top'>
          <span>欢迎 {data.user.username}</span>
          <Button type='link' onClick={this.handCheckOut}>退出</Button>
        </div>
        <div className='head-bottom'>
            <h3>{title}</h3>
            <div>
              <span>{time}</span>
              <img src={dayPictureUrl} alt=""/>
              <span>{weather}</span>
            </div>
        </div>
      </div>
    );
  }
}
export default withRouter(HeaderMain)