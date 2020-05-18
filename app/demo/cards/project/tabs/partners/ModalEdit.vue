<template>
  <n-modal class="modal-edit" @close="$emit('close')">
    <h3>Информация о подрядчике</h3>
    <n-form>
      <n-items>
        <n-input title="Компания" :value="partner.company.name" text />
        <!--        <n-upload title="Договор" :value.sync="file" />-->
        <n-form-item title="Обязанности" active>
          <n-divide class="table-tools" style="font-size: .8em">
            <n-button @click="$var('addAccess', true)">Добавить</n-button>
            <div></div>
          </n-divide>
          <n-table :data="accesses" :columns="columns" :loading="$var('load')" style="font-size: .8em">
            <template #owner="{item}">
              <template v-if="item.owner">
                {{ item.owner.company.name }}
                <span style="font-size: .9em; opacity: .9;">[{{ item.owner.company.bin }}]</span>
              </template>
              <template v-else>-</template>
            </template>
            <template #type="{item}">
              {{ typeNames[item.type] }}
            </template>
            <template #section="{item}">
              <span style="font-size: .9em; opacity: .9;">[{{ structureNames[item.section ? item.section.types : 'project'] }}]</span>
              {{ item.section ? item.section.name : project.name }}
            </template>
            <template #workTypes="{item}">
              <template v-if="item.workTypes.length">
                <div v-for="i in item.workTypes" :key="i.id" style="line-height: 1.1; padding-bottom: 5px">
                  {{ i.name }}
                </div>
              </template>
              <template v-else>
                Все виды работ
              </template>
            </template>
            <template #tools="{item}">
              <n-button flat round icon="trash" @click="remove(item)" />
            </template>
          </n-table>
        </n-form-item>
      </n-items>
      <n-divide>
        <div></div>
        <n-button style="margin-top: 10px;" @click="$emit('close')">Закрыть</n-button>
      </n-divide>
    </n-form>
    
    <modal-add-access v-if="$var('addAccess')" :project="project" :partner="partner" @submit="loadData" @close="$var('addAccess', false)" />
  </n-modal>
</template>

<script>
import ModalAddAccess from './ModalAddAccess'

export default {
  name: 'ModalEdit',
  components: { ModalAddAccess, },
  props: [ 'project', 'partner', ],
  data: () => ({
    file: null,
    accesses: [],
    columns: [
      { name: 'owner', title: 'Владелец подряда', },
      { name: 'type', title: 'Тип', },
      { name: 'section', title: 'Структура', },
      { name: 'workTypes', title: 'Виды работ', },
      { name: 'tools', title: '', },
    ],
    typeNames: {
      executor: 'Исполнитель',
      author: 'Авторский надзор',
      tech: 'Технический надзор',
      projector: 'Проектировщик',
    },
    structureNames: {
      section: 'Раздел',
      construction: 'Конструкция',
      object: 'Объект',
      project: 'Проект',
    },
  }),
  created() {
    this.loadData()
    this.$form.init()
  },
  methods: {
    loadData() {
      this.$var('load', true)
      $api.projects.accesses.partners.get(this.partner.id).then((result) => {
        this.accesses = result.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    remove(access) {
      this.$var('load', true)
      $api.projects.accesses.delete(access.id).then(() => {
        this.loadData()
      }).finally(() => {
        this.$var('load', true)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .modal-edit {
    &::v-deep > .n-wrapper {
      width: 800px;
      left: calc(50% - 400px);
    }
  }
</style>
