<template>
  <div class="page-projects-index container" style="position: relative">
    <div style="margin: 10px 20px 0;">
      <n-button @click="$var('add', true)">Создать проект</n-button>
    </div>
    <n-loader :loading="$d.loading('projects')" />
    <div class="projects">
      <n-card v-for="project in $d.get('projects')" :key="project.id">
        <div class="project">
          <div class="preview">
            <n-link :to="{ name: 'projects.index', params: { projectId: project.id, },}" class="title">
              <n-image :src="project.avatar" centered />
            </n-link>
          </div>
          <div class="content">
            <n-link :to="{ name: 'projects.index', params: { projectId: project.id, },}" class="title">{{ project.title }}</n-link>
            <div class="address">{{ project.address }}</div>
            <div class="description">
              <div>{{ project.description }}</div>
              <div class="links">
                <n-link :to="{ name: 'journals.main', params: { projectId: project.id, }, }">Журнал производства работ</n-link><br />
                <n-link :to="{ name: 'projects.index', params: { projectId: project.id, }, query: { tabs: 'documents', menu: 'acts', }, }">
                  Акты
                </n-link><br />
                <n-link :to="{ name: 'projects.index', params: { projectId: project.id, }, query: { tabs: 'structure', menu: 'tree', }, }">
                  Структура проекта
                </n-link>
              </div>
            </div>
            <div class="dates">
              <div class="startedAt">Начало: {{ $app.date.format(project.startedAt) }}</div>
              <div class="endedAt">Конец: {{ $app.date.format(project.endedAt) }}</div>
            </div>
          </div>
        </div>
      </n-card>
    </div>
    
    <create-project v-if="$var('add')" :submit="() => $d.reload('projects')" @close="$var('add', false)" />
  </div>
</template>

<script>
import CreateProject from './modals/CreateProject'

export default {
  name: 'PageProjectsIndex',
  components: { CreateProject, },
  load(route) {
    return {
      projects: {
        api: $api.my.projects().fromQuery(route.query),
        tag: 'projects',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
  .page-projects-index {
    .projects {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      --n-card-margin: 10px;
      
      .project {
        width: 600px;
        display: flex;
        
        .n-image {
          width: 200px;
          height: 200px;
        }
        &>.content {
          padding: 0 0 0 var(--n-card-padding);
          display: flex;
          flex-direction: column;
          width: 100%;
          
          .title {
            font-weight: 500;
            font-size: 1.2em;
          }
          .address {
            margin-top: 3px;
            opacity: .7;
            line-height: 1;
            font-size: .9em;
            height: .9em;
          }
          .description {
            padding: 10px 0 0;
            flex-grow: 1;
            font-size: .9em;
            div {
              height: 62px;
              padding-right: 10px;
              overflow-x: hidden;
              overflow-y: auto;
            }
            .links {
              font-size: .8em;
            }
          }
          .dates {
            display: flex;
            justify-content: space-between;
            font-size: .9em;
          }
        }
      }
    }
  }
</style>
