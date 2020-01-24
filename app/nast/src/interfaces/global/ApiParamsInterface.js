
/**
 *
 */
export default class ApiParamsInterface {
  /**
   * @type {number}
   */
  page
  /**
   * @type {number}
   */
  size
  
  /**
   * Example: [ 'createdAt,desc', ].
   * @type {String[]}
   */
  sort
  
  /**
   * @type {string}
   */
  search
  
  /**
   * Example: { isPublished: true, type: 'in:article,news', }.
   * @type {Object}
   */
  filters
  
  /**
   * Example: { author: { fields: [ 'id', 'name', 'avatar', ], }, }.
   * @type {{ [relationName]: ApiConfigInterface, }}
   */
  with
  
  /**
   * Example: [ 'id', 'name', 'avatar', ].
   * @type {String[]}
   */
  fields = []
  
  /**
   * @type {boolean}
   */
  tree = false
  
  /**
   * @type {boolean}
   */
  all = false
  
  /**
   * @type {{ [paramName]: String, }}
   */
  query = {}
}
