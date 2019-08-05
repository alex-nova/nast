
export default () => {
  if (!$env.prod) {
    /**
     * IDE hints support.
     */
    const $env = { /* eslint-disable-line no-unused-vars */
      /**
       * @var {boolean}
       */
      prod,
      
      /**
       * @var {string} development|testing|alpha|beta|demo|production
       */
      env,
      
      /**
       * @var {string} web|android|ios|windows|mac|linux
       */
      theme,
      
      /**
       * @var {string} for web: hash|prerender|sfa
       */
      type,
    }
  }
}
