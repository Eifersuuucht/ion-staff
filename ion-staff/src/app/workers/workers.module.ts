import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkersPageRoutingModule } from './workers-routing.module';

import { WorkersPage } from './workers.page';
import {DepartmentComponent} from "../components/department/department.component";
import {WorkerComponent} from "../components/worker/worker.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkersPageRoutingModule
  ],
  declarations: [
      WorkersPage,
      WorkerComponent]
})
export class WorkersPageModule {}
