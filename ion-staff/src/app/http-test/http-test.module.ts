import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpTestPageRoutingModule } from './http-test-routing.module';

import { HttpTestPage } from './http-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpTestPageRoutingModule
  ],
  declarations: [HttpTestPage]
})
export class HttpTestPageModule {}
