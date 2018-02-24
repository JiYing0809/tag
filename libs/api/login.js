
// 请不要使用这个 auth_fetch 作为自己的请求库
import fetch from 'libs/utils/auth_fetch';

export function loginByLDAP(name, password) {
  return fetch({
    url: '/login/loginbyldap',
    method: 'post',
    data: { name, password }
  });
}

// export function logout() {
//   return fetch({
//     url: '/login/logout',
//     method: 'post'
//   });
// }

export function getNavBarInfo() {
  return fetch({
    url: '/api/profiles',
    method: 'get'
  })
}

export function getPermission() {
  return fetch({
    url: '/api/menu/info',
    method: 'get'
  })
}

export function getAllRoute() {
  return fetch({
    url: '/api/router',
    method: 'get'
  })
}
