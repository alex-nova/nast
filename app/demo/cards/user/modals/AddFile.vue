<template>
  <n-modal class="card-user-add-file" :loading="$var('loading')" @close="$emit('close')">
    <h3>Добавить документ</h3>
    <n-form @submit="submit">
      <n-items>
        <n-upload title="Файл" :value.sync="file" />
        <n-input title="Номер" v-bind="$form.input('number')" />
        <n-input title="Название" v-bind="$form.input('title')" />
        <n-input title="Тип" v-bind="$form.input('type')" />
        <n-input title="Дата выдачи" v-bind="$form.input('startedAt')" />
        <n-input title="Дата окончания" v-bind="$form.input('endedAt')" />
        <n-button color="primary" wide type="submit">Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'CardUserAddFile',
  props: [ 'modelId', ],
  data: () => ({
    file: null,
  }),
  created() {
    this.$form.init({
      number: undefined,
      title: undefined,
      type: undefined,
      startedAt: undefined,
      endedAt: undefined,
    })
  },
  methods: {
    submit() {
      this.$var('loading', true)
      $api.files.create({ file: this.file, }).then((response) => {
        const data = {
          fileId: response.data.content.id,
          ...this.$form.get(),
        }
        $api.users.documents.create(this.modelId, data).then((response) => {
          this.$emit('close')
        }).finally(() => {
          this.$var('loading', false)
        })
      }).catch(() => {
        this.$var('loading', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .card-user-add-file {
  }
</style>
