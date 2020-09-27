<template>
  <n-modal class="modal-section-edit" :loading="$var('load')" @close="$emit('close')">
    <h3>Редактировать раздел</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Тип" :data="types" :value.sync="type" />
        <n-input title="Название" v-bind="$form.input('title')" />
        <n-input v-if="type && type.value === 'object'" title="Адрес объекта" v-bind="$form.input('address')" />
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
  data: () => ({
    types: [
      { value: 'object', title: 'Объект', },
      { value: 'section', title: 'Раздел', },
      { value: 'construction', title: 'Конструкция', },
    ],
    type: null,
  }),
  created() {
    this.$form.init({
      title: this.model.title,
      address: this.model.address,
      planStartedAt: $app.date.format(this.model.planStartedAt),
      planEndedAt: $app.date.format(this.model.planEndedAt),
    })
    this.type = $n.find(this.types, [ 'value', this.model.type, ])
  },
  methods: {
    submit() {
      this.$var('load', true)
      const data = {
        ...this.$form.get(),
        type: this.type.value,
      }
      $api.iq.sections.edit(this.model.id, data).then((response) => {
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
