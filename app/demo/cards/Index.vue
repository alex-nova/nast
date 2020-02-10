<template>
  <div v-if="open">
    <CardProject />
    <CardCompany />
    <CardRecord />
    <CardUser />
  </div>
</template>

<script>
import CardUser from './User'
import CardProject from './project/Index'
import CardCompany from './company/Index'
import CardRecord from './record/Index'

export default {
  name: 'Cards',
  components: { CardRecord, CardCompany, CardProject, CardUser, },
  computed: {
    open() {
      return this.$route.query.modal
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
