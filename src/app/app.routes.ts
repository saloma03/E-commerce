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
import { ShopComponent } from './component/shop/shop.component';
import { FavoriteComponent } from './component/favorite/favorite.component';
import { SettingComponent } from './component/setting/setting.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { AllordersComponent } from './component/allorders/allorders.component';
import { OrdersComponent } from './component/orders/orders.component';

export const routes: Routes = [
  {path:'' ,component: AuthComponent, canActivate: [logoutGuard],
    children:[
      {path:'',redirectTo:'login' , pathMatch: 'full' , title: 'login'},
      {
        path: 'login',component: LoginComponent , title: 'login'

      },
      {
        path:'register' , component: RegisterComponent ,title: 'register'
      },
      {
        path:'forget password' , component:  ForgetPasswordComponent,title: 'forget password'
      },
    ]
  },
  {path:'' ,component: BlankComponent, canActivate: [authenticationGGuard],
    children: [
      {path:'',redirectTo:'home' , pathMatch: 'full' ,title: 'home'},
      {path:'home',component:HomeComponent ,title: 'home'},
      {path:'shop' , component:ShopComponent , title: 'shop'},
      {path:'categories' , component:CategoriesComponent , title: 'category'},
      {path:'brands' , component:BrandsComponent ,title: 'brands'},
      {path:'favorite' , component:FavoriteComponent ,title: 'favorite'},
      {path:'setting' , component:SettingComponent ,title: 'setting'},
      {path:'cart' , component:CartComponent ,title: 'cart'},
      {path:'product details/:id' , component:ProductDetailsComponent ,title: 'Product Details'},
      {path:'allorders' , component:AllordersComponent ,title: 'all orders'},
      {path:'orders/:id' , component:OrdersComponent ,title: 'shipping address'},
    ]
  },
  {path:'**' , component:NotfoundComponent ,title: 'page not found'},

];
