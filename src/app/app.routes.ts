import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregComponent } from './userreg/userreg.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'userlogin',component:UserloginComponent},
  {path:'register',component:UserregComponent},
  {path:'adminlogin',component:AdminloginComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'editproduct/:id',component:EditproductComponent},
  {path:'adminpage',component:AdminpageComponent},
  {path:'cart',component:CartComponent}

];
