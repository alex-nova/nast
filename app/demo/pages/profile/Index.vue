<template>
  <div class="page-user-index">
    <n-card :loading="$toggler.loading">
      <template #header><h3>Основная информация</h3></template>
      <div class="items">
        <n-input title="Компания" v-bind="$inputs.input('company.name')" text />
        <n-input title="ФИО" v-bind="$inputs.input('fullName')" />
        <n-input title="ИИН" v-bind="$inputs.input('iin')" />
        <n-input title="E-mail" v-bind="$inputs.input('email')" />
        <n-input title="Телефон" v-bind="$inputs.input('phone')" />
        <n-input title="Должность" v-bind="$inputs.input('position')" />
      </div>
      <n-items>
        <n-button v-if="!$inputs.editable()" color="primary" @click="$inputs.edit">Редактировать</n-button>
        <n-button v-if="$inputs.editable()" color="success" @click="save">Сохранить</n-button>
        <n-button v-if="$inputs.editable()" flat @click="() => { $inputs.reset(); $inputs.edit() }">Отмена</n-button>
      </n-items>
    </n-card>
    
    <n-card :loading="$toggler.loadingPassword">
      <template #header><h3>Смена пароля</h3></template>
      <div class="items">
        <n-input title="Старый пароль" type="password" v-bind="$inputs.input('oldPassword', 'password')" />
        <n-input title="Новый пароль" type="password" v-bind="$inputs.input('password', 'password')" />
        <n-input title="Повторите новый пароль" type="password" v-bind="$inputs.input('passwordConfirm', 'password')" />
      </div>
      <n-items>
        <n-button v-if="$inputs.editable('password')" color="success" @click="savePassword">Сохранить новый пароль</n-button>
      </n-items>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageUserIndex',
  data: () => ({}),
  created() {
    this.$inputs.init(this.$store.state.app.user, false)
    this.$inputs.init({
      oldPassword: '',
      password: '',
      passwordConfirm: '',
    }, true, 'password')
    this.$inputs.rules({
      oldPassword: [ 'required', ],
      password: [ 'required', ],
    }, 'password')
  },
  methods: {
    save() {
      if (this.$inputs.check()) {
        this.$toggle('loading', true)
        setTimeout(() => {
          this.$inputs.edit(false)
          this.$toggle('loading', false)
        }, 1500)
      }
    },
    savePassword() {
      if (this.$inputs.check(undefined, 'password')) {
        this.$nextTick(() => {
          if (this.$inputs.get('oldPassword', 'password') !== '123456') {
            this.$set(this.inputs_errors, 'password', {
              oldPassword: [ 'Неверный пароль', ],
            })
            return
          }
          if (this.$inputs.get('password', 'password') !== this.$inputs.get('passwordConfirm', 'password')) {
            this.$set(this.inputs_errors, 'password', {
              passwordConfirm: [ 'Пароли не совпадают', ],
            })
            return
          }
          this.$toggle('loadingPassword', true)
          setTimeout(() => {
            this.$inputs.edit(false)
            this.$toggle('loadingPassword', false)
            this.$inputs.reset('password')
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
