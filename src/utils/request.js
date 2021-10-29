import axios from 'axios'
import { message } from 'ant-design-vue'
import { authorizationValue } from '@/config'
import store from '@/store/index'
import router from '@/router'
import { getToken, getRefreshToken, getExpireTime } from '@/utils/auth'
// 请求超时时间，10s
const requestTimeOut = 20 * 1000
const success = 200;
// 更换令牌的时间区间
const checkRegion = 30 * 60 * 1000
// 提示信息显示时长  秒
const messageDuration = 3

// 系统全局请求对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: requestTimeOut,
  responseType: 'json',
  validateStatus(status) {
    return status === success
  }
})

// 系统令牌刷新请求对象
const refresh_service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: requestTimeOut,
  responseType: 'json',
  validateStatus(status) {
    return status === success
  }
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if (config.url == '/system/user/success' || config.url == '/auth/oauth/token' || config.url == '/auth/user') {
    } else {
      if(!config.flag){
        store.commit("globalValues/setShowSpin", true);
      }
      
    }



    let _config = config
    try {
      const expireTime = getExpireTime()
      if (expireTime) {
        const left = expireTime - new Date().getTime()
        const refreshToken = getRefreshToken()
        if (left < checkRegion && refreshToken) {
          _config = queryRefreshToken(_config, refreshToken)
        } else {
          if (getToken()) {
            _config.headers['Authorization'] = 'bearer ' + getToken()
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
    return _config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 请求返回拦截
service.interceptors.response.use((config) => {
  setTimeout(() => {
    store.commit("globalValues/setShowSpin", false);
  }, 500)

  return config
}, (error) => {
  setTimeout(() => {
    store.commit("globalValues/setShowSpin", false);
  }, 500)
  if (error.response) {
    const errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message
    switch (error.response.status) {
      case 404:
        message.error({
          content: '很抱歉，资源未找到',
          duration: messageDuration
        });
        break
      case 403:
        message.error({
          content: '很抱歉，您暂无该操作权限',
          duration: messageDuration
        });
        break
      case 401:
        message.error({
          content: '很抱歉，认证已失效，请重新登录',
          duration: messageDuration,
          onClose: () => {
            router.push({ name: 'login' })
          }
        });
        break
      default:
        if (errorMessage === 'refresh token无效') {
          message.warning({
            content: '登录已过期，请重新登录',
            duration: messageDuration,
            onClose: () => {
              router.push({ name: 'login' })
            }
          });
        } else {
          if (errorMessage == undefined) {
            message.error({
              content: '用户名或者密码错误',
              duration: messageDuration
            });

          } else {

            message.error({
              content: errorMessage,
              duration: messageDuration
            });
          }
        }
        break
    }
  } else if (error.message.includes('timeout')) {
    message.error({
      content: '请求超时',
      duration: messageDuration
    });
  }
  return Promise.reject(error)
})

const request = {
  refresh(url, params) {
    params['grant_type'] = 'refresh_token'
    return refresh_service.post(url, params, {
      transformRequest: [(params) => {
        return tansParams(params)
      }],
      headers: {
        'Authorization': authorizationValue
      }
    })
  },
  login(url, params) {
    params['grant_type'] = 'password'
    return service.post(url, params, {
      transformRequest: [(params) => {
        return tansParams(params)
      }],
      headers: {
        'Authorization': authorizationValue,
        'login_type': 'pc_zlkj'
      }
    })
  },
  post(url, params) {
    return service.post(url, params, {
      transformRequest: [(params) => {
        return tansParams(params)
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Contro-Allow-Origin": "*",
      }
    })
  },
  put(url, params) {
    return service.put(url, params, {
      transformRequest: [(params) => {
        return tansParams(params)
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  get(url, params,flag) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {

      if (typeof params == "object") {
        let obj = {};
        for (let key in params) {
          if (params[key] != undefined) {
            obj[key] = params[key];
          }
        }
        params = obj;
      }

      _params = '?'
      for (const key in params) {
        // eslint-disable-next-line no-prototype-builtins
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }

    return service.get(`${url}${_params}`,{
      flag,
    })
  },
  delete(url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (const key in params) {
        // eslint-disable-next-line no-prototype-builtins
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return service.delete(`${url}${_params}`)
  },
  download(url, params, filename) {
    return service.post(url, params, {
      transformRequest: [(params) => {
        return tansParams(params)
      }],
      responseType: 'blob'
    }).then((r) => {
      const content = r.data
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
    }).catch((r) => {
      console.error(r)
      message.error({
        content: '下载失败',
        duration: messageDuration
      });
    })
  },
  upload(url, params, config) {
    return service.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': 'authorization-text',
        "BASE_PATH": "gongxiangdianziyan",
      },
      timeout: 3600000000,
      ...config,
    })
  }
}

function tansParams(params) {
  let result = ''
  Object.keys(params).forEach((key) => {
    if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
      result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
    }
  })
  return result
}

async function queryRefreshToken(config, refreshToken) {
  const result = await request.refresh('auth/oauth/token', {
    refresh_token: refreshToken
  })
  if (result.status === success) {
    saveData(result.data)
    config.headers['Authorization'] = 'bearer ' + getToken()
  }
  return config
}

function saveData(data) {
  store.commit('account/setAccessToken', data.access_token)
  store.commit('account/setRefreshToken', data.refresh_token)
  const current = new Date()
  const expireTime = current.setTime(current.getTime() + 1000 * data.expires_in)
  store.commit('account/setExpireTime', expireTime)
}

export default request
