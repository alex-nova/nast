<template>
  <div class="tab-gpr" style="position: relative">
    <n-loader :loading="$var('loading')" />
  
    <h3 style="margin-top: 10px">График производственных работ</h3>
    
    <div class="gpr">
      <div v-if="structure.length" class="gpr-header">
        <div class="item">
          <div class="title"></div>
          <div class="date">Даты</div>
          <div class="days">Дней</div>
        </div>
        <div class="months">
          <div v-for="(month, i) in months" :key="i" class="month" :style="{ width: `${month.width}px`, }">{{ month.title }}</div>
        </div>
      </div>
      <n-list :data="structure" :opened="true">
        <template #item="{ item, }">
          <div class="row">
            <div class="item">
              <div class="title" :style="{ paddingLeft: `${20*item.deep}px`, }">
                <div class="type">
                  [{{ getTypeTitle(item._model, item.type) }}]
                </div>
                <div :class="['text', getColor(item)]">
                  {{ item.title }}
                </div>
              </div>
            </div>
            <div class="start">
              {{ $app.date.format(item.planStartedAt) }} - {{ $app.date.format(item.planEndedAt) }}
              <n-icon icon="pen" @click.stop="() => $var('edit', item)" />
            </div>
            <div class="days">{{ getDiff(item.planEndedAt, item.planStartedAt) }}</div>
            <div class="figure" :style="{ width: `${days*k}px`}">
              <div class="months">
                <div v-for="(month, i) in months" :key="i" class="month" :style="{ width: `${month.width}px`, }"></div>
              </div>
              <div class="progress">
                <n-progress class="plan" :value="0" :style="getRowStyle(item, true)" />
                <n-progress class="fact" :value="1" :color="getColor(item)" :style="getRowStyle(item, false)" />
              </div>
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
    </div>
  
    <modal-section-edit v-if="$var('edit')" :model="$var('edit')" :update="load" @close="$var('edit', false)" />
  </div>
</template>

<script>
import ModalSectionEdit from './ModalSectionEdit'
export default {
  name: 'TabGpr',
  components: { ModalSectionEdit, },
  props: [ 'project', ],
  data() {
    return {
      structure: [],
      tools: [],
      k: 3,
      locales: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
      ],
    }
  },
  computed: {
    startedAt() {
      return this.structure[0]?.planStartedAt
    },
    endedAt() {
      return this.structure[0]?.planEndedAt
    },
    days() {
      return this.getDiff(this.endedAt, this.startedAt)
    },
    months() {
      const start = $app.date.now(this.startedAt)
      const end = $app.date.now(this.endedAt)
      
      const result = [
        { x: 0, width: 0, date: start, title: this.locales[start.month()], },
      ]
      
      const setMonth = (prev, end) => {
        const month = prev.date.month() + 1
        const nextLineDate = $app.date.now({ year: prev.date.year(), month, day: 1, })
        const width = nextLineDate.diff(prev.date, 'days') * this.k
        result[result.length - 1].width = width
        const item = { x: prev.x + width, width: width, date: nextLineDate, title: this.locales[month], }
        result.push(item)
        
        if (end.diff(nextLineDate) > 0) {
          setMonth(item, end)
        } else {
          result[result.length - 1].width = 30 * this.k
        }
      }
      setMonth(result[0], end)
      return result
    },
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
    getDiff(start, end) {
      return $app.date.now(start).diff($app.date.now(end), 'days')
    },
    getRowStyle(item, plan = false) {
      if (!plan && (!item.startedAt || !item.endedAt)) {
        return {
          width: 0,
        }
      }
      let length = this.getDiff(plan ? item.planEndedAt : item.endedAt, plan ? item.planStartedAt : item.startedAt)
      let margin = this.getDiff(plan ? item.planStartedAt : item.startedAt, this.startedAt)
      
      if (length > this.days) length = this.days
      if (length === 0) length = 1
      if (margin < 0) margin = 0
      
      return {
        width: `${length*this.k}px`,
        marginLeft: `${margin*this.k}px`,
      }
    },
    getColor(item) {
      return this.getDiff(item.planEndedAt, item.endedAt) < 0 ? 'danger' : 'primary'
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
      $api.my.structureTree(this.project.id, false).then((response) => {
        this.structure = response.data.content
      }).finally(() => {
        this.$var('loading', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-gpr {
    overflow-x: auto;
    .gpr-header {
      white-space: nowrap;
      &>* { display: inline-block; }
      .item {
        &>* {
          display: inline-block;
          text-align: center;
          font-size: .8em;
          overflow: hidden;
        }
        .title { width: 349px;}
        .date { width: 181px; border-left: 1px solid #eee;  }
        .days { width: 50px; }
      }
      .months {
        .month {
          display: inline-block;
          border-left: 1px solid #eee;
          text-align: center;
          font-size: .8em;
          overflow: hidden;
        }
      }
    }
    
    .n-list {
      font-size: 1em;
      width: 100%;
      overflow: visible;
      &::v-deep {
        .n-list-item {
          .n-list-group {
            padding-left: 0;
          }
          .n-content {
            margin: 0;
          }
        }
        .n-caret {
          display: none;
        }
        .n-title {
          border-bottom: 1px solid #eee;
          padding: 0;
        }
      }
      .row {
        white-space: nowrap;
        display: flex;
        align-items: stretch;
        &>* {
          padding: 10px 0;
        }
      }
      
      .item {
        white-space: normal;
        font-size: .8em;
        width: 350px;
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
        }
      }
      .days, .start {
        font-size: .8em;
        width: 180px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        .n-icon {
          margin-left: 5px;
          font-size: .8em;
          opacity: .2;
          cursor: pointer;
        }
      }
      .days { width: 50px; }
      .figure {
        display: flex;
        align-items: center;
        position: relative;
        .months {
          position: absolute;
          top: 0;
          bottom: 0;
          overflow: hidden;
          &>* { display: inline-block; }
          .month {
            border-left: 1px solid #eee;
            height: 100px;
          }
        }
        .plan {
          background-color: #b4cbf5;
          border-radius: var(--border-radius);
        }
        .fact {
        
        }
      }
    }
  }
</style>
