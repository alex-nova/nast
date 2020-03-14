<template>
  <div class="tab-contractors" style="position: relative">
    <n-loader :loading="$var('load')" />
    <n-button @click="add">Добавить</n-button>
    
    <template v-if="partners.length">
      <h3>Подрядчики</h3>
      <n-table :data="partners" :columns="partnersColumns">
        <template #contractor="{item}">
          {{ item.contractor.name }} <span style="opacity: .8;font-size: .8em">[{{ item.contractor.bin }}]</span>
        </template>
        <template #scope="{item}">
          {{ types[item.type] }} {{ item.scope.name }}
        </template>
        <template #types="{item}">
          <div class="work-types">
            <div v-for="type in item.types" :key="type.id">{{ type.name }}</div>
          </div>
        </template>
        <template #createdAt="{item}">
          {{ $app.date.format(item.createdAt) }}
        </template>
      </n-table>
    </template>
    
    <template v-if="workers.length">
      <h3>Подрядчики</h3>
      <n-table :data="workers" :columns="workersColumns">
        <template #contractor="{item}">
          {{ item.contractor.fullName }} <span style="opacity: .8;font-size: .8em">[{{ item.contractor.iin }}]</span>
        </template>
        <template #scope="{item}">
          {{ types[item.type] }} {{ item.scope.name }}
        </template>
        <template #types="{item}">
          <div class="work-types">
            <div v-for="type in item.types" :key="type.id">{{ type.name }}</div>
          </div>
        </template>
        <template #createdAt="{item}">
          {{ $app.date.format(item.createdAt) }}
        </template>
      </n-table>
    </template>
    
    <modal-add v-if="$var('add')" :project="project" :submit="load" @close="$var('add', false)" />
  </div>
</template>

<script>
import ModalAdd from './ModalAdd'
export default {
  name: 'TabContractors',
  components: { ModalAdd, },
  props: [ 'project', ],
  data() {
    return {
      partners: [],
      partnersColumns: [
        { name: 'contractor', title: 'Компания', },
        { name: 'scope', title: 'Область полномочий', },
        { name: 'types', title: 'Виды работ', },
        { name: 'createdAt', title: 'Дата назначения', },
      ],
      workers: [],
      workersColumns: [
        { name: 'contractor', title: 'Пользователь', },
        { name: 'scope', title: 'Область полномочий', },
        { name: 'types', title: 'Виды работ', },
        { name: 'createdAt', title: 'Дата назначения', },
      ],
      types: {
        project: 'Проект',
        section: 'Раздел',
      },
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      const promises = [
        $api.projects.delegations.get(this.project.id).with({ types: {}, }),
        $api.projects.participants.get(this.project.id).with({ types: {}, }),
        // $api.projects.participants.get(),
      ]
      Promise.all(promises).then((response) => {
        this.partners = response[0].data.content
        this.workers = response[1].data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    add() {
      this.$var('add', true)
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-contractors {
    
    .work-types {
      font-size: .9em;
      line-height: 1;
      & > div {
        padding: 4px 0;
      }
    }
  }
</style>
