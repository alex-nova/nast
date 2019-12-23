
export default [
  { path: '', component: () => import('App'), children: [
    
    { path: '', component: () => import('layouts/main/Index'), children: [
      { path: '', name: 'index', icon: 'tachometer-alt', component: () => import('pages/index/Index'), },
      { path: 'company', name: 'info', icon: 'file-alt', parent: 'index', component: () => import('pages/company/Index'), },
      { path: 'company/staff', name: 'staff', icon: 'users', parent: 'info', component: () => import('pages/company/Staff'), },
      { path: 'company/admins', name: 'admins', icon: 'user-shield', parent: 'info', component: () => import('pages/company/Admins'), },
      { path: 'user/:id', name: 'user', icon: 'user', parent: 'staff', component: () => import('pages/user/Index'), },
      { path: 'profile', name: 'profile', icon: 'user', parent: 'index', component: () => import('pages/profile/Index'), },
    ], },
    
    { path: '', component: () => import('layouts/auth/Index'), children: [
      { path: 'login', name: 'login', component: () => import('pages/auth/login/Index'), },
      { path: 'register', name: 'register', component: () => import('pages/auth/register/Index'), },
      { path: 'invite', name: 'invite', component: () => import('pages/auth/invite/Index'), },
      { path: 'recover', name: 'recover', component: () => import('pages/auth/password/Recover'), },
      { path: 'password', name: 'password', component: () => import('pages/auth/password/Change'), },
      { path: 'send', name: 'send', component: () => import('pages/auth/password/Send'), },
    ], },
    
  ], },
]
