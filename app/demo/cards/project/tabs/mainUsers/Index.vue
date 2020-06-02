<template>
  <div class="tab-main-users" style="position: relative">
    <n-loader :loading="$var('loadMain')"/>
    <n-items>
      <n-form-item v-for="(title, role) in roles" :key="role" :title="title">
        <template v-if="data[role] && data[role].partner">
          {{ data[role].partner.company.title }}
          <span style="opacity: .9; font-size: .9em;">[{{ data[role].partner.company.bin }}]</span>
        </template>
        <template v-else>
          Не назначен
          <n-button @click="$var('selectedRole', role)">Назначить</n-button>
        </template>
      </n-form-item>
    </n-items>
    <modal-assign v-if="$var('selectedRole')" :project="project" :role="selectedRole" @submit="loadMain"
                  @close="$var('selectedRole', null)"/>
  </div>
</template>

<script>
import ModalAssign from './ModalAssign'

export default {
  name: 'TabMainUsers',
  components: { ModalAssign, },
  props: [ 'project', ],
  data() {
    return {
      data: {},
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
        title: this.roles[ roleName ],
      } : {}
    },
  },
  mounted() {
    this.loadMain()
  },
  methods: {
    loadMain() {
      this.$var('loadMain', true)
      $api.projects.partners.getMain(this.project.id).then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('loadMain', false)
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
