<template>
  <n-modal class="modal-add-version" :loading="$var('load')" @close="$emit('close')">
    <h3>Загрузить новую версию файла</h3>
    <n-form @submit="submit">
      <n-upload title="Файл" :value.sync="file" />
      <n-button color="primary" type="submit" wide style="margin-top: 10px;">Загрузить</n-button>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAddVersion',
  props: [ 'document', ],
  data: () => ({
    file: null,
  }),
  methods: {
    submit() {
      this.$var('load', true)
      $api.iq.documents.createVersion(this.document.id, this.file).then((response) => {
        this.$emit('close')
        this.$emit('submit')
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-add-version {
  
  }
</style>
