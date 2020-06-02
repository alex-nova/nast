<template>
  <div class="tab-partners" style="position: relative">
    <n-loader :loading="$var('load')" />
    
    <n-divide class="table-tools">
      <n-button v-if="showAll" @click="showAll = false">Показать только мои подряды</n-button>
      <n-button v-else @click="showAll = true">Показать всех подрядчиков</n-button>
      <n-button @click="() => this.$var('add', true)">Создать подряд</n-button>
    </n-divide>
    
    <n-table :data="data" :columns="columns">
      <template #company="{item}">
        {{ item.company.title }} <span style="opacity: .8;font-size: .8em">[{{ item.company.bin }}]</span>
      </template>
      <template #createdAt="{item}">
        {{ $app.date.format(item.createdAt) }}
      </template>
      <template #info="{item}">
        <n-button icon="eye" @click="$var('edit', item)" />
      </template>
    </n-table>
    
    <modal-add v-if="$var('add')" :project="project" @submit="add" @close="$var('add', false)" />
    <modal-edit v-if="$var('edit')" :partner="$var('edit')" :project="project" :submit="load" @close="$var('edit', false)" />
  </div>
</template>

<script>
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'

export default {
  name: 'TabPartners',
  components: { ModalAdd, ModalEdit, },
  props: [ 'project', ],
  data() {
    return {
      showAll: true,
      data: [],
      columns: [
        { name: 'company', title: 'Компания', },
        { name: 'createdAt', title: 'Дата назначения', },
        { name: 'info', title: 'Контракты', },
      ],
    }
  },
  watch: {
    showAll() {
      this.$nextTick(() => {
        this.load()
      })
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      const api = $api.projects.partners.get(this.project.id)
      if (!this.showAll) {
        api.filter({ delegator: $app.store.getter('app.company').id, })
      }
      api.then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    add(partner) {
      this.$var('edit', partner)
      setTimeout(() => {
        this.load()
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-partners {
    
    .work-types {
      font-size: .9em;
      line-height: 1;
      
      & > div {
        padding: 4px 0;
      }
    }
  }
</style>
