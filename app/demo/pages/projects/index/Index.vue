<template>
  <div class="page-projects-index container">
    <div class="projects">
      <n-card v-for="project in projects" :key="project.id">
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
export default {
  name: 'PageProjectsIndex',
  data: () => ({
    projects: [],
  }),
  load() {
    return {
      projects: $api.projects.get().filters({ projectId: null, }).then((r) => r.data.content),
    }
  },
  watch: {
    '$route.query'(value) {
      if (!value.modal) {
        this.load()
      }
    },
  },
  mounted() {
    // this.load()
  },
  methods: {
    load() {
      $api.projects.get().filters({ projectId: null, }).then((response) => {
        this.projects = response.data.content
      })
    },
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
