
export default {
  routes: [
    { path: '', component: () => import('../../App'), children: [
      
      { path: '', component: () => import('../../layouts/main/Index'), children: [
        { path: '', name: 'index', icon: 'tachometer-alt', component: () => import('../../pages/index/Index'), },
      ], },
      
      { path: '', component: () => import('../../layouts/auth/Index'), children: [
        { path: 'login', name: 'login', component: () => import('../../pages/auth/login/Index'), },
        { path: 'register', name: 'register', component: () => import('../../pages/auth/register/Index'), },
        { path: 'invite', name: 'invite', component: () => import('../../pages/auth/invite/Index'), },
        { path: 'recover', name: 'recover', component: () => import('../../pages/auth/password/Recover'), },
        { path: 'password', name: 'password', component: () => import('../../pages/auth/password/Change'), },
        { path: 'send', name: 'send', component: () => import('../../pages/auth/password/Send'), },
      ], },
    
    ], },
  ],
  pages: {
    index: { icon: 'tachometer-alt', route: 'index', parent: null, },
  
    projects: { icon: 'sitemap', route: '', parent: null, },
    settings: { icon: 'cog', route: '', parent: null, },
    notifications: { icon: 'bell', route: '', parent: null, },
    journals: { icon: 'book', route: '', parent: null, },
    info: { icon: 'file-alt', route: '', parent: null, },
    peoples: { icon: 'user-friends', route: '', parent: null, },
    companySettings: { icon: 'cog', route: '', parent: null, },
  },
}
