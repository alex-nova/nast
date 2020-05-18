<template>
  <div class="page-company-index">
    <n-card>
      <n-divide class="tools" style="margin-bottom: 10px;">
        <div></div>
        <div><n-button icon="plus" @click="$var('create', true)">Создать компанию</n-button></div>
      </n-divide>
      <n-table :data="$d.get('companies')" :loading="$d.loading('companies')" :columns="columns">
        <template #tools="{item}">
          <n-link :to="{ query: { modal: 'company', id: item.id, },}"><n-button icon="pen" flat round /></n-link>
        </template>
      </n-table>
    </n-card>
    
    <n-modal v-if="$var('create')" @close="$var('create', false)">
      <form @submit="create">
        <n-items>
          <n-input title="БИН" v-bind="$form.input('bin')" />
          <n-input title="Название" v-bind="$form.input('title')" />
          <n-input title="Описание" v-bind="$form.input('description')" />
          <n-input title="Адрес" v-bind="$form.input('address')" />
          <n-input title="Моя должность в компании" v-bind="$form.input('position')" />
          <n-button type="submit" wide color="primary">Создать</n-button>
        </n-items>
      </form>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'PageCompanyIndex',
  data: () => ({
    columns: [
      { name: 'bin', title: 'БИН', },
      { name: 'title', title: 'Название', },
      { name: 'description', title: 'Описание', },
      { name: 'address', title: 'Адрес', },
      { name: 'tools', title: '', },
    ],
  }),
  load(router) {
    return {
      companies: {
        api: $api.my.companies(),
        tag: 'companies',
      },
    }
  },
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
  methods: {
    create(e) {
      e.preventDefault()
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
.page-company-index {

}
</style>
