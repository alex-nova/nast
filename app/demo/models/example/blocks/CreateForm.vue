<template>
  <div class="company-create-form">
    <n-form @submit="create">
      <n-items>
        <n-input title="БИН" v-bind="$form.input('bin')" />
        <n-input title="Название" v-bind="$form.input('title')" />
        <n-input title="Описание" v-bind="$form.input('description')" />
        <n-input title="Адрес" v-bind="$form.input('address')" />
        <n-input title="Моя должность в компании" v-bind="$form.input('position')" />
        <n-button type="submit" wide color="primary">Создать</n-button>
      </n-items>
    </n-form>
  </div>
</template>

<script>
export default {
  name: 'CompanyCreateForm',
  methods: {
    created() {
      this.$form.init({
        bin: '',
        title: '',
        position: '',
        description: '',
        address: '',
      })
      this.$form.rules({
        bin: [ 'required', ],
        title: [ 'required', ],
        position: [ 'required', ],
      })
    },
    create() {
      if (this.$form.check()) {
        $api.companies.create(this.$form.get()).then((response) => {
          this.$d.reload('companies')
          this.$var('create', false)
          this.$form.reset()
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .company-create-form {
    
  }
</style>
