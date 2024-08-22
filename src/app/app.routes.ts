import { authenticationGGuard } from './core/guards/authentication-g.guard';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth-layout/auth.component';
import { BlankComponent } from './layouts/blank-layout/blank.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { BrandsComponent } from './component/brands/brands.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { logoutGuard } from './core/guards/logout.guard';

export const routes: Routes = [
  {path:'' ,component: AuthComponent, canActivate: [logoutGuard],
    children:[
      {path:'',redirectTo:'login' , pathMatch: 'full' , title: 'login'},
      {
        path: 'login',component: LoginComponent , title: 'login'

      },
      {
        path:'register' , component: RegisterComponent ,title: 'register'
      }
    ]
  },
  {path:'' ,component: BlankComponent, canActivate: [authenticationGGuard],
    children: [
      {path:'',redirectTo:'home' , pathMatch: 'full' ,title: 'home'},
      {path:'home',component:HomeComponent ,title: 'home'},
      {path:'cart' , component:CartComponent , title: 'cart'},
      {path:'categories' , component:CategoriesComponent , title: 'category'},
      {path:'brands' , component:BrandsComponent ,title: 'brands'}
    ]
  },
];