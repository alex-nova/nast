<template>
  <div class="page-record-create">
    <n-card class="info">
      <template #header>
        <h3>Информация</h3>
      </template>
      <n-items>
        <n-input title="Дата заполнения" value="27.01.2020" />
        <n-input title="Проект" value="ЖК Koktobe city" text />
        <n-input title="Объект" value="Блок 1" text />
        <n-select title="Запись в журнале" :data="records" :value.sync="record" />
      </n-items>
    </n-card>
    
    <n-card>
      <template #header>
        <h3>Журнал производственных работ</h3>
      </template>
      <n-items>
        <n-input title="Выявленные отступления от проектно-сметной документации" />
        <n-input title="Указания об устранении выявленных отступлений или нарушений и сроки их выполнения" />
        <n-upload title="Фото/видео материалы" multi />
      </n-items>
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
      record: 'Без ссылки на запись',
      records: [
        'Без ссылки на запись',
        'Бетонные работы (6 февраля 2020)',
        'Бетонные работы (7 февраля 2020)',
        'Бетонные работы (8 февраля 2020)',
        'Бетонные работы (9 февраля 2020)',
        'Бетонные работы (10 февраля 2020)',
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
