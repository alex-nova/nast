<template>
  <div class="page-login">
    <div class="title"><h1>Регистрация</h1></div>
    <form @submit="submit">
      <n-card class="auth-form">
        <div class="content">
          <n-input title="Компания" value="ТОО &quot;Строительная компания&quot;" disabled />
          <n-input title="Должность" value="Главный инженер" disabled />
          <n-input title="E-mail" v-bind="$form.input('email')" />
          <n-input title="ФИО" v-bind="$form.input('fio')" />
          <n-input title="ИИН" v-bind="$form.input('iin')" />
          <n-input title="Должность" v-bind="$form.input('position')" />
          <n-input title="Пароль" type="password" v-bind="$form.input('password')" />
          <n-input title="Повторите пароль" type="password" v-bind="$form.input('password2')" />
          <n-button color="primary" type="submit" wide>Зарегистрироваться</n-button>
        </div>
      </n-card>
    </form>
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
  name: 'PageRegister',
  html() {
    return {
      title: 'Регистрация',
    }
  },
  data: () => ({
    links: [
      { title: 'Вход', link: 'login', },
      { title: 'Забыли пароль?', link: 'recover', },
    ],
  }),
  created() {
    this.$form.init({
      email: '',
      fullName: '',
      iin: '',
      password: '',
    })
    this.$form.rules({
      email: [ 'required', ],
      fio: [ 'required', ],
      iin: [ 'required', ],
      position: [ 'required', ],
      password: [ 'required', ],
    })
  },
  methods: {
    submit(e) {
      e.preventDefault()
      if (this.$form.check()) {
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
