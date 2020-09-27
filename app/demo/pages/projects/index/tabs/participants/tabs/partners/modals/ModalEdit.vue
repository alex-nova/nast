<template>
  <n-modal class="modal-edit" @close="$emit('close')">
    <h3>Информация о подрядчике</h3>
    <n-form>
      <n-items>
        <n-input title="Компания" :value="partner.company.title" text />
        <!--        <n-upload title="Договор" :value.sync="file" />-->
        <n-form-item title="Полномочия" active>
          <n-divide class="table-tools" style="font-size: .8em">
            <n-button @click="$var('addAccess', true)">Добавить</n-button>
            <div></div>
          </n-divide>
          <n-table :data="accesses" :columns="columns" :loading="$var('load')" style="font-size: .8em">
            <template #owner="{item}">
              <template v-if="item.owner">
                {{ item.owner.company.title }}
                <span style="font-size: .9em; opacity: .9;">[{{ item.owner.company.bin }}]</span>
              </template>
              <template v-else>-</template>
            </template>
            <template #type="{item}">
              {{ item.type.title }}
            </template>
            <template #section="{item}">
              <template v-if="item.section">
                <span style="font-size: .9em; opacity: .9;">[{{ structureNames[item.section.type] }}]</span>
                {{ item.section.title }}
              </template>
              <template v-else>
                Весь проект
              </template>
            </template>
            <template #workTypes="{item}">
              <template v-if="item.workTypes.length">
                <div v-for="i in item.workTypes" :key="i.id" style="line-height: 1.1; padding-bottom: 5px">
                  {{ i.title }}
                </div>
              </template>
              <template v-else>
                Все виды работ
              </template>
            </template>
            <template #tools="{item}">
              <n-button v-if="canDelete(item)" flat round icon="trash" @click="remove(item)" />
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
      $api.iq.accesses.partners.get(this.partner.id).then((result) => {
        this.accesses = result.data.content
      }).finally(() => {
        this.$var('load', false)
      })
    },
    remove(access) {
      this.$var('load', true)
      $api.iq.accesses.delete(access.id).then(() => {
        this.loadData()
      }).finally(() => {
        this.$var('load', true)
      })
    },
    canDelete(item) {
      return item.owner?.company?.id === $app.store.getter('app.company').id
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
