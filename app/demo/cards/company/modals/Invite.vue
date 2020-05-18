<template>
  <n-modal class="card-company-invite" :loading="$var('loading')" @close="$emit('close')">
    <h3>Добавить сотрудника</h3>
    <n-form @submit="submit">
      <n-items>
        <n-input title="ИИН" v-bind="$form.input('iin')" />
        <n-input title="ФИО" v-bind="$form.input('fullName')" />
        <n-input title="Должность" v-bind="$form.input('position')" />
        <n-input title="E-mail" v-bind="$form.input('email')" />
        <n-button color="primary" wide type="submit">Отправить приглашение</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'CardCompanyInvite',
  props: [ 'companyId', ],
  created() {
    this.$form.init({
      iin: '',
      email: '',
      position: '',
      fullName: '',
    })
  },
  methods: {
    submit() {
      this.$var('loading', true)
      $api.companies.workers.invite(this.companyId, this.$form.get()).then((response) => {
        this.$emit('submit')
        this.$emit('close')
      }).finally(() => {
        this.$var('loading', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .card-company-invite {
  }
</style>
