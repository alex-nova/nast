<template>
  <n-modal class="modal-section-edit" :loading="$var('load')" @close="$emit('close')">
    <h3>Редактировать даты</h3>
    <n-form @submit="submit">
      <n-items>
        <n-input title="Начало работ по графику" v-bind="$form.input('planStartedAt')" />
        <n-input title="Окончание работ по графику" v-bind="$form.input('planEndedAt')" />
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
      planStartedAt: $app.date.format(this.model.planStartedAt),
      planEndedAt: $app.date.format(this.model.planEndedAt),
    })
    this.type = $n.find(this.types, [ 'value', this.model.type, ])
  },
  methods: {
    submit() {
      this.$var('load', true)
      $api.iq.sections.edit(this.model.id, this.$form.get()).then((response) => {
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
