<template>
  <div class="page">
    <div class="document">
      <div class="content">
        <h3>{{ d.title }}</h3>
        <p class="info">
          <span>&nbsp;</span>
          <span class="date">«_____» ______________ 20_____ г.</span>
        </p>
        <p>
          <c-field :editable="editable" tip="(наименование работ)" />
          выполненных в <c-field :editable="editable" tip="(наименование и место расположения объекта)" />.<br />
        </p>
        <p>
          <b>Комиссия в составе:</b><br />
          представителя строительно-монтажной организации <c-field :editable="editable" tip="(наименование организации, должность, фамилия, и.о.)" /><br />
          представителя технического надзора заказчика <c-field :editable="editable" tip="(наименование организации, должность, фамилия, и.о.)" /><br />
          представителя проектной организации <c-field :editable="editable" tip="(наименование организации, должность, фамилия, и.о.)" />
        </p>
        <p>
          <b>произвела осмотр конструкций и проверку качества работ, выполненных</b> <c-field :editable="editable" tip="(наименование строительно-монтажной организации)" /><br />
          <b>и составила настоящий акт о нижеследующем:</b><br />
          1. К приемке предъявлены следующие конструкции <c-field :editable="editable" tip="(перечень и краткая характеристика конструкций)" /><br />
          2. Работы выполнены по проектной документации <c-field :editable="editable" tip="(наименование проектной организации, номер чертежей и дата их составления)" /><br />
          3. При выполнении работ отсутствуют (или допущены) отклонения от проектной документации <c-field :editable="editable" tip="(при наличии отклонений указывается, кем согласованы, номер чертежей и дата согласования)" /><br />
          4. Даты: начало работ <c-field :editable="editable" /><br />
          окончание работ<c-field :editable="editable" /><br />
        </p>
        <h3 class="title">Решение комиссии</h3>
        <p>
          Работы выполнены в соответствии с проектной документацией, требованиями действующих нормативных документов. Конструкции принимаются.<br />
          На основании изложенного разрешается производство последующих работ по устройству (монтажу)<br />
          <c-field :editable="editable" tip="(наименование последующих работ и конструкций)" />
        </p>
        <p>
          Представитель строительно-монтажной организации <c-field :editable="editable" tip="Подпись" /><br />
          Представитель технического надзора заказчика <c-field tip="Подпись" /><br />
          Представитель эксплуатационной организации <c-field tip="Подпись" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CField from './Field'

export default {
  name: 'Index',
  components: { CField, },
  data: () => ({
    editable: true,
    d: {
      title: 'Акт о проведении приемочного гидравлического испытания безнапорного трубопровода на герметичность',
    },
  }),
}
</script>

<style lang="scss" scoped>
  .page {
    .document {
      background: white;
      border: 1px solid #eee;
      box-shadow: 1px 1px 2px rgba(127, 127, 127, .5);
      margin: 30px;
      padding: 30px 100px;
      font-size: .8em;
      
      .info {
        span.date {
          float: right;
        }
      }
      h3 {
        font-weight: bold;
        width: 100%;
        text-align: center;
        margin: 40px 0 30px;
      }
      p {
        line-height: 2.2;
      }
      
    }
  }
</style>
