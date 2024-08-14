import JsonMirror from './json-mirror'

JsonMirror.install = Vue => {
  Vue.component(JsonMirror.name, JsonMirror)
}

export default JsonMirror
