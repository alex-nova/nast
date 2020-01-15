<template>
  <div v-if="open">
    <CardProject />
    <CardUser />
  </div>
</template>

<script>
import CardUser from './User'
import CardProject from './project/Index'

export default {
  name: 'Cards',
  components: { CardProject, CardUser, },
  computed: {
    open() {
      return this.$route.query.modal
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
