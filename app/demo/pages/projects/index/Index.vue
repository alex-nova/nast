<template>
  <div class="page-projects-index container">
    <div v-if="!$d().projects.loading()" class="projects">
      <n-card v-for="project in $d().projects.get()" :key="project.id">
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
      <!--      <n-table :load="$data().projects.load(1)" />-->
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
      projects: [],
      objects: [ 1, ],
      project: [ 1, ],
    }
  },
  mounted() {
    // $debug.log(1, $data().projects.get(), null) // null
    $data().projects.load().then()
    // $debug.log(4, $data().projects.loading(), true) // true
    // $data().get('projects')() // [ {}, {}, ]
    // $data().loading('projects') // true
    // $data().load('projects') // void
    // $data().projects.load() // (params) => $api().data.projects().params(params)
    //
    // $app.data.reload('projects')
    // $app.data.loading('projects')
    //
    // $data().get.projects()
    // $data().loading.projects()
    // $data().reload.projects()
    // $data().load.projects()
    //
    // $data().objects.get(1) // получить записи
    // $data().objects.loading(1) // true - загружается, false - не загружается (если записей нет начать загружать)
    // $data().objects.load(1, { page: 1, size: 10, }) // загрузить данные
    // $data().objects.toComponent(1)
  },
  methods: {
    toComponent(id) {
      return (params) => {
        if ($app.api.data.projects().params(params).getUrl() === $data().projects.url()) {
          return new Promise(((resolve) => resolve($data().projects.get())))
        } else {
          return $data().projects.load(params)
        }
      }
    },
    inComponent(load) {
      load({ size: 1, page: 1, search: '', }).then((response) => {
        this.data = response
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
