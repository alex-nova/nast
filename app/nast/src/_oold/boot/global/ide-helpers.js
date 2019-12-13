
export default () => {
  if ($env.env === 'no') {
    /**
     * IDE hints support.
     */
    global.$env = { /* eslint-disable-line no-unused-vars */
      /**
       * @var {boolean}
       */
      prod: true,
      
      /**
       * @var {string} development|testing|demo|alpha|beta|production
       */
      env: 'production',
      
      /**
       * @var {string} web|android|ios|windows|mac|linux
       */
      theme: 'web',
      
      /**
       * @var {string} for web: hash|prerender|sfa|server
       */
      type: '',
    }
  }
}
