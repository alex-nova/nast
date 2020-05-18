<template>
  <n-modal class="modal-edit" :loading="$var('load')" @close="$emit('close')">
    <h3>Редактировать материал</h3>
    <n-form @submit="s_submit">
      <n-items>
        <n-input title="Название" v-bind="$form.input('name')" />
        <n-input title="Количество" v-bind="$form.input('count')" type="number" />
        <n-input title="Ед. измерения" v-bind="$form.input('unit')" />
        <n-button color="primary" wide type="submit">Сохранить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalEdit',
  props: [ 'material', 'work', 'submit', ],
  created() {
    this.$form.init({
      name: this.material.name,
      count: this.material.count,
      unit: this.material.unit,
    })
  },
  methods: {
    s_submit() {
      this.$var('load', true)
      $api.works.supplies.edit(this.material.id, this.$form.get()).then(() => {
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
  .modal-edit {
  
  }
</style>
