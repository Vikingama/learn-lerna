import DockerfileMirror from './dockerfile-mirror'

DockerfileMirror.install = Vue => {
  Vue.component(DockerfileMirror.name, DockerfileMirror)
}

export default DockerfileMirror
