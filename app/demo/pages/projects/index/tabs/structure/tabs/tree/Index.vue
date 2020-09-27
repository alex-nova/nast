<template>
  <div class="tab-info" style="position: relative">
    <n-loader :loading="$var('loading')" />
    
    <n-list :data="structure">
      <template #item="{ item, }">
        <div :class="['row', {danger: item.done > item.count},]">
          <div class="item">
            <div class="title">
              <div class="type">
                [{{ getTypeTitle(item._model, item.type) }}]
              </div>
              <div class="text">{{ item.title }}</div>
              <n-icon icon="pen" @click.stop="() => $var('edit', item)" />
            </div>
          </div>
          <div class="tools">
            <div class="done">
              {{ round(item.done) }} из {{ round(item.count) }}
              {{ item._model === 'section' ? 'ед.' : item.unit }}
            </div>
            <div class="percent">{{ item.count ? (Math.round(item.done / item.count * 100) + '%') : '0%' }}</div>
          </div>
        </div>
      </template>
      <template #tools="{ item, }">
        <span></span>
      </template>
    </n-list>
    
    <template v-if="!$n.size(structure) && !$var('loading')">
      Структура проекта пуста
    </template>
    
    <modal-add v-if="$var('add')" :project="project" :parent="$var('add')" :update="load" @close="$var('add', false)" />
    <modal-section-edit v-if="$var('edit')" :model="$var('edit')" :update="load" @close="$var('edit', false)" />
    <modal-section-delete v-if="$var('delete')" :model="$var('delete')" :submit="load" @close="$var('delete', false)" />
  </div>
</template>

<script>
import ModalAdd from './ModalAdd'
import ModalSectionEdit from './ModalSectionEdit'
import ModalSectionDelete from './ModalSectionDelete'

export default {
  name: 'TabStructure',
  components: { ModalSectionDelete, ModalSectionEdit, ModalAdd, },
  props: [ 'project', ],
  data() {
    return {
      structure: [],
      tools: [],
    }
  },
  watch: {
    project() {
      this.load()
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    round(value) {
      value = Number(value)
      if (isNaN(Number(value)) || value === 0) {
        return value
      }
      return value > 10 ? Math.round(value) : value.toFixed(2)
    },
    getTools(item) {
      return item._model === 'project' ? [
        { title: 'Добавить', value: 'add', },
      ] : [
        { title: 'Добавить', value: 'add', },
        { title: 'Редактировать', value: 'edit', },
        { title: 'Удалить', value: 'delete', },
      ]
    },
    getTypeTitle(modelType, type) {
      if (modelType === 'project') {
        return 'Проект'
      } else if (modelType === 'work') {
        return 'Работа'
      } else if (modelType === 'supply') {
        const types = {
          material: 'Материал',
          equipment: 'Оборудование',
          construction: 'Конструкция',
          shipping: 'Перевозка груза',
          mechanism: 'Механизм',
          work: 'Затраты труда строителей',
        }
        return types[type]
      } else {
        const types = {
          object: 'Объект',
          section: 'Раздел',
          construction: 'Конструкция',
        }
        return types[type]
      }
    },
    load() {
      this.$var('loading', true)
      $api.my.structureTree(this.project.id, true).then((response) => {
        this.structure = response.data.content
      }).finally(() => {
        this.$var('loading', false)
      })
    },
    toolsClick(value, item) {
      this.$var(value.value, item)
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-info {
    
    .n-list {
      font-size: 1em;
      
      &::v-deep {
        .n-list-item {
          .n-content {
            margin: 0;
          }
        }
        .n-title {
          border-bottom: 1px solid #eee;
          padding: 0;
          width: 100%;
        }
      }
      .row {
        white-space: nowrap;
        display: flex;
        &>* {
          padding: 10px 0;
        }
        &.danger {
          .item .text, .done, .percent {
            color: var(--danger) !important;
          }
        }
        
        .item {
          white-space: normal;
          font-size: .8em;
          width: 100%;
          border-right: 1px solid #eee;
          .title {
            padding: 0 5px;
            white-space: normal;
            &>* { display: inline; }
            .type {
              font-size: .8em;
              opacity: .5;
            }
            .text {
              &.danger { color: var(--danger); }
            }
            .n-icon {
              margin-left: 5px;
              font-size: .8em;
              opacity: .2;
              cursor: pointer;
              float: right;
            }
          }
        }
        .tools {
          padding: 0;
          font-size: .8em;
          min-width: 180px;
          display: inline-flex;
          justify-content: center;
          .done, .percent {
            white-space: normal;
            padding: 10px 0;
            width: 130px;
            text-align: center;
            border-right: 1px solid #eee;
          }
          .percent {
            width: 50px;
            font-weight: bold;
            color: var(--success);
          }
        }
      }
    }
  }
</style>
