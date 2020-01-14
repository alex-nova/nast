<template>
  <div class="page-project container">
    <n-card>
      <div class="project">
      </div>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageProject',
  data: () => ({
    project: {},
  }),
  mounted() {
    this.load()
  },
  methods: {
    load() {
      $api.projects.get(this.$route.params.id).then((response) => {
        this.projects = response.data.content
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.page-project {
  .project {
  
  }
}
</style>
