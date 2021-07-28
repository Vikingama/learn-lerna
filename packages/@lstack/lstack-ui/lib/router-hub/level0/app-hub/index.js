import AppHub from './app-hub'

AppHub.install = Vue => {
  Vue.component(AppHub.name, AppHub)
}

export default AppHub
