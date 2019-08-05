<template>
  <div>
    <n-button color="primary">
      sdas
    </n-button>
    <n-input title="asds" inline />
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({
    testName: '',
  }),
  mounted() {
    this.testCookie()
    this.testSession()
    this.testStorage()
  },
  methods: {
    testCookie() {
      this.testName = 'Cookie'
    
      $app.cookie.set('q', 12)
      this.expect($app.cookie.get('q'), 12, 'set number')
    
      $app.cookie.set('q', [ 'qwe', 'asd', ])
      this.expect($app.cookie.get('q'), [ 'qwe', 'asd', ], 'set array')
    },
    testSession() {
      this.testName = 'Session'
    
      $app.session.set('q', 12)
      this.expect($app.session.get('q'), 12, 'set number')
    
      $app.session.set('q', [ 'qwe', 'asd', ])
      this.expect($app.session.get('q'), [ 'qwe', 'asd', ], 'set array')
    },
    testStorage() {
      this.testName = 'Storage'
    
      $app.storage.set('q', '12').then(() => {
        $app.storage.get('q').then((value) => {
          this.expect(value, '12', 'set')
        })
      })
    },
    
    expect(value, expect, name = '') {
      if ($n.isEqual(value, expect)) {
        console.warn(`Test ${this.testName}[${name}] passed!`)
      } else {
        console.error(`Test ${this.testName}[${name}] failed! Expected `, expect, 'got ', value)
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
