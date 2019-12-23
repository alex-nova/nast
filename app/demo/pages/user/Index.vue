 <template>
  <div class="page-user-index">
  
    <n-card :loading="$toggler.loading">
      <div class="items">
        <n-input title="Компания" v-bind="$inputs.input('company.name')" text />
        <n-input title="ФИО" v-bind="$inputs.input('fullName')" />
        <n-input title="ИИН" v-bind="$inputs.input('iin')" />
        <n-input title="E-mail" v-bind="$inputs.input('email')" />
        <n-input title="Телефон" v-bind="$inputs.input('phone')" />
        <n-input title="Должность" v-bind="$inputs.input('position')" />
      </div>
      <n-items>
        <n-button v-if="!$inputs.editable()" color="primary" @click="$inputs.edit">Редактировать</n-button>
        <n-button v-if="$inputs.editable()" color="success" @click="save">Сохранить</n-button>
        <n-button v-if="$inputs.editable()" flat @click="() => { $inputs.reset(); $inputs.edit() }">Отмена</n-button>
      </n-items>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageUserIndex',
  data: () => ({
  }),
  mounted() {
    this.$toggle('loading', true)
    const relations = {
      company: { fields: [ 'id', 'title', ], },
    }
    $api.users.get(this.$route.params.id).with(relations).then((request) => {
      this.$toggle('loading', false)
      this.$inputs.init(request.data, false)
    })
  },
  methods: {
    save() {
      if (this.$inputs.check()) {
        this.$toggle('loading', true)
        setTimeout(() => {
          this.$inputs.edit(false)
          this.$toggle('loading', false)
        }, 1500)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-user-index {
  
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
