import Model from 'nast/src/libs/Data/Model'

/**
 *
 */
export default class ModelProject extends Model {
  id
  title = ''
  address = ''
  desc = ''
  createdAt
  startedAt
  endedAt
  projectId
  rootId
  
  _rules() {
    return {
      title: [ 'required', 'string', 'max:255', ],
      address: [ 'required', 'max:255', ],
      desc: [ 'required', 'max:255', ],
    }
  }
  
  _mapper() {
    return {
      title: (d) => d.name,
      desc: 'description',
    }
  }
  
  _toPost(type) {
    return [
      { name: (d) => d.title, },
      'address',
      { description: 'desc', },
      'createdAt',
      'endedAt',
    ]
  }
}
