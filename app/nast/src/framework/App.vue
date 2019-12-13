<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'RootApp',
  html() {
    const meta = {
      meta: [
        { charset: 'utf-8', },
        { name: 'mobile-web-app-capable', content: 'yes', },
        { name: 'apple-mobile-web-app-capable', content: 'yes', },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default', },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui', },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '120x120', href: `${$config('app.baseUrl')}assets/static/120.png`, },
        { rel: 'shortcut icon', sizes: '48x48', href: `${$config('app.baseUrl')}assets/static/48.png`, },
      ],
      htmlAttrs: {
        lang: 'ru',
      },
    }
    
    // if ($config('app.manifest.use')) {
    //   meta.link.push({ rel: 'manifest', href: `${$config('app.baseUrl')}assets/static/manifest.json`, })
    // }
    
    return meta
  },
}
</script>
