// types by api


export default {
  // { value: 1, title: '', address: '', }
  'objects': {
    value: (value) => {
      return `${value.title}, ${value.address}`
    },
  },
  'works': {
    value: (value) => {
      return value.title
    },
  },
  // records,{work},type
  'records': {
    select: false,
    component: 'textarea',
    url: (field, values, params) => {
      return `records,${values.work ? values.work.id : 1},${params[2]}`
    },
  },
  // assignee,type
  'assignee': {
    url: (field, values, params) => {
      return `assignee,${params[1]}`
    },
  },
  // people,partnerAccessName,participantAccessName,isMain
  // 'people': {
  //   url: (field, values, params) => {
  //     return `assignee,${params[1]}`
  //   },
  // },
  default: {
    select: true,
    component: 'input',
    url: (field, values) => field.api,
    value: (value) => value.display === undefined ? value.title : value.display,
  },
}
