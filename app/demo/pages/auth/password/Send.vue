<template>
  <div class="page-send">
    <div class="title"><h1>Отправлено!</h1></div>
    <div class="content">
      На ваш e-mail отправлено письмо с для восстановления пароля.
    </div>
    <div class="links">
      <template v-for="(link, i) in links">
        <n-link :key="link.title" :to="link.link">{{ link.title }}</n-link>
        <div v-if="i < links.length - 1" :key="link.title+'sep'">|</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageSend',
  html() {
    return {
      title: 'Отправлено!',
    }
  },
  data: () => ({
    links: [
      { title: 'Вход', link: 'login', },
      { title: 'Регистрация', link: 'register', },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.page-send {
  max-width: 500px;
  
  .title {
    h1 {
      margin: 0;
    }
  }
  
  .content {
    padding: 40px 0 10px;
  }
}
</style>
