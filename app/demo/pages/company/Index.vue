<template>
  <div class="page-company-index">
    <n-card :loading="$toggler.loading">
      <div class="items">
        <n-input title="Название" v-bind="$form.input('name')" />
        <n-input title="ИИН / БИН" v-bind="$form.input('bin')" />
        <n-input title="Описаие" v-bind="$form.input('description')" />
        <n-input title="Адрес" v-bind="$form.input('address')" />
      </div>
      <n-items>
        <n-button v-if="!$form.editable()" color="primary" @click="$form.edit">Редактировать</n-button>
        <n-button v-if="$form.editable()" color="success" @click="save">Сохранить</n-button>
        <n-button v-if="$form.editable()" flat @click="() => { $form.reset(); $form.edit() }">Отмена</n-button>
      </n-items>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageCompanyIndex',
  data: () => ({
  }),
  mounted() {
    this.$toggle('loading', true)
    $api.companies.get(1).then((request) => {
      this.$toggle('loading', false)
      this.$form.init(request.data, false)
    })
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
  },
}
</script>

<style lang="scss" scoped>
.page-company-index {
  
  .items {
    &>* {
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
