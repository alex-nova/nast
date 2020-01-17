import mocks from './mocks'

export default class CustomApiData {
  projects = () => $api.projects.get().filters({ projectId: null, }).sort([ 'id,asc', ])
  project = (id) => $api.projects.get(id)
  objects = (projectId) => $api.projects.get().filters({ projectId, })
  
  types = () => {
    return $app.api.get([ 'types', ]).mock(() => {
      return $n.reverse(mocks.types)
    })
  }
  projectFiles = (id) => {
    return $app.api.get([ 'projects/{}/files', id, ]).mock(() => {
      return $n.reverse(mocks.docs)
    })
  }
  projectFiles2 = (id) => {
    return $app.api.get([ 'projects/{}/files', id, ]).mock(() => {
      return $n.reverse(mocks.docs2)
    })
  }
  materials = (id) => {
    return $app.api.get([ 'projects/{}/files', id, ]).mock(() => {
      return $n.reverse(mocks.materials)
    })
  }
  works = (id) => {
    return $app.api.get([ 'projects/{}/files', id, ]).mock(() => {
      return $n.reverse(mocks.works)
    })
  }
}
