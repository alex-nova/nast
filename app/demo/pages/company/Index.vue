<template>
  <div class="page-company-index">
  
    <n-card :loading="$toggler.loading">
      <div class="items">
        <n-input title="Название" v-bind="$inputs.input('name')" />
        <n-input title="ИИН / БИН" v-bind="$inputs.input('bin')" />
        <n-input title="Описаие" v-bind="$inputs.input('description')" />
        <n-input title="Адрес" v-bind="$inputs.input('address')" />
      </div>
      <n-items>
        <n-button v-if="!$inputs.editable()" color="primary" @click="$inputs.edit">Редактировать</n-button>
        <n-button v-if="$inputs.editable()" color="success" @click="save">Сохранить</n-button>
        <n-button v-if="$inputs.editable()" flat @click="() => { $inputs.reset(); $inputs.edit() }">Отмена</n-button>
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
      this.$inputs.init(request.data, false)
    })
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
