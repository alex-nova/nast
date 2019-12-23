<template>
  <div class="page-company-staff">
  
    <n-card :loading="$toggler.loading">
      <div class="tools">
        <n-button icon="plus" @click="$toggle('add', true)">Добавить сотрудника</n-button>
      </div>
      <n-table :data="staff" :columns="columns">
        <template #tools="{item}">
          <n-link :to="{name: 'user', params: {id: item.id}}"><n-button icon="pen" flat round /></n-link>
        </template>
      </n-table>
    </n-card>
    
    <n-modal v-if="$toggler.add" @close="$toggle('add', false)" :loading="$toggler.loadingAdd">
      <div class="items">
        <n-input title="ИИН" v-bind="$inputs.input('iin')" />
        <n-input title="E-mail" v-bind="$inputs.input('email')" />
        <n-input title="Должность" v-bind="$inputs.input('position')" />
      </div>
      <n-items>
        <n-button color="primary" @click="submit" wide>Отправить приглашение</n-button>
      </n-items>
    </n-modal>
  </div>
</template>

<script>
export default {
  name: 'PageCompanyStaff',
  data: () => ({
    staff: [],
    columns: [
      { title: 'ФИО', name: 'fullName', },
      { title: 'ИИН', name: 'iin', },
      { title: 'E-mail', name: 'email', },
      { title: 'Телефон', name: 'phone', },
      { title: 'Должность', name: 'position', },
      { title: '', name: 'tools', align: 'center', width: '100px', },
    ],
  }),
  created() {
    this.$inputs.init({
      iin: '',
      email: '',
      position: '',
    })
    this.$inputs.rules({
      iin: [ 'required', ],
      email: [ 'required', ],
      position: [ 'required', ],
    })
  },
  mounted() {
    this.$toggle('loading', true)
    $api.users.get().then((response) => {
      this.staff = response.data
      this.$toggle('loading', false)
    })
  },
  methods: {
    submit(e) {
      if (this.$inputs.check()) {
        this.$toggle('loadingAdd', true)
        setTimeout(() => {
          this.$toggle('loadingAdd', false)
          setTimeout(() => {
            this.$toggle('add', false)
          }, 300)
        }, 1000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-company-staff {
  .tools {
    margin: 10px 0;
    text-align: right;
  }
  .n-link {
    color: inherit;
  }
  .items {
    &>* {
      margin: 15px 0;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .n-items {
    margin-top: 25px;
  }
}
</style>
