import mocks from './mocks'

export default class CustomApiData {
  projects = () => $api.iq.projects.get().filter({ projectId: null, }).sort([ 'id,asc', ])
  project = (id) => $api.iq.projects.get(id)
  objects = (projectId) => $api.iq.projects.get().filter({ projectId, })
  
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
}