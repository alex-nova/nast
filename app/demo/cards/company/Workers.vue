<template>
  <div class="tab-info">
    <n-divide class="tools">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить сотрудника</n-button></div>
    </n-divide>
    <n-table :data="staff" :columns="columns" :loading="$var('loading')">
      <template #tools="{item}">
        <n-link :to="{ query: { modal: 'user', id: item.user.id, },}"><n-button icon="pen" flat round /></n-link>
      </template>
    </n-table>
    
    <CardCompanyInvite v-if="$var('add')" :company-id="companyId" @close="$var('add', false)" @submit="load" />
  </div>
</template>

<script>
import CardCompanyInvite from './modals/Invite'

export default {
  name: 'TabWorkers',
  components: { CardCompanyInvite, },
  props: [ 'companyId', ],
  data() {
    return {
      staff: [],
      columns: [
        { title: 'ФИО', name: 'user.fullName', },
        { title: 'ИИН', name: 'user.iin', },
        { title: 'E-mail', name: 'user.email', },
        { title: 'Телефон', name: 'user.phone', },
        { title: 'Должность', name: 'position', },
        { title: '', name: 'tools', align: 'center', width: '100px', },
      ],
    }
  },
  created() {
    this.$form.init({
      iin: '',
      email: '',
      position: '',
    })
    this.$form.rules({
      iin: [ 'required', ],
      email: [ 'required', ],
      position: [ 'required', ],
    })
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('loading', true)
      $api.companies.workers.get(this.$route.query.id).then((response) => {
        this.staff = response.data.content
        this.$var('loading', false)
      })
    },
    submit(e) {
      if (this.$form.check()) {
        this.$var('loadingAdd', true)
        setTimeout(() => {
          this.$var('loadingAdd', false)
          setTimeout(() => {
            this.$var('add', false)
          }, 300)
        }, 1000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-info {
    font-size: .9em;
    .tools {
      margin-bottom: 10px;
    }
  }
</style>
