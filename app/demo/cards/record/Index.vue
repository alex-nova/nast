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
      <template #tab.spec1>
        <n-items>
          <n-form-item title="Ген подрядчик" active>
            <div>Ожидает проверки</div>
          </n-form-item>
          <n-form-item title="Авторский надзор" active>
            <div class="success">Проверено</div>
          </n-form-item>
          <n-form-item title="Технический надзор" active>
            <div class="error">Отклонено</div>
          </n-form-item>
        </n-items>
      </template>
      <template #tab.control>
        <n-card>
          <n-items>
            <div v-if="$app.auth.user().iin === 123456789012" style="float: right">
              <n-link :to="{name: 'records.create', params: {id:1},}" wide><n-button>Создать запись об устранении</n-button></n-link>
            </div>
            <n-form-item title="Статус" active inline>
              <div class="error">Не решен</div>
            </n-form-item>
            <n-input title="Выявленные отступления от проектно-сметной документации" value="Неправильно сделано" text />
            <n-input title="Указания об устранении выявленных отступлений или нарушений и сроки их выполнения" value="Надо переделать" text />
            <n-form-item title="Фото/видео материалы" active>
              <div class="images">
                <n-image mock />
                <n-image mock />
              </div>
            </n-form-item>
          </n-items>
          <div class="info">Технический надзор, 10 февраля 2020</div>
        </n-card>
        <n-card>
          <n-items>
            <n-form-item title="Статус" active>
              <div class="success">Решен</div>
            </n-form-item>
            <n-input title="Выявленные отступления от проектно-сметной документации" value="Неправильно сделано" text />
            <n-input title="Указания об устранении выявленных отступлений или нарушений и сроки их выполнения" value="Надо переделать" text />
            <n-form-item title="Фото/видео материалы" active>
              <div class="images">
                <n-image mock />
                <n-image mock />
                <n-image mock />
              </div>
            </n-form-item>
            <n-form-item title="Ответ" active>
              <n-link :to="{ name: 'journals.index', params: { id: 1, }, }">Запись в журнале</n-link>
            </n-form-item>
          </n-items>
          <div class="info">Авторский надзор, 8 февраля 2020</div>
        </n-card>
      </template>
      <template #footer="{tab}">
        <n-divide>
          <n-button @click="() => $router.push({query: {}})">Закрыть</n-button>
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
        { name: 'items', title: 'Расход', },
        { name: 'control', title: 'Надзор', },
        { name: 'spec1', title: 'Согласование', },
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
  
  .error {
    color: var(--danger);
  }
  .success {
    color: var(--success);
  }
  
  .images {
    & > div {
      display: inline-block;
      margin-right: 10px;
      max-width: 100px;
      max-height: 100px;
    }
  }
  .info {
    margin-top: 10px;
    font-size: .8em;
    opacity: .9;
  }

}
</style>
