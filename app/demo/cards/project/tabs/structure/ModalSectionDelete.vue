<template>
  <n-modal class="modal-section-delete" :loading="$var('load')" @close="$emit('close')">
    <h3>Вы действительно хотите удалить раздел?</h3>
    <n-form @submit="s_submit">
      <n-button wide color="danger" type="submit">Удалить</n-button>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalSectionDelete',
  props: [ 'model', 'submit', ],
  methods: {
    s_submit() {
      this.$var('load', true)
      $api.sections.delete(this.model.id).then((response) => {
        this.$emit('close')
        this.submit()
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-section-delete {
  
  }
</style>
