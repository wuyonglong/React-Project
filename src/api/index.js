import axiosInstance from './ajax';
import jsonp from 'jsonp'


 const reqLogin = (username,password) => axiosInstance.post('/login',{username,password});
 const reqValidateUser = (id) =>axiosInstance.post('/validate/user',{id});
 const reqWheather = (cityName) =>{
  return new Promise((resolve, reject) =>{
   jsonp(
     `http://api.map.baidu.com/telematics/v3/weather?location=${cityName}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
     {},
     function (err,data) {
      if (err){
       reject('天气请求失败')
      }else{

       const {weather,dayPictureUrl} = data.results[0].weather_data[0];
       resolve({
        weather,
        dayPictureUrl
       })
      }
     }
   )
  })
 };
 /*const reqGetCategory = (parentId) => axiosInstance.get('/manage/category/list', {
 params: {
  parentId
 }
});*/
 const reqGetCategory = (parentId) =>axiosInstance.get('/manage/category/list',{
  params:{
   parentId
  }
 });
 const reqAddCategory = (parentId,categoryName) =>axiosInstance.post('/manage/category/add',{parentId,categoryName})



 export {
  reqLogin,
  reqValidateUser,
  reqWheather,
  reqGetCategory,
  reqAddCategory,
 }