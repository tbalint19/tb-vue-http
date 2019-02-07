export default class HttpService {

  static DEFAULT_HEADERS = {
    'Content-type': 'application/json'
  }

  constructor(url, domainHeaders) {
    this.url = url
    this.domainHeaders = domainHeaders
  }

  isFunction(value) {
    return Object.prototype.toString.call(value) == '[object Function]';
  }

  get(path, requestHeaders) {
    return new Promise((resolve, reject) => {
      if (requestHeaders == null) {
        requestHeaders = Object.assign({}, HttpService.DEFAULT_HEADERS)
      }
      let request = this.createRequest('GET', this.url + path, [this.domainHeaders, requestHeaders])
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (requestHeaders['Content-type'] == 'application/json') {
            resolve(JSON.parse(request.responseText))
          } else {
            resolve(request.responseText)
          }
        } else if (this.readyState == 4 && this.status !== 204) {
          resolve(request)
        } else if (this.readyState == 4 && this.status !== 200) {
          reject({status: this.status, response: this.responseText})
        }
      }
      request.send()
    })
  }

  post(path, data, requestHeaders) {
    return new Promise((resolve, reject) => {
      if (requestHeaders == null) {
        requestHeaders = Object.assign({}, HttpService.DEFAULT_HEADERS)
      }
      let request = this.createRequest('POST', this.url + path, [this.domainHeaders, requestHeaders])
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (requestHeaders['Content-type'] == 'application/json') {
            resolve(JSON.parse(request.responseText))
          } else {
            resolve(request.responseText)
          }
        } else if (this.readyState == 4 && this.status !== 204) {
          resolve(request)
        } else if (this.readyState == 4 && this.status !== 200) {
          reject({status: this.status, response: this.responseText})
        }
      }
      let payload = requestHeaders['Content-type'] == 'application/json' ? JSON.stringify(data) : data
      request.send(payload)
    })
  }

  put(path, data, requestHeaders) {
    return new Promise((resolve, reject) => {
      if (requestHeaders == null) {
        requestHeaders = Object.assign({}, HttpService.DEFAULT_HEADERS)
      }
      let request = this.createRequest('PUT', this.url + path, [this.domainHeaders, requestHeaders])
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (requestHeaders['Content-type'] == 'application/json') {
            resolve(JSON.parse(request.responseText))
          } else {
            resolve(request.responseText)
          }
        } else if (this.readyState == 4 && this.status !== 204) {
          resolve(request)
        } else if (this.readyState == 4 && this.status !== 200) {
          reject({status: this.status, response: this.responseText})
        }
      }
      let payload = requestHeaders['Content-type'] == 'application/json' ? JSON.stringify(data) : data
      request.send(payload)
    })
  }

  del(path, requestHeaders) {
    return new Promise((resolve, reject) => {
      if (requestHeaders == null) {
        requestHeaders = Object.assign({}, HttpService.DEFAULT_HEADERS)
      }
      let request = this.createRequest('DELETE', this.url + path, [this.domainHeaders, requestHeaders])
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (requestHeaders['Content-type'] == 'application/json') {
            resolve(JSON.parse(request.responseText))
          } else {
            resolve(request.responseText)
          }
        } else if (this.readyState == 4 && this.status !== 204) {
          resolve(request)
        } else if (this.readyState == 4 && this.status !== 200) {
          reject({status: this.status, response: this.responseText})
        }
      }
      request.send()
    })
  }

  createRequest(method, url, headersList) {
    let request = new XMLHttpRequest()
    request.open(method, url, true)
    this.addHeaders(request, headersList)
    return request
  }

  addHeaders(request, headersList) {
    for (let headers of headersList) {
      for (let key in headers) {
        let value = headers[key]
        if (this.isFunction(value)) {
          request.setRequestHeader(key, value())
        } else {
          request.setRequestHeader(key, value)
        }
      }
    }
  }

}
