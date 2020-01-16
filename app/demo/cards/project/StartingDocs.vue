<template>
  <div class="tab-info">
    <!--    <n-loader :loading="$d.projectFiles.loading($route.params.id)" />-->
    <n-divide class="tools">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить файл</n-button></div>
    </n-divide>
    <n-table :columns="columns" :data="$d.projectFiles.get($route.params.id) || []" />
  
    <n-modal v-if="$var('add')" @close="$var('add', false)">
      <n-items>
        <n-select title="Тип файла" :data="types" :value.sync="type" style="width: 100%;" />
        <n-input v-if="type.value === 3" title="Название файла" v-bind="$form.input('name')" />
        <n-input title="Дополнительная информация" v-bind="$form.input('desc')" />
        <n-upload title="Загрузить файл" v-bind="$form.input('file')" />
        <n-button color="primary" wide @click="submit">Добавить файл</n-button>
      </n-items>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'TabStartingDocs',
  props: [ 'model', 'form', ],
  data() {
    return {
      types: [
        { title: 'Уведомление о начале СМР', value: 1, },
        { title: 'Акт геодезической разбивки', value: 2, },
        { title: 'Другое', value: 3, },
      ],
      type: {},
      data: [],
      columns: [
        { title: 'Название документа', },
        { title: 'Дата добавления', },
        { title: 'Дополнительная информация', },
        { title: 'Скачать файл', },
      ],
    }
  },
  created() {
    this.$form.init({
      name: '',
      desc: '',
      file: null,
    })
  
    $d.projectFiles.reload(this.$route.params.id)
  },
  methods: {
    submit() {
      $debug.log($d.projectFiles.get($route.params.id))
      $api.projects.docs.post($route.params.id, this.$form.get()).then((response) => {
        $d.projectFiles.reload(this.$route.params.id)
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
