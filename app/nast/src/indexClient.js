import { createApp, } from './index'


const { app, router, store, } = createApp()

// const initState = (store) => {
//   return $app.storage.get('content').then((result) => {
//     const storageValue = JSON.parse(result)
//     const ssrValue = window.__INITIAL_STATE__
//
//     if (ssrValue) {
//       store.replaceState(ssrValue)
//       offliner.refreshStore()
//     }
//
//     offliner.start()
//   })
// }
//
// initState(store).then(() => {
// app.$mount('#app')
// })

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map((c) => c.asyncData).filter((_) => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    
    Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to, })))
      .then(() => {
        next()
      })
      .catch(next)
  })
  
  app.$mount('#app')
})
