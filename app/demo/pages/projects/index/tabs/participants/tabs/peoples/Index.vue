<template>
  <div class="tab-peoples">
    <n-divide class="table-tools">
      <div></div>
      <n-button @click="() => this.$var('add', true)">Добавить</n-button>
    </n-divide>
    
    <n-table :data="data" :columns="columns" :loading="$var('load')">
      <template #participant="{item}">
        <div class="user">
          <div class="avatar"><n-image centered round :src="item.user.avatar || avatar" /></div>
          <div class="name">
            {{ item.user.fullName }} <span style="opacity: .8;font-size: .8em">[{{ item.user.iin }}]</span>
          </div>
        </div>
      </template>
      <template #company="{item}">
        {{ item.company.title }} <span style="opacity: .8;font-size: .8em">[{{ item.company.bin }}]</span>
      </template>
      <template #createdAt="{item}">
        {{ $app.date.format(item.createdAt) }}
      </template>
      <template #rights="{item}">
        <n-button flat round icon="eye" @click="$var('edit', item)" />
      </template>
    </n-table>
    
    <modal-add v-if="$var('add')" :project="project" @submit="add" @close="$var('add', false)" />
    <modal-edit v-if="$var('edit')" :participant="$var('edit')" :project="project" @close="$var('edit', false)" />
  </div>
</template>

<script>
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'
import avatar from 'assets/images/avatar.png'

export default {
  name: 'TabPeoples',
  components: { ModalEdit, ModalAdd, },
  props: [ 'project', 'my', ],
  data() {
    return {
      avatar,
      showAll: false,
      data: [],
    }
  },
  computed: {
    columns() {
      const columns = [
        { name: 'participant', title: 'Сотрудник', },
        { name: 'company', title: 'Компания', },
        { name: 'role', title: 'Должность на проекте', },
        { name: 'createdAt', title: 'Дата назначения', },
      ]
      if (this.my && !this.$var('load')) {
        columns.push({ name: 'rights', title: '', })
      }
      return columns
    },
  },
  watch: {
    showAll() {
      this.$nextTick(() => {
        this.load()
      })
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$var('load', true)
      const api = $api.iq.participants.get(this.project.id)
      if (this.my) {
        api.filter({ company: $app.store.getter('app.company').id, })
      }
      api.then((response) => {
        this.data = response.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    add(worker) {
      this.load()
      this.$var('edit', worker)
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab-peoples {
    .user {
      .avatar {
        float: left;
        margin-right: 8px;
        --n-image-width: 48px;
        --n-image-height: 48px;
      }
    }
  }
</style>
