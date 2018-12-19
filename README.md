# Vue http plugin

### Description

A lightweight http plugin for vue, defaults to rest, with promises.

### Usage

Install in your VueJS project:

```bash
npm i -s tb-vue-http
```

Import in __main.js__:

```javascript
import HttpPlugin from 'tb-vue-http'
```

Create a server config:
```javascript
let apiConfig = [
  {
    // will be available in all components with this.$api.get( ... ), this.$api.post( ... )
    name: "api",
    // the prefix for all requests
    url: "http://mydomain.com/api",
    headers: {
      // a header for all request
      "api-key": "1x2y3zasd456fgh789",
      // sometimes not known on start - will be evaluated before every request
      "Authorization": () => localStorage.getItem('my-auth-token')
    }
  },
  /*
    optional - define as many as you want
    will be available with (for example) this.$google.get( ... )
  */
  {
    name: "google",
    url: "http://google.com",
    headers: { }
  }
]
```

And install the plugin with it:
```javascript
Vue.use(HttpPlugin, apiConfig)
```



<hr>



And you are good to go!<br>
Without headers:
  - the response is already parsed (not the JSON string)
  - the payload of post is serialized
  - and has the _'Content-type': 'application/json'_ header

```javascript
methods: {
  getTodo: function(id) {
    this.$api.get("/todos?id=" + id)
      .then(todoObj => this.myGetTodoSuccessHandler(todoObj))
      .catch(({ status, msg })=> this.myGetTodoErrorHandler({ status, msg }))
  },
  createTodo(title, desc) {
    this.$api.get("/todo/create", { title, desc })
      .then(res => this.myCreateTodoSuccessHandler(res))
      .catch(({ status, msg })=> this.myCreateTodoErrorHandler({ status, msg }))
  }
}
```

Or with them:
  - __ONLY__ the default headers are applied
  - No parsing/serializing anywhere
  - Do whatever you want with the request/response

```javascript
methods: {
  createSomething(dataObj) {
    let headers = {
      'Content-type': 'application/xml',
      'My-custom-header-only-for-this-request': 'whatever'
    }
    let payload = new myCustomXMLSerializer().serialize(dataObj)
    this.$api.post("/todo/create", payload, headers)
      .then(res => this.myParserAndSuccessHandler(res))
      .catch(({ status, msg })=> this.myErrorHandler({ status, msg }))
  }
}
  ```
