<template>
  <div v-if="open" class="modals">
    <CardProject />
    <CardCompany />
    <CardRecord />
    <CardUser />
  </div>
</template>

<script>
import CardUser from './user/Index'
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
  .modals {
    &::v-deep {
  
      .body {
        .content {
          --n-items-margin: 10px;
        }
    
        & > .n-items > * {
          vertical-align: middle;
        }
    
        .avatar {
          width: 80px;
          height: 80px;
          --n-image-border: 3px solid #fff;
        }
      }
    }
  }
</style>
