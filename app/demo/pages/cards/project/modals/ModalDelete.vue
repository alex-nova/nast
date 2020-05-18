<template>
  <n-modal class="modal-project-delete" :loading="$var('load')" @close="$emit('close')">
    <h3>Вы действительно хотите удалить проект?</h3>
    <n-form @submit="s_submit">
      <n-button wide color="danger" type="submit">Удалить</n-button>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalProjectDelete',
  props: [ 'model', 'submit', ],
  methods: {
    s_submit() {
      this.$var('load', true)
      $api.projects.delete(this.model.id).then((response) => {
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
  .modal-project-delete {
  
  }
</style>
