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
        </n-divide>
      </template>
      <template #tab.info>
        <n-items vertical>
          <n-input title="Имя" v-bind="$form.input('title')" />
          <n-input title="Адрес" v-bind="$form.input('address')" />
          <n-input title="Описание" v-bind="$form.input('description')" />
          <!--      <n-select :data="users" option-title="fullName" selected-title="fullName" item-value="id" :value.sync="user" title="Ответственный" :text="!form.editable()" />-->
          <n-input title="Дата начала" v-bind="$form.input('startedAt')" />
          <n-input title="Предполагаемая дата окончания" v-bind="$form.input('endedAt')" />
        </n-items>
        <tab-main-users v-if="model.id" :project="model" />
      </template>
      
      <template #tab.structure>
        <tab-structure :project="model" :form="$form" />
      </template>
      <template #tab.psd>
        <tab-psd :project="model" />
      </template>
      <template #tab.partners>
        <tab-partners :project="model" />
      </template>
      <template #tab.participants>
        <tab-participants :project="model" />
      </template>
      <template #tab.works>
        <tab-works :project="model" />
      </template>
      
      <template #tab.startingDocs>
        <tab-starting-docs :model-id="model.id" />
      </template>
      <template #tab.projectDocs>
        <tab-project-docs :model-id="model.id" />
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
import TabStructure from './tabs/structure/Index'
import TabStartingDocs from './StartingDocs'
import TabProjectDocs from './ProjectDocs'
import TabWorks from './tabs/works/Index'
import TabMainUsers from './tabs/mainUsers/Index'
import TabPartners from './tabs/partners/Index'
import TabParticipants from './tabs/participants/Index'
import TabPsd from './tabs/psd/Index'

export default {
  name: 'CardProject',
  components: { TabPsd, TabParticipants, TabPartners, TabMainUsers, TabWorks, TabProjectDocs, TabStartingDocs, TabStructure, },
  data() {
    return {
      tabs: [
        { name: 'info', title: 'Информация', callback: this.save, },
        // { name: 'mainUsers', title: 'Ответственные лица', },
        { name: 'structure', title: 'Структура, работы и материалы', },
        // { name: 'works', title: 'Работы', },
        // { name: 'startingDocs', title: 'РД', },
        { name: 'psd', title: 'Документация', },
        // { name: 'documents', title: 'Документы', },
        // { name: 'pj', title: 'ЖПР', },
        // { name: 'responsible', title: 'Ответственные лица', },
        { name: 'partners', title: 'Делегирование', },
        { name: 'participants', title: 'Мои сотрудники', },
        // { name: 'materials', title: 'Материалы', },
      ],
      model: {},
    }
  },
  watch: {
    '$route.query.id'() {
      if (this.$route.query.modal === 'project') {
        this.load()
      }
    },
  },
  created() {
    if (this.$route.query.modal === 'project') {
      this.load()
    }
  },
  methods: {
    load() {
      this.$var('loading', true)
      $api.projects.get(this.$route.query.id).then((response) => {
        this.model = response.data.content
        this.model.startedAt = $app.date.format(this.model.startedAt)
        this.model.endedAt = $app.date.format(this.model.endedAt)
        this.$form.init(this.model, false)
        this.$var('loading', false)
      })
    },
    save() {
      if (this.$form.check()) {
        this.$var('loading', true)
        $api.projects.edit(this.$route.query.id, this.$form.diff()).then((response) => {
          this.model = response.data.content
          this.model.startedAt = $app.date.format(this.model.startedAt)
          this.model.endedAt = $app.date.format(this.model.endedAt)
          this.$form.init(this.model, false)
          this.$var('loading', false)
          this.$d.reloadTag('projects')
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
