<template>
  <n-card class="block-works">
    <template #header>
      <h3>Материал</h3>
    </template>
    <n-items>
      <div class="work">
        <n-select title="Материал" :value.sync="material" :data="structure" item-value="id" option-title="title" selected-title="title" inline>
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
        <template v-if="material">
          <n-input class="count" :value="materialCount" title="Объем" inline @input="changeMaterialCount" />
          <span class="unit">{{ material.unit }}</span>
        </template>
      </div>
    </n-items>
  </n-card>
</template>

<script>
export default {
  name: 'BlockMaterials',
  props: [ 'projectId', ],
  data: () => ({
    structure: [],
    material: {},
    materialCount: 0,
  }),
  mounted() {
    this.change()
    this.loadStructure()
  },
  methods: {
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
      $api.my.structureTree(this.projectId, true, true).then((response) => {
        this.structure = response.data.content
      }).finally(() => {
        this.$var('loadStructure', false)
      })
    },
    changeMaterialCount(value) {
      this.materialCount = value
      this.change()
    },
    change() {
      this.$emit('change', { id: this.material.id, count: this.materialCount, })
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
