<template>
  <div class="tab-main-users" style="position: relative">
    <n-loader :loading="$var('load')" />
    <n-items>
      <n-form-item v-for="(title, role) in roles" :key="role" :title="title">
        <template v-if="data[role]">
          {{ data[role].name }}
        </template>
        <template v-else-if="invites[role]">
          БИН {{ invites[role].bin }}
        </template>
        <template v-else>
          Не назначен <n-button @click="$var('selectedRole', role)">Назначить</n-button>
        </template>
      </n-form-item>
    </n-items>
    <modal-assign v-if="$var('selectedRole')" :model-id="modelId" :role="selectedRole" @close="$var('selectedRole', null)" />
  </div>
</template>

<script>
import ModalAssign from './ModalAssign'
export default {
  name: 'TabMainUsers',
  components: { ModalAssign, },
  props: [ 'modelId', ],
  data() {
    return {
      data: {},
      invites: {},
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
  computed: {
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
      this.$var('load', true)
      $api.projects.participants.getMain(this.modelId).then((response) => {
        this.data = $n.reduce(response.data.content, (r, v) => {
          r[v.role] = v
          return r
        }, {})
      }).finally(() => {
        this.$var('load', false)
      })
      $api.projects.participants.getMainInvites(this.modelId).then((response) => {
        this.invites = $n.reduce(response.data.content, (r, v) => {
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
