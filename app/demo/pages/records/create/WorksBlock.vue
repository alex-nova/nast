<template>
  <n-card class="block-works">
    <template #header>
      <h3>Расходы</h3>
    </template>
    <n-items>
      <n-select title="Вид работ" :data="workTypes" :value.sync="workType" item-value="id" option-title="name" selected-title="name" />
      
      <div v-if="workType" class="materials">
        <n-select title="Работа" :value.sync="work" :data="structure" item-value="id" option-title="name" selected-title="name" inline />
        <template v-if="work">
          <n-input class="count" :value="workCount" title="Объем работ" inline @input="changeWorkCount" />
          <span class="unit">{{ work.unit }}</span>
        </template>
      </div>
      
      <template v-if="work">
        <n-select title="Материалы" :value.sync="selectedSupplies" :data="supplies" item-value="id" option-title="name" selected-title="name" />
        <div v-for="(value, i) in selectedSupplies" :key="i" class="materials">
          <template v-if="selectedSupplies[i]">
            <n-input title="Материал" :value="value.name" text inline />
            <n-input class="count" :value="suppliesCount[value.id]" title="Количество" inline @input="(v) => changeSupplyCount(value.id, v)" />
            <span class="unit">{{ selectedSupplies[i].unit }}</span>
          </template>
        </div>
      </template>
    </n-items>
  </n-card>
</template>

<script>
export default {
  name: 'BlockWorks',
  props: [ 'projectId', ],
  data: () => ({
    workTypes: [],
    workType: null,
    structure: [],
    work: null,
    workCount: undefined,
    supplies: [],
    selectedSupplies: [],
    suppliesCount: {},
  }),
  watch: {
    workType(value) {
      if (value) {
        this.loadStructure()
      }
      this.work = null
    },
    work(value) {
      this.change()
      if (value) {
        this.loadSupplies()
      }
      this.supplies = []
      this.selectedSupplies = []
    },
  },
  mounted() {
    this.change()
    this.loadWorkTypes()
  },
  methods: {
    loadWorkTypes() {
      this.$var('loadWorkTypes', false)
      $api.works.types.get().then((response) => {
        this.workTypes = response.data.content
      }).finally(() => {
        this.$var('loadWorkTypes', false)
      })
    },
    loadStructure() {
      this.$var('loadStructure', false)
      $api.my.structureTree(this.projectId, true).then((response) => {
        this.structure = response.data.content
      }).finally(() => {
        this.$var('loadStructure', false)
      })
    },
    loadSupplies() {
      this.$var('loadSupplies', false)
      $api.works.supplies.getByWork(this.work.id).then((response) => {
        this.supplies = response.data.content
      }).finally(() => {
        this.$var('loadSupplies', false)
      })
    },
    changeWorkCount(value) {
      this.workCount = value
      this.change()
    },
    changeSupplyCount(id, value) {
      this.suppliesCount[id] = value
      this.change()
    },
    change() {
      let result = {
        work: null,
        supplies: [],
      }
      if (this.work) {
        result = {
          work: { id: this.work.id, count: this.workCount, },
          supplies: $n.reduce(this.suppliesCount, (result, value, key) => {
            result.push({ id: key, count: value, })
            return result
          }, []),
        }
      }
      this.$emit('change', result)
    },
  },
}
</script>

<style lang="scss" scoped>
  .block-works {
  
    .materials {
      width: 100%;
      .count {
        margin: 0 5px 0 20px;
        width: 100px;
      }
      .delete {
        float: right;
        font-size: .8em;
        margin: 1.6em 0 0 0;
        cursor: pointer;
      }
    }
  }
</style>
