import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth-layout/auth.component';
import { BlankComponent } from './layouts/blank-layout/blank.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [() => import('./core/guards/logout.guard').then(m => m.logoutGuard)],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full', title: 'login' },
      {
        path: 'login',
        loadComponent: () => import('./component/login/login.component').then(m => m.LoginComponent),
        title: 'login'
      },
      {
        path: 'register',
        loadComponent: () => import('./component/register/register.component').then(m => m.RegisterComponent),
        title: 'register'
      },
      {
        path: 'forget password',
        loadComponent: () => import('./component/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
        title: 'forget password'
      },
    ]
  },
  {
    path: '',
    component: BlankComponent,
    canActivate: [() => import('./core/guards/authentication-g.guard').then(m => m.authenticationGGuard)],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', title: 'home' },
      {
        path: 'home',
        loadComponent: () => import('./component/home/home.component').then( c =>c.HomeComponent),
        title: 'home'
      },
      {
        path: 'shop',
        loadComponent: () => import('./component/shop/shop.component').then(m => m.ShopComponent),
        title: 'shop'
      },
      {
        path: 'categories',
        loadComponent: () => import('./component/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'category'
      },
      {
        path: 'brands',
        loadComponent: () => import('./component/brands/brands.component').then(m => m.BrandsComponent),
        title: 'brands'
      },
      {
        path: 'favorite',
        loadComponent: () => import('./component/favorite/favorite.component').then(m => m.FavoriteComponent),
        title: 'favorite'
      },
      {
        path: 'setting',
        loadComponent: () => import('./component/setting/setting.component').then(m => m.SettingComponent),
        title: 'setting'
      },
      {
        path: 'cart',
        loadComponent: () => import('./component/cart/cart.component').then(m => m.CartComponent),
        title: 'cart'
      },
      {
        path: 'product details/:id',
        loadComponent: () => import('./component/product-details/product-details.component').then(m => m.ProductDetailsComponent),
        title: 'Product Details'
      },
      {
        path: 'allorders',
        loadComponent: () => import('./component/allorders/allorders.component').then(m => m.AllordersComponent),
        title: 'all orders'
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./component/orders/orders.component').then(m => m.OrdersComponent),
        title: 'shipping address'
      },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./component/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: 'page not found'
  },
];
