<template>
  <div class="tab-info">
    <n-loader :loading="$var('loading')" />
    <n-divide class="tools">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить материал</n-button></div>
    </n-divide>
    <n-table :columns="columns" :data="$d.materials.get() || []" :loading="$d.materials.loading()">
    </n-table>
    
    <n-modal v-if="$var('add')" @close="$var('add', false)">
      <n-items>
        <n-input title="Название" v-bind="$form.input('name')" />
        <n-input title="Ед. измерения" v-bind="$form.input('unit')" />
        <n-input title="Количество" v-bind="$form.input('count')" />
        <n-input title="Дополнительная информация" v-bind="$form.input('desc')" />
        <n-button color="primary" wide @click="submit">Добавить материал</n-button>
      </n-items>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'TabMaterials',
  props: [ 'model', 'form', ],
  data() {
    return {
      data: [],
      columns: [
        { title: 'Название', name: 'name', },
        { title: 'Ед. измерения', name: 'unit', },
        { title: 'Количество', name: 'count', },
        { title: 'Дополнительная информация', name: 'desc', },
      ],
    }
  },
  created() {
    this.$form.init({
      name: '',
      desc: '',
    })
    $d.materials.reload()
  },
  methods: {
    submit() {
      const data = {
        ...this.$form.get(),
      }
      $api.projects.materials.post(data).then((response) => {
        $d.materials.reload()
        this.$var('add', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-info {
    font-size: .9em;
    .tools {
      margin-bottom: 10px;
    }
  }
</style>
