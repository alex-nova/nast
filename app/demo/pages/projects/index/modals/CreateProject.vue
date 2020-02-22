<template>
  <n-modal class="create-project" :loading="$var('loading')" @close="$emit('close')">
    <h3>Создать проект</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Заказчик" :data="companies" :value.sync="company" item-value="id" option-title="name" selected-title="name" />
        <n-input title="Название" v-bind="$form.input('name')" />
        <n-input title="Адрес" v-bind="$form.input('address')" />
        <n-input title="Описание" v-bind="$form.input('description')" />
        <n-input title="Начало строительства" v-bind="$form.input('startedAt')" />
        <n-input title="Окончание строительства" v-bind="$form.input('endedAt')" />
        <n-button color="primary" wide type="submit">Создать</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'CreateProject',
  data: () => ({
    companies: [],
    company: {},
  }),
  created() {
    this.$form.init({
      name: undefined,
      address: undefined,
      description: undefined,
      startedAt: undefined,
      endedAt: undefined,
    })
    this.loadCompanies()
  },
  methods: {
    loadCompanies() {
      this.$var('loading', true)
      return $api.temp.myAdminCompanies().then((response) => {
        this.companies = response.data.content
      }).finally(() => {
        this.$var('loading', false)
      })
    },
    submit() {
      this.$var('loading', true)
      $api.projects.create({ companyId: this.company.id, ...this.$form.get(), }).then((response) => {
        this.$emit('close')
      }).finally(() => {
        this.$var('loading', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .create-project {
  }
</style>
