<template>
  <div class="tab-info">
  </div>
</template>

<script>
export default {
  name: 'TabInfo',
  props: [ 'model', 'form', ],
  data: () => ({
    users: [],
  }),
  computed: {
    user: {
      get() {
        return this.form.get('user')
      },
      set(value) {
        this.form.set('user', value)
      },
    },
  },
  watch: {
    model(value) {
      this.form.init(value, false)
    },
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    loadUsers(params) {
      $api.users.get().then((response) => {
        this.users = response.data.content
        this.$toggle('loading', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-info {
    
  }
</style>
