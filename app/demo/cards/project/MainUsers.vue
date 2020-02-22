<template>
  <div class="tab-main-users" style="position: relative">
    <n-loader :loading="$var('load')"></n-loader>
    <n-items>
      <n-form-item v-for="(title, role) in roles" :key="role" :title="title">
        <template v-if="data[role]">
          {{ data[role].fullName }}
        </template>
        <template v-else>
          Не назначен
        </template>
      </n-form-item>
    </n-items>
  </div>
</template>

<script>
export default {
  name: 'TabMainUsers',
  props: [ 'modelId', ],
  data() {
    return {
      data: {},
      columns: [],
      roles: {
        client: 'Заказчик',
        executor: 'Ген. подрядчик',
        projector: 'Ген. проектировщик',
        author: 'Авторский надзор',
        tech: 'Технический надзор',
      },
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      $api.projects.participants.getMain(this.modelId).then((response) => {
        this.data = $n.reduce(response.data.content, (r, v) => {
          r[v.role] = v
          return r
        }, {})
      }).finally(() => {
        this.$var('load', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-main-users {
    font-size: .9em;
    .tools {
      margin-bottom: 10px;
    }
  }
</style>
