<template>
  <div class="page-sign-info">
    <div class="title">
      <h1>Информация о подписи</h1>
    </div>
    <n-card :loading="$var('load')">
      <n-form v-if="sign" class="content">
        <n-form-item title="Подписант">
          <img class="avatar" :src="sign.author.user.avatar" />
          <div>{{ sign.author.user.fullName }}</div>
        </n-form-item>
        <n-input title="Дата подписи" :value="$app.date.format(sign.signedAt, 'datetime')" text />
        <n-input title="Статус" :value="sign.isApproved ? 'Подписано' : 'Отклонено'" text />
      </n-form>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageSignInfo',
  data() {
    return {
      sign: undefined,
    }
  },
  computed: {
    token() {
      return this.$route.params.token
    },
  },
  created() {
    this.$var('load', true)
    $api.edms.signs.info(this.token).then((response) => {
      this.sign = response.data.content
    }).finally(() => {
      this.$var('load', false)
    })
  },
}
</script>

<style lang="scss" scoped>
  .page-sign-info {
    max-width: 600px;
    
    .avatar {
      max-height: 100px;
      max-width: 150px;
    }
    
    .title {
      h1 {
        margin: 0;
      }
    }
    
    .content {
      &>* {
        margin: 20px 0;
      }
    }
  }
</style>
