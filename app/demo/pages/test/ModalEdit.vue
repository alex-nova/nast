<template>
  <n-modal class="modal-edit" :loading="$var('load')" @close="$emit('close')">
    <h3>Редактировать</h3>
    <n-form @submit="submit">
      <n-items>
        <n-input title="Значение" v-bind="$form.input('value')" />
        
        <n-button color="primary" wide type="submit">Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalEdit',
  props: [ 'value', ],
  data: () => ({}),
  created() {
    this.$form.init({
      value: this.value,
    })
  },
  methods: {
    submit() {
      this.$emit('submit', this.$form.get('value'))
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-edit {
  
  }
</style>
