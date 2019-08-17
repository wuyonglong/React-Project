import {Icon,Menu} from "antd";
import {Link,withRouter} from "react-router-dom";
import React from "react";
import {menuList} from '../../config'


const { SubMenu } = Menu;
 class NavLeft extends React.Component{

   constructor(props){
     super(props);
     this.selectKey = this.props.location.pathname;
     this.menu = this.createMenu(this.selectKey)
   }

   createItem = (menu) =>{
     return  <Menu.Item key={menu.key}>
       <Link to={menu.key}>
         <Icon type={menu.icon} />
         <span>{menu.title}</span>
       </Link>
     </Menu.Item>
   };
   createMenu = (path) =>{
   return menuList.map((menu) =>{
       if (menu.children){
         return <SubMenu key={menu.key} title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}>
           {
             menu.children.map((item) =>{
               if (path === item.key){
                 this.openKey = menu.key
               }
               return this.createItem(item)
             })
           }
         </SubMenu>
       } else{
       return this.createItem(menu)
       }
     })
   };
  render() {
    /*return*/ /*(
      <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline">
        <Menu.Item key="/home">
          <Link to='/home'>
            <Icon type="home" />
            <span>首页</span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
               <Icon type="appstore" />
               <span>商品</span>
                </span>
          }
        >
          <Menu.Item key="/category">
            <Link to='/category'>
              <Icon type="bars" />
              <span>品类管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/product">
            <Link to='/product'>
              <Icon type="tool" />
              <span>商品管理</span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/user">
          <Link to='/user'>
            <Icon type="user"/>
            <span>用户管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/role">
          <Link to='/role'>
            <Icon type="safety"/>
            <span>权限管理</span>
          </Link>

        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="area-chart"/>
               <span>图形图表</span>
                </span>
          }
        >
          <Menu.Item key="/chars/bar">
            <Link to='/chars/bar'>
              <Icon type="bar-chart"/>
              <span>柱形图</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/chars/line">
            <Link to='/chars/line'>
              <Icon type="line-chart"/>
              <span>折线图</span>
            </Link>

          </Menu.Item>
          <Menu.Item key="/chars/pie">
            <Link to='/chars/pie'>
              <Icon type="pie-chart"/>
              <span>饼图</span>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );*/
    return <Menu theme="dark" defaultSelectedKeys={[this.selectKey]} defaultOpenKeys={[this.openKey]} mode="inline">
      {
        this.menu
      }
    </Menu>;


  }

}

//withRouter是一个高阶组件，负责给路由传递三大属性
export default withRouter(NavLeft);