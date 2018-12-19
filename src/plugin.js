import HttpService from './service'

export default class HttpPlugin {

  static install(Vue, services) {
    services.forEach(service => {
      const name = "$" + service.name
      HttpPlugin[service.name] = new HttpService(service.url, service.headers)
      Vue.prototype[name] = HttpPlugin[service.name]
    })
  }
}
