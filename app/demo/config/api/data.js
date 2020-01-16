import mocks from './mocks'

export default class CustomApiData {
  projects = () => $api.projects.get().filters({ projectId: null, })
  project = (id) => $api.projects.get(id)
  objects = (projectId) => $api.projects.get().filters({ projectId, })
  
  projectFiles = (id) => {
    return $app.api.get([ 'projects/{}/files', id, ]).mock(() => {
      return mocks.docs
    })
  }
}
