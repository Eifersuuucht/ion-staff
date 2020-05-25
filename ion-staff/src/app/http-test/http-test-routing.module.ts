import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HttpTestPage } from './http-test.page';

const routes: Routes = [
  {
    path: '',
    component: HttpTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HttpTestPageRoutingModule {}
