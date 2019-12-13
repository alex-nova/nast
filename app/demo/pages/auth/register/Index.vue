<template>
  <div class="page-login">
    <div class="title"><h1>Регистрация компании</h1></div>
    <form @submit="submit">
      <n-card class="auth-form">
        <div slot="header" class="form-title">Компания</div>
        <div class="content">
          <n-input title="Название компании" v-bind="$inputs.input('cname')" />
          <n-input title="ИИН/БИН" v-bind="$inputs.input('bin')" />
        </div>
      </n-card>
      <n-card class="auth-form">
        <div slot="header" class="form-title">Ответственное лицо</div>
        <div class="content">
          <n-input title="E-mail" v-bind="$inputs.input('email')" />
          <n-input title="ФИО" v-bind="$inputs.input('fio')" />
          <n-input title="ИИН" v-bind="$inputs.input('iin')" />
          <n-input title="Должность" v-bind="$inputs.input('position')" />
          <n-input title="Пароль" type="password" v-bind="$inputs.input('password')" />
          <n-input title="Повторите пароль" type="password" v-bind="$inputs.input('password2')" />
        </div>
      </n-card>
      <n-card>
        <n-button color="primary" type="submit" wide>Зарегистрироваться</n-button>
      </n-card>
    </form>
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
    this.$inputs.init({
      cname: '',
      bin: '',
      email: '',
      fio: '',
      iin: '',
      position: '',
      password: '',
      password2: '',
    })
    this.$inputs.rules({
      cname: [ 'required', ],
      bin: [ 'required', ],
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
