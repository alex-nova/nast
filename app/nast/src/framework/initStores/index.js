
export default (libs) => {
  const stores = {}
  
  $n.map(libs, (lib, name) => {
    if (lib.installStore) {
      stores[name] = lib.installStore()
    }
  })
  
  return stores
}
