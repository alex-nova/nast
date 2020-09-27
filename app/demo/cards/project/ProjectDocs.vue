<template>
  <div class="tab-info">
    <n-loader :loading="$var('loading')" />
    <n-divide class="tools">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить файл</n-button></div>
    </n-divide>
    <n-table :columns="columns" :data="data" :loading="$var('load')">
      <template #createdAt="{item}">
        16.01.2020
      </template>
      <template #type="{item}">
        {{ getType(item.type).name }}
      </template>
      <template #tools>
        <n-link to="https://cms.nova.st/files/322.doc" type="external" target="_blank">Скачать</n-link>
      </template>
    </n-table>
  
    <n-modal v-if="$var('add')" @close="$var('add', false)">
      <n-items>
        <n-select title="Объект" :data="$d.get.objects(1)" :value.sync="object" style="width: 100%;" option-title="name" selected-title="name" item-value="id" />
        <n-select title="Вид работ" :data="$d.get.types()" :value.sync="type" style="width: 100%;" option-title="name" selected-title="name" item-value="id" />
        <n-input title="Название файла" v-bind="$form.input('name')" />
        <n-input title="Дополнительная информация" v-bind="$form.input('desc')" />
        <n-upload title="Загрузить файл" v-bind="$form.input('file')" />
        <n-button color="primary" wide @click="submit">Добавить файл</n-button>
      </n-items>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'TabProjectDocs',
  props: [ 'model', 'form', ],
  data() {
    return {
      data: [],
      object: {},
      type: {},
      columns: [
        { title: 'Название документа', name: 'name', },
        { title: 'Дата добавления', name: 'createdAt', },
        { title: 'Вид работ', name: 'type', },
        { title: 'Объект', name: 'object', },
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
    
    $d.reload.objects(1)
    $d.reload.types()
    $d.reload.projectFiles2(this.$route.params.id)
  },
  methods: {
    getType(id) {
      const types = $d.get.types()
      if (types) {
        return $n.find(types, [ 'id', id, ])
      }
      return {}
    },
    submit() {
      const data = {
        ...this.$form.get(),
        type: this.type.id,
        object: this.object.name,
      }
      $api.iq.docs2.post(this.$route.params.id, data).then((response) => {
        $d.reload.projectFiles2(this.$route.params.id)
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
