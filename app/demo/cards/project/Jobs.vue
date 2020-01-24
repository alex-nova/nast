<template>
  <div class="tab-info">
    <n-loader :loading="$var('loading')" />
    <n-divide class="tools">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить работу</n-button></div>
    </n-divide>
    <n-table :columns="columns" :data="$d.get.works() || []" :loading="$d.loading.works()">
      <template #type="{item}">
        {{ getType(item.type).name }}
      </template>
    </n-table>
  
    <n-modal v-if="$var('add')" @close="$var('add', false)">
      <n-items>
        <n-select title="Объект" :data="$d.get.objects(1)" :value.sync="object" style="width: 100%;" option-title="name" selected-title="name" item-value="id" />
        <n-select title="Вид работ" :data="$d.get.types()" :value.sync="type" style="width: 100%;" option-title="name" selected-title="name" item-value="id" />
        <n-input title="Название" v-bind="$form.input('name')" />
        <n-button color="primary" wide @click="submit">Добавить работу</n-button>
      </n-items>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'TabJobs',
  props: [ 'model', 'form', ],
  data() {
    return {
      data: [],
      object: {},
      type: {},
      columns: [
        { title: 'Название', name: 'name', },
        { title: 'Объект', name: 'object', },
        { title: 'Вид работы', name: 'type', },
      ],
    }
  },
  created() {
    this.$form.init({
      name: '',
      desc: '',
    })
    $d.reload.objects(1)
    $d.reload.types()
    $d.reload.works()
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
      $api.projects.works.post(data).then((response) => {
        $d.reload.works()
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
