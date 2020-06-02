<template>
  <div class="tab-participants" style="position: relative">
    <n-loader :loading="$var('load')" />
    <n-divide class="table-tools">
      <div>
        <n-button v-if="showAll" @click="showAll = false">Показать сотрудников моей компании</n-button>
        <n-button v-else @click="showAll = true">Показать всех сотрудников</n-button>
      </div>
      <n-button @click="() => this.$var('add', true)">Добавить</n-button>
    </n-divide>
    
    <n-table :data="data" :columns="columns">
      <template #participant="{item}">
        {{ item.user.fullName }} <span style="opacity: .8;font-size: .8em">[{{ item.user.iin }}]</span>
      </template>
      <template #company="{item}">
        {{ item.company.title }} <span style="opacity: .8;font-size: .8em">[{{ item.company.bin }}]</span>
      </template>
      <template #createdAt="{item}">
        {{ $app.date.format(item.createdAt) }}
      </template>
      <template #rights="{item}">
        <n-button flat round icon="eye" @click="$var('edit', item)" />
      </template>
    </n-table>
    
    <modal-add v-if="$var('add')" :project="project" @submit="add" @close="$var('add', false)" />
    <modal-edit v-if="$var('edit')" :participant="$var('edit')" :project="project" @close="$var('edit', false)" />
  </div>
</template>

<script>
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'

export default {
  name: 'TabParticipants',
  components: { ModalEdit, ModalAdd, },
  props: [ 'project', ],
  data() {
    return {
      showAll: false,
      data: [],
    }
  },
  computed: {
    columns() {
      const columns = [
        { name: 'participant', title: 'Сотрудник', },
        { name: 'company', title: 'Компания', },
        { name: 'role', title: 'Должность на проекте', },
        { name: 'createdAt', title: 'Дата назначения', },
      ]
      if (!this.showAll && !this.$var('load')) {
        columns.push({ name: 'rights', title: '', })
      }
      return columns
    },
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
      const api = $api.projects.participants.get(this.project.id)
      if (!this.showAll) {
        api.filter({ company: $app.store.getter('app.company').id, })
      }
      api.then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    add(worker) {
      this.load()
      this.$var('edit', worker)
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-participants {
    
    .work-types {
      font-size: .9em;
      line-height: 1;
      & > div {
        padding: 4px 0;
      }
    }
  }
</style>
