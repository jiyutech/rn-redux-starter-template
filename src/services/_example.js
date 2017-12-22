import config from '../config/index'
const { apiBase } = config
import qs from 'qs'


export async function getList ( query ) {
  return request({
    url: `${apiBase.main}/accounts?`+ qs.stringify({
      loginToken: query.loginToken,
      ...query
    }),
    method: 'get'
  })
}

export async function createSingle ( data ) {
  return request({
    url: `${apiBase.main}/accounts?`+ qs.stringify({
      loginToken: data.loginToken
    }),
    method: 'post',
    data,
  })
}


export async function patchSingle (data, query) {
  return request({
    url: `${apiBase.main}/accounts/${data.id}?`+ qs.stringify({
      loginToken: query.loginToken,
      ...query
    }),
    method: 'patch',
    data,
  })
}

export async function putSingle (data, query) {
  return request({
    url: `${apiBase.main}/accounts/${data.id}?`+ qs.stringify({
      loginToken: query.loginToken,
      ...query
    }),
    method: 'put',
    data,
  })
}

export async function deleteSingle ( id, query ) {
  return request({
    url: `${apiBase.main}/accounts/${id}?`+ qs.stringify({
      loginToken: query.loginToken,
      ...query
    }),
    method: 'delete'
  })
}
