<template>
  <div class="page-login">
    <div class="title"><h1>Вход в систему</h1>
    </div>
    <n-card class="auth-form">
      <form class="content" @submit="submit">
        <n-input title="ИИН" v-bind="$inputs.input('iin')" />
        <n-input title="Пароль" type="password" v-bind="$inputs.input('password')" />
        <n-button color="primary" type="submit" wide>Войти</n-button>
      </form>
    </n-card>
    <div class="links">
      <template v-for="(link, i) in links">
        <n-link :to="link.link" :key="link.title">{{ link.title }}</n-link>
        <div v-if="i < links.length - 1" :key="link.title+'sep'">|</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLogin',
  html() {
    return {
      title: 'Вход в систему',
    }
  },
  data: () => ({
    links: [
      { title: 'Регистрация', link: 'register', },
      { title: 'Забыли пароль?', link: 'recover', },
    ],
  }),
  created() {
    this.$inputs.init({
      iin: '',
      password: '',
    })
    this.$inputs.rules({
      iin: [ 'required', ],
      password: [ 'required', ],
    })
  },
  methods: {
    submit(e) {
      e.preventDefault()
      if (this.$inputs.check()) {
        this.$store.commit('app/loading', true)
        setTimeout(() => {
          this.$store.commit('app/loading', false)
          this.$router.push({ name: 'index', })
        }, 3000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-login {
  max-width: 500px;
  
  .title {
    h1 {
      margin: 0;
    }
  }
  
  .auth-form {
    .content {
      &>* {
        margin: 20px 0;
      }
      .n-button {
        --n-button-padding: 12px 20px;
        margin: 30px 0 10px;
      }
    }
  }
  
  .links {
    display: flex;
    flex-direction: row;
    & > * {
      display: inline-block;
      margin: 0 10px;
      opacity: .5;
      transition: opacity linear 100ms;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
