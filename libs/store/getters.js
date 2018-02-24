const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  name: state => state.user.name,
  profile: state => state.server.profile,
  permissionRoute: state => state.user.permissionRoute,
  allModuelRoute: state => state.app.allModuelRoute,
  menuList: state => state.app.menuList
}

export default getters
