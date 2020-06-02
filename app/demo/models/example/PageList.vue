<template>
  <div class="page-list">
    <n-card>
      <n-divide class="tools" style="margin-bottom: 10px;">
        <div></div>
        <div><n-button icon="plus" @click="$var('create', true)">Создать компанию</n-button></div>
      </n-divide>
      <n-table :data="$d.get('companies')" :loading="$d.loading('companies')" :columns="columns">
        <template #tools="{item}">
          <n-link :to="{ query: { modal: 'company', id: item.id, },}"><n-button icon="pen" flat round /></n-link>
        </template>
      </n-table>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'PageList',
}
</script>

<style lang="scss" scoped>
  .page-list {
    
  }
</style>
