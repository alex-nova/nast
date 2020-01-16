<template>
  <div class="card-project">
    <n-modal-card :tabs="tabs" name="project" :loading="$var('loading')">
      <template #header>Карточка {{ model.projectId ? 'объекта' : 'проекта' }}</template>
      <template #body>
        <n-divide class="body">
          <n-items class="content">
            <n-image class="avatar" mock alt="avatar" round />
            <div>
              <div>{{ model.name }}</div>
            </div>
          </n-items>
          <n-items>
            <div><n-button icon="trash" /></div>
          </n-items>
        </n-divide>
      </template>
      <template #tab.info>
        <n-items vertical>
          <n-input title="Имя" v-bind="$form.input('name')" />
          <n-input title="Адрес" v-bind="$form.input('address')" />
          <n-input title="Описание" v-bind="$form.input('description')" />
          <!--      <n-select :data="users" option-title="fullName" selected-title="fullName" item-value="id" :value.sync="user" title="Ответственный" :text="!form.editable()" />-->
          <n-input title="Дата начала" v-bind="$form.input('startedAt')" />
          <n-input title="Предполагаемая дата окончания" v-bind="$form.input('endedAt')" />
        </n-items>
      </template>
      <template #tab.structure>
        <tab-structure :model="model" :form="$form" />
      </template>
      <template #tab.startingDocs>
        <tab-starting-docs />
      </template>
      <template #tab.projectDocs>
        <tab-project-docs />
      </template>
      <template #tab.jobs>
        <tab-jobs />
      </template>
      <template #tab.materials>
        <tab-materials />
      </template>
      <template #footer="{tab}">
        <n-divide>
          <n-button @click="() => $router.push({query: {}})">Закрыть</n-button>
          <n-items v-if="tab.callback">
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
import TabStructure from './Structure'
import TabStartingDocs from './StartingDocs'
import TabProjectDocs from './ProjectDocs'
import TabJobs from './Jobs'
import TabMaterials from './Materials'

export default {
  name: 'CardProject',
  components: { TabMaterials, TabJobs, TabProjectDocs, TabStartingDocs, TabStructure, },
  data() {
    return {
      tabs: [
        { name: 'info', title: 'Информация', callback: this.save, },
        { name: 'structure', title: 'Структура', },
        { name: 'startingDocs', title: 'Исходная документация', },
        { name: 'projectDocs', title: 'Чертежи', },
        // { name: 'documents', title: 'Документы', },
        // { name: 'pj', title: 'ЖПР', },
        // { name: 'responsible', title: 'Ответственные лица', },
        // { name: 'contractors', title: 'Назначение подряда', },
        { name: 'jobs', title: 'Работы', },
        { name: 'materials', title: 'Материалы', },
      ],
      model: {},
    }
  },
  watch: {
    '$route.query.id'() {
      this.load()
    },
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$var('loading', true)
      $api.projects.get(this.$route.query.id).then((response) => {
        this.model = response.data.content
        this.model.startedAt = $app.date.format(this.model.startedAt, 'date')
        this.model.endedAt = $app.date.format(this.model.endedAt, 'date')
        this.$form.init(this.model, false)
        this.$var('loading', false)
      })
    },
    save() {
      if (this.$form.check()) {
        this.$var('loading', true)
        $api.projects.edit(this.$route.query.id, this.$form.get()).then((response) => {
          this.model = response.data.content
          this.model.startedAt = $app.date.format(this.model.startedAt, 'date')
          this.model.endedAt = $app.date.format(this.model.endedAt, 'date')
          this.$form.init(this.model, false)
          this.$var('loading', false)
          $d.projects.load().then()
        }).catch(() => {
          this.$var('loading', false)
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card-project {
  .body {
    .content {
      --n-items-margin: 10px;
    }
    
    & > .n-items > * {
      vertical-align: middle;
    }
    
    .avatar {
      width: 80px;
      height: 80px;
      --n-image-border: 3px solid #fff;
    }
  }

}
</style>
