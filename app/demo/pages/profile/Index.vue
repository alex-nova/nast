<template>
  <div class="page-user-index">
    <n-card :loading="$toggler.loading">
      <template #header><h3>Основная информация</h3></template>
      <div class="items">
        <n-input title="Компания" v-bind="$form.input('company.name')" text />
        <n-input title="ФИО" v-bind="$form.input('fullName')" />
        <n-input title="ИИН" v-bind="$form.input('iin')" />
        <n-input title="E-mail" v-bind="$form.input('email')" />
        <n-input title="Телефон" v-bind="$form.input('phone')" />
        <n-input title="Должность" v-bind="$form.input('position')" />
      </div>
      <n-items>
        <n-button v-if="!$form.editable()" color="primary" @click="$form.edit">Редактировать</n-button>
        <n-button v-if="$form.editable()" color="success" @click="save">Сохранить</n-button>
        <n-button v-if="$form.editable()" flat @click="() => { $form.reset(); $form.edit() }">Отмена</n-button>
      </n-items>
    </n-card>
    
    <n-card :loading="$toggler.loadingPassword">
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
    this.$form.init(this.$store.state.app.user, false)
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
        this.$toggle('loading', true)
        setTimeout(() => {
          this.$form.edit(false)
          this.$toggle('loading', false)
        }, 1500)
      }
    },
    savePassword() {
      if (this.$form.check(undefined, 'password')) {
        this.$nextTick(() => {
          if (this.$form.get('oldPassword', 'password') !== '123456') {
            this.$set(this.inputs_errors, 'password', {
              oldPassword: [ 'Неверный пароль', ],
            })
            return
          }
          if (this.$form.get('password', 'password') !== this.$form.get('passwordConfirm', 'password')) {
            this.$set(this.inputs_errors, 'password', {
              passwordConfirm: [ 'Пароли не совпадают', ],
            })
            return
          }
          this.$toggle('loadingPassword', true)
          setTimeout(() => {
            this.$form.edit(false)
            this.$toggle('loadingPassword', false)
            this.$form.reset('password')
          }, 1500)
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
