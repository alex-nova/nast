<template>
  <div class="tab-info">
    <n-divide class="tools">
      <div></div>
      <div><n-button @click="$var('add', true)">Добавить сотрудника</n-button></div>
    </n-divide>
    <n-table :data="staff" :columns="columns" :loading="$var('loading')">
      <template #tools="{item}">
        <n-link :to="{ query: { modal: 'user', id: item.id, },}"><n-button icon="pen" flat round /></n-link>
      </template>
    </n-table>
    
    <CardCompanyInvite v-if="$var('add')" :company-id="companyId" @close="$var('add', false)" />
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
        { title: 'ФИО', name: 'fullName', },
        { title: 'ИИН', name: 'iin', },
        { title: 'E-mail', name: 'email', },
        { title: 'Телефон', name: 'phone', },
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
    this.$var('loading', true)
    $api.companies.workers.get(this.$route.query.id).then((response) => {
      this.staff = response.data.content
      this.$var('loading', false)
    })
  },
  methods: {
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
