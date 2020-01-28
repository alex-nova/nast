<template>
  <div class="page-journals-index">
    <n-card>
      <div class="tools">
        <n-button icon="plus" color="success" @click="$var('create', true)">Добавить запись</n-button>
      </div>
      <n-table :data="$d.get('records')" :columns="columns" :loading="$d.loading('records')">
        <template #lastRecord="{item}">
          {{ $app.date.format(item.createdAt, 'date') }}
        </template>
        <template #done="{item}">
          <div class="done-cell">
            <span class="percent">{{ item.percent }}%</span>&nbsp;
            <span v-if="item.done" class="done">({{ item.done }})</span>
          </div>
        </template>
        <template #author>
          <div class="position">Начальник участка</div>
          <div class="name">Джалмуханов К. Х.</div>
        </template>
        <template #tools="{item}">
          <n-link :to="{query: { modal: 'record', id: item.id,}}"><n-button icon="eye" /></n-link>
        </template>
      </n-table>
    </n-card>
    
    <n-modal v-if="$var('create')" @close="$var('create', false)">
      <n-items>
        <n-select title="Вид работ" :data="$d.get('types')" :value.sync="type" option-title="name" selected-title="name" item-value="id" />
        <n-link :to="{name: 'records.create', params: {id},}" wide><n-button color="primary" wide>Перейти к заполнению</n-button></n-link>
      </n-items>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'PageJournalsIndex',
  data() {
    return {
      type: {},
      columns: [
        { title: 'ID', name: 'id', },
        { title: 'Дата', name: 'lastRecord', },
        { title: 'Запись', name: 'content', },
        { title: 'Погодные условия', name: 'weather', },
        { title: 'Выполнено работ', name: 'done', },
        { title: 'Ответсвенный', name: 'author', },
        { title: '', name: 'tools', align: 'right', },
      ],
    }
  },
  load(router) {
    return {
      records: {
        api: $api.journals.records.get(router.params.id),
      },
      types: {
        api: $api.types.get(),
      },
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
}
</script>

<style lang="scss" scoped>
  .page-journals-index {
    .tools {
      margin: 10px 0;
      text-align: right;
    }
    
    &::v-deep .n-table {
      .cell {
        font-size: .9em;
      }
    }
    .done-cell {
      white-space: nowrap;
      .done {
        font-size: .9em;
        opacity: .7;
      }
    }
    .position {
      font-size: .9em;
      opacity: 0.7;
    }
    .name {
      white-space: nowrap;
    }
  }
</style>
