/* eslint-disable max-len */

export default [
  { path: '', component: () => import('App'), children: [
    
    { path: '', component: () => import('layouts/main/Index'), children: [
      { path: '', name: 'index', icon: 'tachometer-alt', component: () => import('pages/index/Index'), },
      { path: 'user/:id', name: 'user', icon: 'user', parent: 'staff', component: () => import('pages/user/Index'), },
      { path: 'profile', name: 'profile', icon: 'user', parent: 'index', component: () => import('pages/profile/Index'), },
    
      { path: 'company', name: 'company.list', icon: 'file-alt', parent: 'index', component: () => import('pages/company/Index'), },
      { path: 'company/staff', name: 'company.staff', icon: 'users', parent: 'company.info', component: () => import('pages/company/Staff'), },
      { path: 'company/admins', name: 'company.admins', icon: 'user-shield', parent: 'company.info', component: () => import('pages/company/Admins'), },
      
      { path: 'projects', name: 'projects.list', icon: 'user', parent: 'index', component: () => import('pages/projects/index/Index'), },
      
      { path: 'notifications', name: 'notifications.list', icon: 'bell', parent: 'index', component: () => import('pages/notifications/Index'), },
      
      // { path: 'my/journals', name: 'journals.my', icon: 'user', parent: 'index', component: () => import('pages/journals/my/Index'), },
      // { path: 'journals/:id', name: 'journals.index', icon: 'user', parent: 'journals.my', component: () => import('pages/journals/index/Index'), },
      { path: 'journals/:id/add', name: 'records.create', icon: 'user', parent: 'journals.index', component: () => import('pages/records/create/Index'), },
      { path: 'journals/:id/add1', name: 'records.create1', icon: 'user', parent: 'journals.index', component: () => import('pages/records/create/Index1'), },
      { path: 'journals/:id/add2', name: 'records.create2', icon: 'user', parent: 'journals.index', component: () => import('pages/records/create/Index2'), },
    
      
      { path: 'journal', name: 'journals.index', icon: 'book', parent: 'index', component: () => import('pages/journal/index/Index'), },
      { path: 'journal/:id/project/:projectId', name: 'journals.spec', icon: 'book', parent: 'journals.index', component: () => import('pages/journal/index/spec/Index'), },
    ], },
    
    { path: '', component: () => import('layouts/auth/Index'), children: [
      { path: 'login', name: 'login', component: () => import('pages/auth/login/Index'), },
      { path: 'register/:token?', name: 'register', component: () => import('pages/auth/register/Index'), },
      { path: 'invite', name: 'invite', component: () => import('pages/auth/invite/Index'), },
      { path: 'recover', name: 'recover', component: () => import('pages/auth/password/Recover'), },
      { path: 'password', name: 'password', component: () => import('pages/auth/password/Change'), },
      { path: 'send', name: 'send', component: () => import('pages/auth/password/Send'), },
    ], },
    
  ], },
]

// const structure = {
//   'index': { icon: 'tachometer-alt', parent: '', access: [], },
//   'user': { icon: 'user', parent: 'staff', access: [], },
//   'profile': { icon: 'user', parent: 'index', access: [], },
//   'company.info': { icon: 'file-alt', parent: 'index', access: [], },
//   'company.staff': { icon: 'users', parent: 'company.info', access: [], },
//   'company.admins': { icon: 'user-shield', parent: 'company.info', access: [], },
//   'projects.list': { icon: 'user', parent: 'index', access: [], },
//   'journals.my': { icon: 'user', parent: 'index', access: [], },
//   'journals.index': { icon: 'user', parent: 'journals.my', access: [], },
//   'records.create': { icon: 'user', parent: 'journals.index', access: [], },
// }