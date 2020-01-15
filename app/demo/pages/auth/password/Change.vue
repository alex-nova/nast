<template>
  <div class="page-login">
    <div class="title"><h1>Смена пароля</h1></div>
    <form @submit="submit">
      <n-card class="auth-form">
        <div class="content">
          <n-input title="Старый пароль" type="password" v-bind="$form.input('password')" />
          <n-input title="Новый пароль" type="password" v-bind="$form.input('password2')" />
          <n-input title="Повторите новый пароль" type="password" v-bind="$form.input('password3')" />
          <n-button color="primary" type="submit" wide>Сменить пароль</n-button>
        </div>
      </n-card>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PageRegister',
  html() {
    return {
      title: 'Смена пароля',
    }
  },
  created() {
    this.$form.init({
      password: '',
      password2: '',
      password3: '',
    })
    this.$form.rules({
      password: [ 'required', ],
      password2: [ 'required', ],
      password3: [ 'required', ],
    })
  },
  methods: {
    submit(e) {
      e.preventDefault()
      if (this.$form.check()) {
        this.$store.commit('app/loading', true)
        setTimeout(() => {
          this.$store.commit('app/loading', false)
          this.$router.push({ name: 'login', })
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
