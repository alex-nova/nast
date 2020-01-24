<template>
  <div class="page-journals-my">
    <n-card>
      <form @submit="save">
        <n-items>
          <n-input title="Title" v-bind="$form.input('title')" />
          <n-input title="Address" v-bind="$form.input('address')" />
          <n-button type="submit">Save</n-button>
        </n-items>
        {{ $d.get('project') }}<br />
        {{ $store.state.data }}<br />
        {{ $store.state.auth }}
      </form>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageJournalsMy',
  data() {
    return {
      open: true,
    }
  },
  load: (route) => {
    return {
      project: {
        api: $api.projects.get(route.query.id).fromQuery(route.query),
        default: {},
        tag: 'projects',
        lifetime: 60*60,
        callback: () => {
        
        },
      },
    }
  },
  methods: {
    save() {
    
    },
  },
}
</script>

<style lang="scss" scoped>
.page-journals-my {

}
</style>
