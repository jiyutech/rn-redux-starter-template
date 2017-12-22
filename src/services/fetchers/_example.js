/*
 * 这里是针对API应用的接口封装，为了返回格式统一的数据
 *
 */
// resolve({
//   success: boolean,       // 标记请求最终成功或失败，失败情况包含网络错误和接口返回错误
//   data: core data json,  // 仅保留请求成功时的有效数据
//   errorMessage: string,  // 请求出错时的错误信息
//   errorCode: number,     // -1 代表网络错误，0 代表无错误，其他情况为服务端错误码
// })

import config from '../../config/index'
const { apiBase } = config
import qs from 'qs'

export default function( url, params ){
  return new Promise(function(resolve){
    fetch(`${apiBase.mc}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(params)
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
      if ( res.err ) {
        resolve({
          success: false,
          data: null,
          errorMessage: res.msg,
          errorCode: res.err,
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
    });
  });
}
