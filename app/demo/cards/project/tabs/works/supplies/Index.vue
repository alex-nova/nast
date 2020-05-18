<template>
  <n-modal class="modal-supplies" @close="$emit('close')">
    <h3>{{ work.name }}: Материалы</h3>
    
    <n-divide class="table-tools">
      <div></div>
      <n-button @click="() => $var('add', true)">Добавить</n-button>
    </n-divide>
    <n-table :data="data" :columns="columns" :loading="$var('load')">
      <template #count="{item}">
        {{ item.done }}
        из
        {{ item.count }}
        <template v-if="item.unit">
          {{ item.unit }}
        </template>
      </template>
      <template #tools="{item}">
        <n-button @click="() => $var('edit', item)" icon="edit" flat round />
      </template>
    </n-table>
    
    <n-divide style="margin-top: 20px;">
      <div></div>
      <n-button @click="$emit('close')">Закрыть</n-button>
    </n-divide>
  
    <modal-add v-if="$var('add')" :work="work" :submit="load" @close="$var('add', false)" />
    <modal-edit v-if="$var('edit')" :material="$var('edit')" :work="work" :submit="load" @close="$var('edit', false)" />
  </n-modal>
</template>

<script>
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'

export default {
  name: 'ModalSupplies',
  components: { ModalEdit, ModalAdd, },
  props: [ 'work', ],
  data: () => ({
    data: [],
    columns: [
      { name: 'name', title: 'Материал', },
      { name: 'count', title: 'Расход', },
      { name: 'tools', title: '', },
      { name: '', title: '', },
    ],
  }),
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.works.supplies.getByWork(this.work.id).then((result) => {
        this.data = result.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-supplies {
    &::v-deep {
      &>.n-wrapper {
        width: 700px;
        left: calc(50% - 350px);
      }
    }
  }
</style>
