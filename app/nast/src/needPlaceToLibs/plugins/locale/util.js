
export const checkRoute = (route) => {
}

export const getRightRoute = (route, locale = $app.cookie.get('locale')) => {
  return {
    ...route,
    query: {
      ...route.query,
      l: locale,
    },
  }
}

export const checkApiExist = (options) => {
  if (!options.api || !options.api.getElements || !options.api.getLocales) {
    console.error('Plugin locale: Api not found!')
  }
  
  if (!options) {
    options = {}
  }
  if (!options.api) {
    options.api = {}
  }
  if (!(options.api.getElements instanceof Function)) {
    options.api.getElements = (locale) => new Promise((resolve, reject) => {
      setTimeout(() => resolve({ data: {}, }), 100)
    })
  }
  if (!(options.api.getLocales instanceof Function)) {
    options.api.getLocales = (locale) => new Promise((resolve, reject) => {
      setTimeout(() => resolve({ data: [ { code: 'undefined', }, ], }), 100)
    })
  }
  if (!(options.api.setLocale instanceof Function)) {
    options.api.setLocale = (locale) => new Promise((resolve, reject) => {
      setTimeout(() => resolve({ data: false, }), 100)
    })
  }
  return options
}
