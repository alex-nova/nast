<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить элемент в {{ typeTitles[model.itemType] }}</h3>
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
  props: [ 'model', 'update', ],
  data: () => ({
    typeTitles: {
      project: 'Проект',
      section: 'Раздел',
    },
    type: {},
  }),
  computed: {
    types() {
      return this.model.itemType === 'section' ? [
        { value: 'section', title: 'Подраздел', },
      ] : [
        { value: 'project', title: 'Объект', },
        { value: 'section', title: 'Раздел', },
      ]
    },
  },
  watch: {
    type(type) {
      if (type.value === 'project') {
        this.$form.init({
          name: '',
        })
      } else {
        this.$form.init({
          name: '',
          projectId: this.model.id,
          parentId: this.model.itemType === 'section' ? this.model.id : undefined,
        })
      }
    },
  },
  methods: {
    submit() {
      this.$var('load', true)
      let api
      if (this.type.value === 'project') {
        api = $api.projects.createSub(this.model.id, this.$form.get())
      } else {
        api = $api.sections.create(this.$form.get())
      }
      
      api.then((response) => {
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
