<template>
  <n-modal class="modal-edit" @close="$emit('close')">
    <h3>Информация об участнике проекта</h3>
    <n-form>
      <n-items>
        <n-input title="Сотрудник" :value="participant.user.fullName" text />
        <n-input title="Должность на проекте" :value="participant.role" text />
        <!--        <n-upload title="Договор" :value.sync="file" />-->
        <n-form-item title="Обязанности" active>
          <n-divide class="table-tools" style="font-size: .8em">
            <n-button @click="$var('addAccess', true)">Добавить</n-button>
            <div></div>
          </n-divide>
          <n-table :data="accesses" :columns="columns" :loading="$var('load')" style="font-size: .8em">
            <template #type="{item}">
              {{ typeNames[item.type] }}
            </template>
            <template #scope="{item}">
              <template v-if="item.type === 'special'">
                <template v-if="item.specTypes.length">
                  <div v-for="i in item.specTypes" :key="i" style="line-height: 1.1; padding-bottom: 5px">{{ specTypeNames[i] }}</div>
                </template>
                <template v-else>Все роли в спец. журналах</template>
              </template>
              <template v-else-if="[ 'assignee', 'manager', ].includes(item.type)">-</template>
              <template v-else>
                <span style="font-size: .9em; opacity: .9;">[{{ structureNames[item.section ? item.section.types : 'project'] }}]</span>
                {{ item.section ? item.section.name : project.name }}
              </template>
            </template>
            <template #workTypes="{item}">
              <template v-if="[ 'special', 'assignee', 'manager', ].includes(item.type)">-</template>
              <template v-else>
                <template v-if="item.workTypes.length">
                  <div v-for="i in item.workTypes" :key="i.id" style="line-height: 1.1; padding-bottom: 5px">{{ i.name }}</div>
                </template>
                <template v-else>Все виды работ</template>
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
    
    <modal-add-access v-if="$var('addAccess')" :project="project" :participant="participant" @submit="loadData" @close="$var('addAccess', false)" />
  </n-modal>
</template>

<script>
import ModalAddAccess from './ModalAddAccess'

export default {
  name: 'ModalEdit',
  components: { ModalAddAccess, },
  props: [ 'project', 'participant', ],
  data: () => ({
    file: null,
    accesses: [],
    columns: [
      { name: 'type', title: 'Тип', },
      { name: 'scope', title: 'Область ответственности', },
      { name: 'workTypes', title: 'Виды работ', },
      { name: 'tools', title: '', },
    ],
    specTypeNames: {
      priemka_antikorroziinih_rabot: 'Ответственный за приемку антикоррозийных работ',
      brigadir_po_postanovke_boltov: 'Бригадир команды по постановке болтов',
      otvetstvennii_za_postanovku_boltov: 'Ответсвенный за постановку болтов',
      brigadir_po_zamonolichivaniy: 'Бригадир команды по замоноличиванию монтажных стыков и узлов',
    },
    typeNames: {
      assignee: 'Представитель организации',
      manager: 'Редактирование проекта',
      executor: 'Ведение журнала',
      approver: 'Утверждение записей в журнале',
      special: 'Спец. журналы',
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
  },
  methods: {
    loadData() {
      this.$var('load', true)
      $api.projects.accesses.participants.get(this.participant.id).then((result) => {
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
