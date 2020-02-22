<template>
  <div class="page-projects-index container">
    <div style="margin: 10px 20px 0;">
      <n-button @click="$var('add', true)">Создать проект</n-button>
      <create-project v-if="$var('add')" @close="$var('add', false)" />
    </div>
    <n-loader :loading="$d.loading('projects')" />
    <div class="projects">
      <n-card v-for="project in $d.get('projects')" :key="project.id">
        <div class="project">
          <div class="preview">
            <n-image mock />
          </div>
          <div class="content">
            <n-link :to="{ query: { modal: 'project', id: project.id, },}" class="name">{{ project.name }}</n-link>
            <div class="address">{{ project.address }}</div>
            <div class="description"><div>{{ project.description }}</div></div>
            <div class="dates">
              <div class="startedAt">Начало: {{ $app.date.format(project.startedAt, 'date') }}</div>
              <div class="endedAt">Конец: {{ $app.date.format(project.endedAt, 'date') }}</div>
            </div>
          </div>
        </div>
      </n-card>
    </div>
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
        
        .name {
          font-weight: 500;
          font-size: 1.2em;
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
            height: 103px;
            padding-right: 10px;
            overflow-x: hidden;
            overflow-y: auto;
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
