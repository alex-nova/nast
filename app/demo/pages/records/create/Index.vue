<template>
  <div class="page-record-create">
    <div class="line">
      <n-card class="info" :loading="$var('loadInfo')">
        <template #header>
          <h3>Информация</h3>
        </template>
        <n-items>
          <n-input title="Дата заполнения" :value="$app.date.format($app.date.now(), 'date')" />
          <n-input v-if="journal.type === 'main'" title="Вид работ" :value="workType.name" text />
          <n-input title="Проект" :value="project.name" text />
        </n-items>
      </n-card>
  
      <n-card v-if="journal.type === 'main'" class="items">
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
    
    <n-card :loading="$var('loadFields')">
      <template #header>
        <h3>{{ journal.title }}</h3>
      </template>
      <n-items>
        <n-input v-for="field in fields" :key="field.id" :title="field.title" v-bind="$form.input(field.name)" />
      </n-items>
    </n-card>
    
    <!--    <n-card>-->
    <!--      <template #header>-->
    <!--        <h3>Журнал производственных работ</h3>-->
    <!--      </template>-->
    <!--      <n-items>-->
    <!--        <n-input title="Описание работ" />-->
    <!--        <n-input title="Место" />-->
    <!--        <div class="weather">-->
    <!--          <n-select title="Погодные условия" :data="weathers" :value.sync="weather" inline />-->
    <!--          <n-input class="temperature" title="Температура" inline />-->
    <!--          <span class="unit">t</span>-->
    <!--          <n-input class="wind" title="Скорость ветра" inline />-->
    <!--          <span class="unit">м/с</span>-->
    <!--        </div>-->
    <!--        <n-input title="Меры в особых условиях" />-->
    <!--        <n-select title="Чертежи" :data="docs" :value.sync="doc" />-->
    <!--      </n-items>-->
    <!--    </n-card>-->
    
    <n-card>
      <n-divide>
        <div></div>
        <n-button color="success" :loading="$var('loadSubmit')" @click="submit">Сохранить</n-button>
      </n-divide>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageRecordCreate',
  data() {
    return {
      journal: [],
      fields: [],
      project: {},
      workType: {},
      
      doc: [],
      docs: [
        'Чертеж 1',
      ],
      work: {},
      selectedMaterials: [
        {},
      ],
      weather: '',
      weathers: [
        'Ясно',
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
    // $app.router.setPage({ data: { object: 'sd', project: 'dsfdf', }, })
    // $app.router.setPage('journals.index', { data: { journalId: this.$route.params.id, }, })
    this.loadFields()
    this.loadInfo()
  },
  methods: {
    loadFields() {
      this.$var('loadFields', true)
      $api.journals.getColumns(this.$route.query.project, this.$route.params.id, 'records').then((response) => {
        this.fields = response.data.content
        this.$form.init({})
      }).finally(() => {
        this.$var('loadFields', false)
      })
    },
    loadInfo() {
      this.$var('loadInfo', true)
      const promises = [
        $api.journals.get(this.$route.params.id),
        $api.projects.get(this.$route.query.project),
        $api.types.get(this.$route.query.type),
      ]
      Promise.all(promises).then((response) => {
        this.journal = response[0].data.content
        this.project = response[1].data.content
        this.workType = response[2].data.content
      }).finally(() => {
        this.$var('loadInfo', false)
      })
    },
    submit() {
      this.$var('loadSubmit', true)
      $api.journals.records.create(this.$route.query.project, this.$route.params.id, 'records', this.$form.get()).then((response) => {
        if (this.journal.type === 'main') {
          this.$router.push({ name: 'journals.index', })
        } else {
          this.$router.push({ name: 'journals.spec', params: { id: this.journal.id, projectId: this.project.id, }, })
        }
      }).finally(() => {
        this.$var('loadSubmit', false)
      })
    },
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
