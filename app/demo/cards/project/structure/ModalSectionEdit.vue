<template>
  <n-modal class="modal-section-edit" :loading="$var('load')" @close="$emit('close')">
    <h3>Редактировать раздел</h3>
    <n-form @submit="submit">
      <n-items>
        <n-input title="Название" v-bind="$form.input('name')" />
        <n-button wide color="primary" type="submit">Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalSectionEdit',
  props: [ 'model', 'update', ],
  created() {
    this.$form.init({
      name: this.model.name,
    })
  },
  methods: {
    submit() {
      this.$var('load', true)
      $api.sections.edit(this.model.id, this.$form.get()).then((response) => {
        this.$emit('close')
        this.update()
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-section-edit {
  
  }
</style>
