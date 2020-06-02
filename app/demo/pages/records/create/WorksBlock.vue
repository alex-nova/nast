<template>
  <n-card class="block-works">
    <template #header>
      <h3>Расходы</h3>
    </template>
    <n-items>
      <div class="work">
        <n-select title="Работа" :value.sync="work" :data="structure" item-value="id" option-title="title" selected-title="title" inline>
          <template #group="{item}">
            <span>
              <span class="sub">[{{ getTypeTitle(item) }}]</span>
              {{ item.title }}
            </span>
          </template>
          <template #item="{item}">
            <span>
              <span class="sub">[{{ getTypeTitle(item) }}]</span>
              {{ item.title }}
            </span>
          </template>
        </n-select>
        <template v-if="work">
          <n-input class="count" :value="workCount" title="Объем работ" inline @input="changeWorkCount" />
          <span class="unit">{{ work.unit }}</span>
        </template>
      </div>
      
      <template v-if="work">
        <div v-for="(item, i) in supplies" :key="i" class="materials">
          <n-input :value="item.title" text inline />
          <n-input class="count" :value="suppliesCount[item.id]" title="Количество" inline @input="(v) => changeSupplyCount(item.id, v)" />
          <span class="unit">{{ item.unit }}</span>
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
    structure: [],
    work: null,
    workCount: 0,
    supplies: [],
    suppliesCount: {},
  }),
  watch: {
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
    this.loadStructure()
  },
  methods: {
    getSupplyCount(supply) {
      return supply.using.count * (this.workCount / this.work.count)
    },
    getTypeTitle(item) {
      if (item._model === 'work') {
        return 'Работа'
      } else if (item._model === 'supply') {
        const types = {
          material: 'Материал',
          equipment: 'Оборудование',
          construction: 'Конструкция',
          shipping: 'Перевозка груза',
          mechanism: 'Механизм',
          work: 'Затраты труда строителей',
        }
        return types[item.type]
      } else {
        const types = {
          object: 'Объект',
          section: 'Раздел',
          construction: 'Конструкция',
        }
        return types[item.type]
      }
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
      this.suppliesCount = {}
      $api.projects.works.supplies.get(this.projectId, this.work.id).then((response) => {
        this.supplies = response.data.content
        this.supplies.map((item) => {
          this.suppliesCount[item.id] = this.getSupplyCount(item)
        })
      }).finally(() => {
        this.$var('loadSupplies', false)
      })
    },
    changeWorkCount(value) {
      this.workCount = value
      this.supplies.map((item) => {
        this.suppliesCount[item.id] = this.getSupplyCount(item)
      })
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
  
    .work {
      --n-input-width: 500px;
      .count {
        margin: 0 5px 0 20px;
        width: 100px;
      }
    }
    
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
