<template>
  <div class="page-login">
    <div class="title">
      <h1>Вход в систему</h1>
    </div>
    <n-card class="auth-form" :loading="$var('loading')">
      <form class="content" @submit="submit">
        <n-input title="ИИН" v-bind="$form.input('iin')" />
        <n-input title="Пароль" type="password" v-bind="$form.input('password')" />
        <n-button color="primary" type="submit" wide>Войти</n-button>
      </form>
    </n-card>
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
    this.$form.init({
      iin: 'admin@site.com',
      password: '!Q2w3e4r',
    })
    this.$form.rules({
      iin: [ 'required', ],
      password: [ 'required', ],
    })
  },
  methods: {
    submit(e) {
      e.preventDefault()
      if (this.$form.check()) {
        this.$var('loading', true)
        $app.auth.login(this.$form.get('iin'), this.$form.get('password')).then(() => {
          this.$var('loading', false)
          this.$router.push({ name: 'index', })
        }).catch(() => {
          this.$set(this.form_errors, 'default', {
            'iin': [ 'Неверный ИИН или пароль', ],
          })
          this.$var('loading', false)
        })
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
