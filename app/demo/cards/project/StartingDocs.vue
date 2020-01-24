<template>
  <div class="tab-info">
    <!--    <n-loader :loading="$d.loading.projectFiles($route.params.id)" />-->
    <n-divide class="tools">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить файл</n-button></div>
    </n-divide>
    <n-table :columns="columns" :data="$d.get.projectFiles($route.params.id) || []" :loading="$d.loading.projectFiles($route.params.id)">
      <template #name="{item}">
        {{ item.type === 1 ? item.name : types[item.type - 1].title }}
      </template>
      <template #createdAt="{item}">
        16.01.2020
      </template>
      <template #tools>
        <n-link to="https://cms.nova.st/files/322.doc" type="external" target="_blank">Скачать</n-link>
      </template>
    </n-table>
  
    <n-modal v-if="$var('add')" @close="$var('add', false)">
      <n-items>
        <n-select title="Тип файла" :data="types" :value.sync="type" style="width: 100%;" />
        <n-input v-if="type.value === 1" title="Название файла" v-bind="$form.input('name')" />
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
        { title: 'Уведомление о начале СМР', value: 2, },
        { title: 'Акт геодезической разбивки', value: 3, },
        { title: 'Акт проверки посадки здания', value: 4, },
        { title: 'Государственный акт', value: 5, },
        { title: 'Заключение экспертизы по проекту', value: 6, },
        { title: 'Другое', value: 1, },
      ],
      type: {},
      data: [],
      columns: [
        { title: 'Название документа', name: 'name', },
        { title: 'Дата добавления', name: 'createdAt', },
        { title: 'Дополнительная информация', name: 'desc', },
        { title: 'Скачать файл', name: 'tools', },
      ],
    }
  },
  created() {
    this.$form.init({
      name: '',
      desc: '',
      file: null,
    })
  
    $d.reload.projectFiles(this.$route.params.id)
  },
  methods: {
    submit() {
      const data = {
        ...this.$form.get(),
        type: this.type.value,
        typeName: this.type.title,
      }
      $api.projects.docs.post(this.$route.params.id, data).then((response) => {
        $d.reload.projectFiles(this.$route.params.id)
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
