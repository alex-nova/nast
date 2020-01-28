<template>
  <div class="card-record">
    <n-modal-card :tabs="tabs" name="record" :loading="$var('loading')">
      <template #header>Запись в журнале</template>
      <template #body>
        <div class="body">
          <div class="object">Блок 1 <span>[ЖК Koktobe city]</span></div>
          <div>Вид работ: Бетонные работы</div>
          <div>Дата: 27.01.2020</div>
        </div>
      </template>
      <template #tab.info>
        <n-items>
          <n-input title="Описание работ" :value="record.content" text />
          <n-input title="Место" :value="record.place" text />
          <div class="weather">
            <n-input class="env" title="Погодные условия" value="Пасмурно" inline text />
            <n-input class="temperature" title="Температура" value="4/-2 t" inline text />
            <n-input class="wind" title="Скорость ветра" value="4 м/с" inline text />
          </div>
          <n-input title="Меры в особых условиях" :value="record.measures" text />
        </n-items>
      </template>
      <template #tab.items>
        <TabItems />
      </template>
      <template #footer="{tab}">
        <n-divide>
          <n-button @click="() => $router.push({query: {}})">Закрыть</n-button>
          <n-items v-if="tab.callback" inline>
            <n-button v-if="!$form.editable() && tab.name === 'info'" color="primary" @click="$form.edit()">Редактировать</n-button>
            <n-button v-if="!$form.editable() && tab.name === 'structure'" color="primary" @click="$form.edit()">Сортировать</n-button>
            <n-button v-if="$form.editable()" @click="$form.cancel()">Отмена</n-button>
            <n-button v-if="$form.editable()" color="success" @click="tab.callback">Сохранить</n-button>
          </n-items>
        </n-divide>
      </template>
    </n-modal-card>
  </div>
</template>

<script>
import TabItems from './Items'
export default {
  name: 'CardRecord',
  components: { TabItems, },
  data() {
    return {
      tabs: [
        { name: 'info', title: 'Информация', callback: this.save, },
        { name: 'spec1', title: 'Журнал бетонных работ', },
        { name: 'items', title: 'Расход', },
        { name: 'control', title: 'Надзор', },
      ],
      materials: [
        { id: 1, name: 'Бетон', unit: 'м3', count: 10, desc: '', },
      ],
      columns: [
        { title: 'Название', name: 'name', },
        { title: 'Количество', name: 'count', },
      ],
    }
  },
  computed: {
    record() {
      return { id: 1, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '50', done: '', createdAt: Date.now(),
        place: 'А/2-А/1-А/4 на отм. -4,200',
        measures: 'Бетон с химическими добавками',
        content: 'Устройство гидроизоляции по бетонной подготовке ленточных ростверков фундаментов блока №4', }
    },
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.card-record {
  
  .weather {
    .env, .temperature, .wind {
      width: 150px;
      margin-right: 20px;
    }
  }

}
</style>
