
export default {
  api: undefined,
  content: {},
  fetch: () => {},
  timeout: undefined,
  
  queue: [], // [ 'name1', 'name2', ]
  running: false,
  fetching: false,
  fetchingRequest: null,
  
  init({ api, content, fetch, options = {}, }) {
    this.api = api
    this.content = content
    this.fetch = fetch
    this.timeout = options.timeout || 5
    return this
  },
  
  start() {
    this.running = true
    this.worker()
  },
  stop() {
    this.running = false
    if (this.fetchingRequest) {
      this.fetchingRequest.stop()
    }
  },
  
  worker() {
    if (this.running) {
      this.searcher()
      this.sendRequest()
      
      setTimeout(() => {
        this.worker()
      }, 2000)
    }
  },
  
  sendRequest() {
    if (!this.fetching && $n.size(this.queue)) {
      this.fetching = true
      
      const _sendRequest = () => {
        const name = this.queue[0]
        
        // return if queue is empty
        if (!name) {
          this.fetching = false
          return
        }
        
        // return if content is already updated
        if (this.content[name].outdatedAt > $app.date()) {
          this.queue.shift()
          _sendRequest()
          return
        }
  
  
        this.fetch({ name, ...this.api[name], }).then(() => {
          this.fetchingRequest = setTimeout(() => {
            _sendRequest()
          }, this.timeout* 1000)
        })
        this.queue.shift()
      }
      _sendRequest()
    }
  },
  
  // Ищет устаревшую информацию и добавляет api в очередь
  searcher() {
    $n.each(this.content, (c, name) => {
      if (!this.api[name].disabled && ($app.date(c.outdatedAt) <= $app.date()) && !this.queue.includes(name)) {
        this.queue.push(name)
      }
    })
  },
  
  forceFetch(names) {
    $n.each(names, (name) => {
      this.fetch({ name, ...this.api[name], })
    })
  },
}
