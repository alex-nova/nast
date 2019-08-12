
export default () => {
  if (!$env.prod) {
    /**
     * IDE hints support.
     */
    const $env = { /* eslint-disable-line no-unused-vars */
      /**
       * @var {boolean}
       */
      prod: true,
      
      /**
       * @var {string} development|testing|alpha|beta|demo|production
       */
      env: 'production',
      
      /**
       * @var {string} web|android|ios|windows|mac|linux
       */
      theme: 'web',
      
      /**
       * @var {string} for web: hash|prerender|sfa
       */
      type: '',
    }
  }
}
