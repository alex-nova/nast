<template>
  <div class="page-user-index">
    <n-card :loading="$toggler.loading">
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
  </div>
</template>

<script>
export default {
  name: 'PageUserIndex',
  data: () => ({
  }),
  mounted() {
    this.$toggle('loading', true)
    const relations = {
      company: { fields: [ 'id', 'title', ], },
    }
    $api.users.get(this.$route.params.id).with(relations).then((request) => {
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
.page-user-index {
  
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
