<template>
  <div class="page-record-create">
    <div class="line">
      <n-card class="info">
        <template #header>
          <h3>Информация</h3>
        </template>
        <n-items>
          <n-input title="Дата заполнения" value="27.01.2020" />
          <n-input title="Вид работ" value="Бетонные работы" text />
          <n-input title="Проект" value="ЖК Koktobe city" text />
          <n-input title="Объект" value="Блок 1" text />
        </n-items>
      </n-card>
  
      <n-card class="items">
        <template #header>
          <h3>Расходы</h3>
        </template>
        <n-items>
          <div class="materials">
            <n-select title="Работа" :value.sync="work" :data="$d.get('works')" item-value="id" option-title="name" selected-title="name" inline />
            <n-input class="count" title="Объем работ" inline />
            <span class="unit">{{ work.units }}</span>
          </div>
          
          <div v-for="(value, i) in selectedMaterials" :key="i" class="materials">
            <n-select title="Материал" :value.sync="selectedMaterials[i]" :data="$d.get('materials')" item-value="id" option-title="name" selected-title="name" inline />
            <n-input class="count" title="Количество" inline />
            <span class="unit">{{ selectedMaterials[i].unit }}</span>
            <span v-if="i" class="delete" @click="removeMaterial(i)"><n-icon icon="trash" /></span>
          </div>
          <div class="add" @click="addMaterial"><n-icon icon="plus" /> Добавить материал</div>
        </n-items>
      </n-card>
    </div>
    
    <n-card>
      <template #header>
        <h3>Журнал производственных работ</h3>
      </template>
      <n-items>
        <n-input title="Описание работ" />
        <n-input title="Место" />
        <div class="weather">
          <n-select title="Погодные условия" :data="weathers" :value.sync="weather" inline />
          <n-input class="temperature" title="Температура" inline />
          <span class="unit">t</span>
          <n-input class="wind" title="Скорость ветра" inline />
          <span class="unit">м/с</span>
        </div>
        <n-input title="Меры в особых условиях" />
        <n-upload title="Чертежи" multi />
      </n-items>
    </n-card>
    
    <n-card>
      <template #header>
        <h3>Журнал бетонных работ</h3>
      </template>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </n-card>
    
    <n-card>
      <n-divide>
        <div></div>
        <n-link :to="{name: 'journals.index', params: { id: 1,}, query: { modal: 'record', id: 1,}}"><n-button color="success">Сохранить</n-button></n-link>
      </n-divide>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageRecordCreate',
  data() {
    return {
      work: {},
      selectedMaterials: [
        {},
      ],
      weather: '',
      weathers: [
        'Ясно',
        'Облачно',
        'Дождь',
        'Снег',
      ],
    }
  },
  load() {
    return {
      works: {
        api: $api.projects.works.get(),
      },
      materials: {
        api: $api.projects.materials.get(),
      },
    }
  },
  created() {
    $app.router.setPage({ data: { object: 'sd', project: 'dsfdf', }, })
    $app.router.setPage('journals.index', { data: { journalId: this.$route.params.id, }, })
  },
  methods: {
    addMaterial() {
      this.selectedMaterials.push({})
    },
    removeMaterial(i) {
      this.selectedMaterials = $n.filter(this.selectedMaterials, (item, k) => k !== i)
    },
  },
}
</script>

<style lang="scss" scoped>
  .page-record-create {
    
    .line {
      display: flex;
      align-items: flex-start;
      
      & > * {
        white-space: normal;
        display: inline-block;
        margin-bottom: 0;
        flex-grow: .4;
        flex-basis: 1px;
      }
      .items {
        margin-left: 0;
        flex-grow: .6;
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
    
    .weather {
      .unit {
        margin: 0 20px 0 5px;
      }
      .temperature {
        margin-left: 20px;
      }
      .temperature, .wind {
        width: 100px;
      }
    }
    
    .add {
      margin-top: 5px;
      font-size: .8em;
      opacity: .7;
      cursor: pointer;
    }
  }
</style>
