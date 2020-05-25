import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    //redirectTo: 'login',
    redirectTo: 'http-test',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'workers/:departmentId',
    loadChildren: () => import('./workers/workers.module').then( m => m.WorkersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'http-test',
    loadChildren: () => import('./http-test/http-test.module').then( m => m.HttpTestPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
