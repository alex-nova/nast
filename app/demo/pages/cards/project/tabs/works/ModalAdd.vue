<template>
  <n-modal class="modal-add" :loading="$var('load')" @close="$emit('close')">
    <h3>Добавить работу</h3>
    <n-form @submit="s_submit">
      <n-items>
        <n-select title="Элемент структуры" :data="structure" :value.sync="section" item-value="id" option-title="name" selected-title="name" />
        <n-select title="Вид работ" :data="workTypes" :value.sync="type" item-value="id" option-title="name" selected-title="name" />
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
  name: 'ModalAdd',
  props: [ 'project', 'submit', ],
  data: () => ({
    structure: [],
    section: null,
    workTypes: [],
    type: null,
  }),
  created() {
    this.loadData()
    this.$form.init()
  },
  methods: {
    loadData() {
      this.$var('load', true)
      const promises = [
        $api.my.structureTree(this.project.id),
        $api.works.types.get(),
      ]
      Promise.all(promises).then((result) => {
        this.structure = result[0].data.content
        this.workTypes = result[1].data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    s_submit() {
      this.$var('load', true)
      const data = {
        ...this.$form.get(),
        typeId: this.type.id,
        projectId: this.project.id,
        sectionId: this.section.id,
      }
      $api.works.create(data).then((response) => {
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
  .modal-add {
  
  }
</style>
