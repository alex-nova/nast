<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить элемент в {{ parent.name }}</h3>
    <n-form @submit="submit">
      <n-items>
        <n-select title="Тип" :data="types" :value.sync="type" />
        <n-input title="Название" v-bind="$form.input('name')" />
        <n-button wide color="primary" type="submit">Добавить</n-button>
      </n-items>
    </n-form>
  </n-modal>
</template>

<script>
export default {
  name: 'ModalAdd',
  props: [ 'project', 'parent', 'update', ],
  data: () => ({
    typeTitles: {
      project: 'Проект',
      section: 'Раздел',
    },
    types: [
      { value: 'object', title: 'Объект', },
      { value: 'section', title: 'Раздел', },
      { value: 'construction', title: 'Конструкция', },
    ],
    type: { value: 'section', title: 'Раздел', },
  }),
  created() {
    this.$form.init({
      name: '',
    })
  },
  methods: {
    submit() {
      this.$var('load', true)
      const data = {
        ...this.$form.get(),
        type: this.type.value,
        projectId: this.project.id,
        parentId: this.parent._model === 'section' ? this.parent.id : undefined,
      }
      $api.sections.create(data).then((response) => {
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
  .modal-add {
  
  }
</style>
