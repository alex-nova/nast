<template>
  <div class="page-user-index">
    <n-card :loading="$var('loading')">
      <template #header><h3>Основная информация</h3></template>
      <div class="items">
        <n-input title="ИИН" v-bind="$form.input('iin')" text />
        <n-input title="ФИО" v-bind="$form.input('fullName')" />
        <n-input title="E-mail" v-bind="$form.input('email')" />
        <n-input title="Телефон" v-bind="$form.input('phone')" />
      </div>
      <n-items>
        <n-button v-if="!$form.editable()" color="primary" @click="$form.edit">Редактировать</n-button>
        <n-button v-if="$form.editable()" color="success" @click="save">Сохранить</n-button>
        <n-button v-if="$form.editable()" flat @click="() => { $form.reset(); $form.edit() }">Отмена</n-button>
      </n-items>
    </n-card>
    <n-card :loading="$var('loadingPassword')">
      <template #header><h3>Смена пароля</h3></template>
      <div class="items">
        <n-input title="Старый пароль" type="password" v-bind="$form.input('oldPassword', 'password')" />
        <n-input title="Новый пароль" type="password" v-bind="$form.input('password', 'password')" />
        <n-input title="Повторите новый пароль" type="password" v-bind="$form.input('passwordConfirm', 'password')" />
      </div>
      <n-items>
        <n-button v-if="$form.editable('password')" color="success" @click="savePassword">Сохранить новый пароль</n-button>
      </n-items>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageUserIndex',
  data: () => ({}),
  created() {
    this.$form.init($app.auth.user(), false)
    this.$form.init({
      oldPassword: '',
      password: '',
      passwordConfirm: '',
    }, true, 'password')
    this.$form.rules({
      oldPassword: [ 'required', ],
      password: [ 'required', ],
    }, 'password')
  },
  methods: {
    save() {
      if (this.$form.check()) {
        this.$var('loading', true)
        $api.users.edit($app.auth.user().id, this.$form.get()).then((response) => {
          $app.auth.user(response.data.content)
          this.$form.edit(false)
          this.$var('loading', false)
        }).catch(() => {
          this.$form.edit(false)
          this.$var('loading', false)
        })
      }
    },
    savePassword() {
      if (this.$form.check(undefined, 'password')) {
        $api.users.editPassword($app.auth.user().id, this.$form.get(undefined, 'password')).then(() => {
          this.$var('loadingPassword', false)
          this.$form.reset('password')
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .page-user-index {
    
    .items {
      & > * {
        margin: 15px 0;
        
        &:first-child {
          margin-top: 0;
        }
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    
    .n-items {
      margin-top: 25px;
    }
  }
</style>
