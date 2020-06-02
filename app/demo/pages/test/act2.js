const apis = [
  'assignee/{accessName}',
  'acts/{actId}/{variable}',
  'dictionaries/{name}',
]
const types = [
  'predefined',
  'select',
  'string',
]


// данные приходят с бэка для создания или редактирования акта
export default {
  id: 21,
  name: 'hydraulicPressureTestPipelineTightness',
  title: 'Акт о проведении приемочного гидравлического испытания безнапорного трубопровода на герметичность',
  signers: [
    { name: 'executor', title: 'Представитель строительно-монтажной организации', fromData: true, },
    { name: 'tech', title: 'Представитель технического надзора заказчика', fromData: true, },
    { name: 'expl', title: 'Представитель эксплуатационной организации', fromData: true, },
    { name: 'commision', title: 'Член комиссии', fromData: true, isArray: true, },
  ],
  fields: {
    executor: {
      type: 'predefined',
    },
    tech: {
      type: 'predefined',
    },
    expl: {
      type: 'link',
      api: 'assignee/executor',
    },
    comission: {
      type: 'array',
      api: 'assignee/all',
    },
    objectInfo: {
      type: 'string',
    },
    allowableVolume: {
      type: 'link',
      api: 'acts/21/allowableVolume',
    },
  },
  values: {
    executor: '"ТОО" Генеральный подрядчик, Директор, Красилов А. Д.',
    tech: '"ТОО" Технический надзор, Директор, Красилов А. Д.',
    expl: { id: 1, title: '"ТОО" Подрядчик, Директор, Красилов А. Д.', },
    comission: [
      { id: 1, title: '', },
      { id: 2, title: '', },
    ],
    objectInfo: null,
    allowableVolume: null,
  },
  content: `
        <p>
          Комиссия в составе представителей:<br />
          строительно-монтажной организации (**executor**(наименование организации, должность, фамилия, и.о.)**),<br />
          технического надзора заказчика (**executor**(наименование организации, должность, фамилия, и.о.)**),<br />
          эксплуатационной организации (**executor**(наименование организации, должность, фамилия, и.о.)**)<br />
          составили настоящий акт о проведении приемочного гидравлического испытания участка безнапорного трубопровода
          (**executor**(наименование объекта, номера пикетов на его границах, длина и диаметр)**).
        </p>
        <p>
          Уровень грунтовых вод в месте расположения верхнего колодца находится на расстоянии (**executor**)м
          от верха трубы в нем при глубине заложения труб (до верха)(**executor**)м.
        </p>
        <p>
          Испытание трубопровода производилось (**executor**(указать совместно или отдельно от колодцев и камер)**) способом
          (**executor**(указать способ испытания - добавлением воды в трубопровод или притоком грунтовой воды в него)**).
        </p>
        <p>
          Гидростатическое давление величиной (**executor**)м вод.ст. Создавалось заполнением водой
          (**executor**(указать номер колодца или установленного в нем стояка)**).
        </p>
        <p>
          добавленной в трубопровод воды, приток грунтовой воды
          Допустимый объем (**allowableVolume**(выбрать нужное)**) на 10 м длины трубопровода за время
          испытания 30 мин. равен (**executor**)л.<br />
          Фактический (**executor**(выбрать нужное)**) составил (**executor**)л, или в
          пересчете на 10 м длины трубопровода (с учетом испытания совместно с колодцами, камерами) и продолжительности испытания в течение 30 мин.
          составил (**executor**), что меньше допустимого расхода.
        </p>
  
        (**signers**executor**tech**)
        <h3>Решение комиссии</h3>
        <p>Трубопровод признается выдержавшим приемочное гидравлическое испытание на герметичность.</p>
        (**signers**expl**)
`,
}