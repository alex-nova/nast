<template>
  <div class="page-login">
    <div class="title"><h1>Регистрация</h1></div>
    
    <n-form @submit="submit">
      <n-card v-if="type === 'company'" class="auth-form" :loading="$var('loading')">
        <div slot="header" class="form-title">Компания</div>
        <div class="content">
          <n-input title="Название компании" v-bind="$form.input('companyName')" />
          <n-input title="ИИН/БИН" v-bind="$form.input('bin')" />
        </div>
      </n-card>
      
      <n-card class="auth-form" :loading="$var('loading')">
        <div v-if="type === 'company'" slot="header" class="form-title">Ответственное лицо</div>
        <div class="content">
          <n-input v-if="company" title="Компания" :value="company.name" text />
          <n-input v-if="company" title="Должность" :value="company.position" text />
          <n-input title="ИИН" v-bind="$form.input('iin')" />
          <n-input title="E-mail" v-bind="$form.input('email')" />
          <n-input title="ФИО" v-bind="$form.input('fullName')" />
          <n-input v-if="type === 'company'" title="Должность" v-bind="$form.input('position')" />
          <n-input title="Пароль" type="password" v-bind="$form.input('password')" />
          <n-button v-if="type === 'user'" color="primary" type="submit" wide>Зарегистрироваться</n-button>
        </div>
      </n-card>
      <n-card v-if="type === 'company'">
        <n-button color="primary" type="submit" wide>Зарегистрироваться</n-button>
      </n-card>
    </n-form>
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
    type: null,
    company: null,
    links: [
      { title: 'Вход', link: 'login', },
      { title: 'Забыли пароль?', link: 'recover', },
    ],
  }),
  computed: {
    token() {
      return this.$route.params.token
    },
  },
  created() {
    const inputs = {
      email: '',
      fullName: '',
      iin: '',
      password: '',
    }
    const rules = {
      email: [ 'required', ],
      fullName: [ 'required', ],
      iin: [ 'required', ],
      password: [ 'required', ],
    }
    
    if (this.token) {
      this.$var('loading', true)
      $api.auth.invite.get(this.token).then((response) => {
        const content = response.data.content
        this.type = content.types
        
        if (this.type === 'company') {
          inputs['bin'] = content.ibin
          inputs['companyName'] = content.title
          inputs['position'] = ''
          inputs['email'] = content.email
          
          rules['bin'] = [ 'required', ]
          rules['companyName'] = [ 'required', ]
          rules['position'] = [ 'required', ]
        } else {
          const content = response.data.content
          this.company = {
            name: content.companyName,
            position: content.position,
          }
          inputs['email'] = content.email
          inputs['iin'] = content.ibin
          inputs['name'] = content.title
        }
        
        this.$form.init(inputs)
        this.$form.rules(rules)
      }).finally(() => {
        this.$var('loading', false)
      })
    } else {
      this.type = 'user'
      this.$form.init(inputs)
      this.$form.rules(rules)
    }
  },
  methods: {
    submit() {
      this.$var('loading', true)
      const api = this.type === 'user' ? $api.auth.register : $api.auth.registerCompany
      
      api(this.$form.get(), this.token).then((response) => {
        $app.auth.login(response.data.content.user, response.data.content.token)
        this.$router.push({ name: 'index', })
      }).finally(() => {
        this.$var('loading', false)
      })
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
