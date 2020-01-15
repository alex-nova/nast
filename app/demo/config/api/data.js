
export default class CustomApiData {
  projects = () => $api().projects.get()
  project = (id) => $api().projects.get(id)
  objects = (projectId) => $api().projects.get().filters({ projectId, })
}
