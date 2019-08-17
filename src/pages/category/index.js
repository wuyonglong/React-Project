import React,{Component,Fragment} from 'react';
import {Button,Icon,Card,Table,message,Modal} from 'antd';
import {reqGetCategory,reqAddCategory} from '../../api';
import './index.less';
import Addcategory from './add-categroy-form'
export default class Category extends Component{
  state = {
    categories:[],
    isShowAddCategory:false,
  };
  addCategoryFormRef = React.createRef();

  handCategory = () =>{
    this.setState({
      isShowAddCategory:true,
    });
  };
  cancel = () =>{
    this.setState({
      isShowAddCategory:false,
    })
  };
  /*addCategory = () =>{
    this.addCategoryFormRef.current.validateFields((err,values) =>{
      if (!err){
        const {parentId,categoryName} = values;
        reqAddCategory(parentId,categoryName)
          .then((res) =>{
            this.setState({
              categories:[...this.state.categories,res]
            });
            message.success('添加成功',3)
          })
          .catch((error) =>{
            message.error(error,3)
          })
          .finally(() =>{
            this.setState({
              isShowAddCategory:false,
            });
            this.addCategoryFormRef.current.resetFields();
          })
      }
    })
  };*/
    addCategory = () =>{
      this.addCategoryFormRef.current.validateFields((err,values) =>{
        if (!err){
          const {parentId,categoryName} = values;
          reqAddCategory(parentId,categoryName)
            .then((res) =>{
              this.setState({
                categories:[...this.state.categories,res]
              })
              message.success('添加商品成功',3)
            })
            .catch((error) =>{
              message.error(error,3)
            })
            .finally(() =>{
              this.setState({
                isShowAddCategory:false,
              })
            })
        }
      })
    };
 /* componentDidMount() {
    //请求一级分类数据
    reqGetCategory(0)
      .then((res) =>{
        this.setState({
          categories:res
        })
      })
      .catch((error) =>{
        message.error(error,1)
      })
  }*/
 componentDidMount() {
   reqGetCategory(0)
     .then((res) =>{
       this.setState({
         categories:res,
       })
     })
     .catch((error) =>{
       message.error(error,3)
     })

 }

  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      className: 'column-operation',
      dataIndex: 'operation',
      render:() =>{
        return <Fragment>
          <Button type="link">修改名称</Button>
          <Button type="link">查看其子品类</Button>
        </Fragment>
      }
    },
  ];
  render() {
    const {categories,isShowAddCategory} = this.state;
    return (
      <div className='category'>
        <Card title="一级分类列表" extra={<Button type='primary' onClick={this.handCategory}><Icon type='plus'/> 添加分类</Button>}  className='category-table' >
          <Table
            columns={this.columns}
            dataSource={categories}
            bordered
            pagination={{
              pageSizeOptions:['3','6','9','12'],
              defaultPageSize:3,
              showQuickJumper:true,
              showSizeChanger:true,
            }}
            rowKey='_id'
          />
        </Card>
        <Modal
          title="添加分类"
          visible={isShowAddCategory}
          onOk={this.addCategory}
          onCancel={this.cancel}
          okText='确认'
          cancelText='取消'
        >
          <Addcategory categories={categories} ref={this.addCategoryFormRef}/>
        </Modal>
      </div>
    );
  }
}