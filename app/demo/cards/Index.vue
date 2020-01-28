<template>
  <div v-if="open">
    <CardProject />
    <CardRecord />
    <CardUser />
  </div>
</template>

<script>
import CardUser from './User'
import CardProject from './project/Index'
import CardRecord from './record/Index'

export default {
  name: 'Cards',
  components: { CardRecord, CardProject, CardUser, },
  computed: {
    open() {
      return this.$route.query.modal
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
