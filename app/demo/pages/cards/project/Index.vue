<template>
  <div class="card-project">
    <n-modal-card :tabs="tabs" name="project" :loading="$var('loading')">
      <template #header>Карточка</template>
      <template #body>
        <n-divide class="body">
          <n-items class="content">
            <n-image class="avatar" mock alt="avatar" round />
          </n-items>
        </n-divide>
      </template>
      <template #tab.info>
        <n-items vertical>
          <n-input title="Имя" v-bind="$form.input('name')" />
          <n-input title="Адрес" v-bind="$form.input('address')" />
          <n-input title="Описание" v-bind="$form.input('description')" />
          <n-input title="Дата начала" v-bind="$form.input('startedAt')" />
          <n-input title="Предполагаемая дата окончания" v-bind="$form.input('endedAt')" />
        </n-items>
      </template>
    </n-modal-card>
  </div>
</template>

<script>
export default {
  name: 'CardProject',
  data() {
    return {
      tabs: [
        { name: 'info', title: 'Информация', },
        { name: 'structure', title: 'Структура', },
        { name: 'psd', title: 'Документация', },
        { name: 'partners', title: 'Подрядчики', },
        { name: 'participants', title: 'Участники', },
        { name: 'works', title: 'Работы', },
      ],
      model: {},
    }
  },
}
</script>

<style lang="scss" scoped>
.card-project {
  .body {
    .content {
      --n-items-margin: 10px;
    }
    
    & > .n-items > * {
      vertical-align: middle;
    }
    
    .avatar {
      width: 80px;
      height: 80px;
      --n-image-border: 3px solid #fff;
    }
  }

}
</style>
