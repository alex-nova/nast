
export default [
  { path: '', component: () => import('App'), children: [
    
    { path: '', component: () => import('layouts/main/Index'), children: [
      { path: '', name: 'index', icon: 'tachometer-alt', component: () => import('pages/index/Index'), },
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
