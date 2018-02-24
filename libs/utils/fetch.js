import axios from 'axios'
import {
  Message
} from '@ppc/iview'

// 创建axios实例
const service = axios.create({
  timeout: 5 * 1000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.headers['content-type'].includes('text/html')) {
      window.location.href = response.request.responseURL
      return response
    }
    if (!response.data.success) {
      Message.error(response.data.message,
        3
      )
      return Promise.reject(response.data)
    } else {
      return response.data.data
    }
  },
  error => {
    let msg = ''
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // if (error.response.status === 403) {
      //   msg = '你没有权限访问这个页面或资源'
      // } else {
      //   msg = error.response.data.errors.map(x => {
      //     x.RejectedValue = x.RejectedValue ? ` - ${x.RejectedValue}` : ''
      //     return `${x.Message}${x.RejectedValue}`
      //   }).join('\n')
      // }
      try {
        msg = error.response.data
        console.error(error.response.data)
      } catch (e) {
        msg = '服务器异常'
      }
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      msg = '服务器无响应'
      console.error(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      msg = `Error : ${error.message}`
      console.error('Error', error.message)
    }
    console.error(error.response)

    Message.error(msg,
      3
    )

    return Promise.reject(error)
  }
)

export default service
