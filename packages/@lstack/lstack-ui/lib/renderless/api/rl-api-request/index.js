import RlApiRequest from './rl-api-request'

RlApiRequest.install = Vue => {
  Vue.component(RlApiRequest.name, RlApiRequest)
}

export default RlApiRequest
