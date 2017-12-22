/*
 * 这里是针对API应用的接口封装，为了返回格式统一的数据

  resolve({
    success: boolean,       // 标记请求最终成功或失败，失败情况包含网络错误和接口返回错误
    data: core data json,  // 仅保留请求成功时的有效数据
    errorMessage: string,  // 请求出错时的错误信息
    errorCode: number,     // -1 代表网络错误，0 代表无错误，其他情况为服务端错误码
  })
  
 */

import config from '../../config/index'
const { apiBase } = config
import qs from 'qs'

export default function( method, url, params ){
  return new Promise(function(resolve){
    console.log(`${apiBase.jarvis}${url}`);
    fetch(`${apiBase.jarvis}${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then(function(res){
      return res.json()
    }, function(){
      resolve({
        success: false,
        data: null,
        errorMessage: '',
        errorCode: -1,
      })
    }).then(function(res){
      if ( !res || res.errorCode ) {
        console.log(`[MC Request error ${apiBase.mc}${url}]`);
        console.log(res);
        resolve({
          success: false,
          data: null,
          errorMessage: res && res.errorMessage,
          errorCode: res && res.errorCode,
        })
      }
      else {
        resolve({
          success: true,
          data: res,
          errorMessage: '',
          errorCode: 0,
        })
      }
    }).catch(e=>{
      console.log(`[MC Request error ${apiBase.mc}${url}]`);
      console.log(e);
      resolve({
        success: false,
        data: null,
        errorMessage: '',
        errorCode: -1,
      })
    });
  });
}
