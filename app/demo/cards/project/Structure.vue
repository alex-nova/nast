<template>
  <div class="tab-info">
    <div v-if="$var('loading')" style="top: 0; left: 50%; width: 50%; height: 100%; position: fixed; z-index: 1100;">
      <n-loader :loading="$var('loading')" />
    </div>
    <!--    <n-loader :loading="$var('loading')" />-->
    <n-list :data="structure" :sortable="form.editable()">
      <template #group="{ item, }"><span class="type">[Проект]</span> {{ item.title }}</template>
      <template #default="{ item, }"><span class="type">[Объект]</span> {{ item.title }}</template>
    </n-list>
  </div>
</template>

<script>
export default {
  name: 'TabStructure',
  props: [ 'model', 'form', ],
  data() {
    return {
      objects: [],
    }
  },
  computed: {
    structure() {
      return [
        { value: 1, title: this.model.name, children: [
          ...$n.map(this.objects, (item) => ({ value: item.id, title: item.name, })),
        ], },
      ]
    },
  },
  watch: {
    model() {
      this.loadObjects()
    },
  },
  mounted() {
    this.loadObjects()
  },
  methods: {
    loadObjects() {
      this.$var('loading', true)
      $api.projects.get().filters({ projectId: this.$route.query.id, }).then((response) => {
        this.objects = response.data.content
        this.$var('loading', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-info {
    
    .n-list {
      font-size: 1em;
      .type {
        font-size: .8em;
        opacity: .5;
      }
    }
  }
</style>
