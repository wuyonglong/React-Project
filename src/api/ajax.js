  import axios from 'axios';


  const BASE_URL = process.env.NODE_ENV === 'development'? 'http://localhost:3000' : 'http://localhost:5000';

  const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:10000,
  });

  axiosInstance.interceptors.response.use(
    (response) =>{

      const result = response.data;

        if (result.status === 0){
          return result.data || {}
        } else{
          return Promise.reject(result.msg || '请求失败')
        }

    },
    (error) =>{
      return Promise.reject('网络出现故障啦，请刷新试试')
    }
  );

 /*const BASE_URL = process.env.NODE_ENV ='development'? 'http://localhost:3000'*/

  export default axiosInstance

