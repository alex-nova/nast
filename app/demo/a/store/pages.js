
export default {
  namespaced: true,
  state: {
    pages: {
      index: { icon: 'tachometer-alt', route: 'index', parent: null, },
      
      projects: { icon: 'sitemap', route: '', parent: null, },
      settings: { icon: 'cog', route: '', parent: null, },
      notifications: { icon: 'bell', route: '', parent: null, },
      journals: { icon: 'book', route: '', parent: null, },
      info: { icon: 'file-alt', route: '', parent: null, },
      peoples: { icon: 'user-friends', route: '', parent: null, },
      companySettings: { icon: 'cog', route: '', parent: null, },
    },
    
    navigation: [
      { name: 'index', },
      { name: 'projects', },
      { title: 'company', icon: 'building', children: [
        { name: 'info', },
        { name: 'peoples', },
        { name: 'companySettings', },
      ], },
      { name: 'notifications', },
      { name: 'journals', },
      { name: 'settings', },
    ],
    
    titles: {
      index: 'Главная страница',
      componentsGroup: 'Компоненты',
      components: 'Все компоненты',
      button: 'Button',
      dropdown: 'Dropdown',
      input: 'Input',
      loader: 'Loader',
      select: 'Select',
      list: 'List',
      directives: 'Директивы',
      konstructor: 'Конструктор',
      
      baseComponentsGroup: 'Базовые компоненты',
      popup: 'Popup',
      progress: 'Progress',
  
      projects: 'Проекты',
      company: 'Компания',
      notifications: 'Уведомления',
      journals: 'Журналы',
      settings: 'Настройки',
      info: 'Информация',
      peoples: 'Сотрудники',
      companySettings: 'Настройки',
    },
  },
  
  getters: {
    navigation: (state) => {
      const reducer = (result, item) => {
        const isGroup = Boolean(item.children)
        const page = isGroup ? item : state.pages[item.name]
        
        result.push({
          title: state.titles[item.name],
          icon: page.icon,
          route: page.route,
          children: isGroup ? page.children.reduce(reducer, []) : undefined,
        })
        
        return result
      }
      
      return state.navigation.reduce(reducer, [])
    },
    getPage: (state) => (name) => {
      return {
        title: state.titles[name],
        ...state.pages[name],
      }
    },
    structureByName: (state) => (name) => {
      const result = []
      
      let item
      let n = name
      while (n) {
        item = state.pages[n]
        result.push({
          title: state.titles[n],
          ...item,
        })
        n = item.parent
      }
      return result.reverse()
    },
  },
}
