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
  
    <n-modal v-if="$var('add')" :loading="$var('loadingAdd')" @close="$var('add', false)">
      <n-items>
        <n-input title="ИИН" v-bind="$form.input('iin')" />
        <n-input title="E-mail" v-bind="$form.input('email')" />
        <n-input title="Должность" v-bind="$form.input('position')" />
        <n-button color="primary" wide @click="submit">Отправить приглашение</n-button>
      </n-items>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'TabStaff',
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
