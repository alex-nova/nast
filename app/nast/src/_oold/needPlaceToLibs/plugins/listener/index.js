
// { target: document, event: 'scroll', method: scroll, }
const plugin = {
  install(Vue, options) {
    Vue.mixin({
      mounted() {
        const listeners = this.$options.listeners ? this.$options.listeners.bind(this).call() : false
        if (listeners) {
          listeners.map((listener) => {
            if (listener.mounted !== false) {
              listener.method()
            }
            if (listener.target === 'bus') {
              $app.bus.listen(listener.event, listener.method)
            } else {
              let targets = listener.target
              if (!HTMLCollection.prototype.isPrototypeOf(targets)) {
                targets = [ targets, ]
              }
              $n.each(targets, (t) => t.addEventListener(listener.event, listener.method))
            }
          })
        }
      },
      beforeDestroy() {
        const listeners = this.$options.listeners ? this.$options.listeners.bind(this).call() : false
        if (listeners) {
          listeners.map((listener) => {
            if (listener.target !== 'bus') {
              let targets = listener.target
              if (!HTMLCollection.prototype.isPrototypeOf(listener.target)) {
                targets = [ listener.target, ]
              }
              $n.each(targets, (t) => t.removeEventListener(listener.event, listener.method))
            }
          })
        }
      },
    })
  },
}

export default plugin
