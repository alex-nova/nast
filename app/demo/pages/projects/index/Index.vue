<template>
  <div class="page-projects-index container">
    <n-card :loading="$var('loading')">
      <div v-if="project" class="project">
        <div class="preview">
          <n-image :src="project.avatar" />
          <div class="dates">
            <div class="startedAt">
              <n-form-item title="Дата начала строительства">
                {{ $app.date.format(project.startedAt) }}
              </n-form-item>
            </div>
            <div class="endedAt">
              <n-form-item title="Дата завершения строительства">
                {{ $app.date.format(project.endedAt) }}
              </n-form-item>
            </div>
          </div>
        </div>
        
        <div class="content">
          <div class="title">
            {{ project.title }}
            <n-icon icon="pen" @click="$var('edit', true)" />
          </div>
          <div class="address">{{ project.address }}</div>
          <div class="description"><div>{{ project.description }}</div></div>
          <div class="status-title">Статус</div>
          <div class="progress">
            <div>
              <div class="value">{{ percent.works*100 }}%</div>
              <n-form-item title="Выполненных работ">
                <n-progress :value="percent.works" />
              </n-form-item>
            </div>
            <div>
              <div class="value">{{ percent.supplies*100 }}%</div>
              <n-form-item title="Расхода материалов">
                <n-progress :value="percent.supplies" />
              </n-form-item>
            </div>
          </div>
        </div>
        
        <div class="persons">
          <n-items>
            <n-form-item v-for="(title, role) in roles" :key="role" :title="title">
              <template v-if="persons[role] && persons[role].partner">
                {{ persons[role].partner.company.title }}
                <span style="opacity: .9; font-size: .9em;">[{{ persons[role].partner.company.bin }}]</span>
              </template>
              <template v-else>
                Не назначен
                <n-button @click="$var('selectedRole', role)">Назначить</n-button>
              </template>
            </n-form-item>
          </n-items>
        </div>
      </div>
    </n-card>
    
    <n-card v-if="project">
      <n-tabs :data="tabs" name="tabs" state @click="menuClick" />
      <div class="tabs-content">
        <n-tabs-content name="tabs">
          <template #dashboard>
            <tab-gpr :project="project" />
          </template>
          <template #structure>
            <tab-structure :project="project" />
          </template>
          <template #documents>
            <tab-documents :project="project" />
          </template>
          <template #participants>
            <tab-participants :project="project" />
          </template>
        </n-tabs-content>
      </div>
    </n-card>
    
    <modal-assign v-if="$var('selectedRole')" :project="project" :role="selectedRole" @submit="load"
                  @close="$var('selectedRole', null)" />
    <modal-edit-project v-if="$var('edit')" :project="project" :submit="() => load()" @close="$var('edit', false)" />
  </div>
</template>

<script>
import TabStructure from './tabs/structure/Index'
import TabDocuments from './tabs/documents/Index'
import TabParticipants from './tabs/participants/Index'
import ModalAssign from './modals/ModalAssign'
import TabDashboard from './tabs/dashboard/Index'
import TabGpr from './tabs/dashboard/tabs/gpr/Index'
import ModalEditProject from './modals/ModalEditProject'

export default {
  name: 'PageProjectsIndex',
  components: { ModalEditProject, TabGpr, TabDashboard, TabParticipants, TabDocuments, TabStructure, ModalAssign, },
  data() {
    return {
      project: null,
      persons: [],
      roles: {
        client: 'Заказчик',
        executor: 'Ген. подрядчик',
        projector: 'Ген. проектировщик',
        author: 'Авторский надзор',
        tech: 'Технический надзор',
      },
      tabs: [
        { name: 'dashboard', title: 'Отчеты', },
        { name: 'documents', title: 'Документация', },
        { name: 'structure', title: 'Структура проекта, работы и материалы', },
        { name: 'participants', title: 'Участники проекта', },
      ],
    }
  },
  computed: {
    percent() {
      return {
        works: Number((this.project.stats.works.done / this.project.stats.works.count).toFixed(2)) || 0,
        supplies: Number((this.project.stats.supplies.done / this.project.stats.supplies.count).toFixed(2)) || 0,
      }
    },
    projectId() {
      return this.$route.params.projectId
    },
    selectedRole() {
      const roleName = this.$var('selectedRole')
      return roleName ? {
        name: roleName,
        title: this.roles[roleName],
      } : {}
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('loading', true)
      const apis = [
        $api.iq.projects.get(this.projectId).query({ stats: '', }),
        $api.iq.partners.getMain(this.projectId),
      ]
      Promise.all(apis).then((responses) => {
        this.project = responses[0].data.content
        this.persons = responses[1].data.content
      }).finally(() => {
        this.$var('loading', false)
      })
    },
    menuClick() {
      this.$router.push({ ...this.$route, query: {}, })
    },
  },
}
</script>

<style lang="scss" scoped>
  .page-projects-index {
    .project {
      display: flex;
      min-height: 300px;
    
      .preview {
        .n-image {
          width: 200px;
          height: 200px;
        }
        
        .dates {
          padding-top: 10px;
          font-size: .9em;
          &>* {
            padding-top: 5px;
          }
        }
      }
      &>.content {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        min-width: 400px;
        width: 100%;
        padding: 0 var(--n-card-padding);
        margin: 0 var(--n-card-padding);
        border: solid #ddd;
        border-width: 0 1px;
      
        .title {
          font-weight: 500;
          font-size: 1.2em;
          .n-icon {
            float: right;
            vertical-align: middle;
            font-size: .8rem;
            opacity: .3;
            margin-left: 10px;
            cursor: pointer;
          }
        }
        .address {
          opacity: .7;
          font-size: .9em;
        }
        .description {
          padding: 10px 0;
          flex-grow: 1;
          font-size: .9em;
          div {
            height: 155px;
            padding-right: 10px;
            overflow-x: hidden;
            overflow-y: auto;
          }
        }
        
        .status-title {
          font-weight: bold;
          opacity: .8;
        }
        .progress {
          &>* {
            margin-top: 10px;
            &:first-child {
              margin-top: 5px;
            }
          }
          .value {
            float: right;
            font-size: 1em;
            font-weight: bold;
            color: var(--success);
          }
          .n-progress {
            margin-top: 2px;
          }
        }
      }
      
      .persons {
        font-size: .9em;
        min-width: 250px;
        max-width: 500px;
      }
    }
    
    .tabs-content {
      padding-top: 35px;
      min-height: 400px;
  
      &::v-deep {
        .wrapper {
          display: flex;
          width: 100%;
        }
  
        .menu {
          min-width: 300px;
          border-right: 1px solid #ddd;
          font-size: .9em;
          margin-right: 20px;
    
          .n-tabs {
            flex-direction: column;
          }
        }
  
        & .wrapper > .content {
          width: 100%;
          position: relative;
        }
      }
    }
  }
</style>
