import { Component, OnInit } from '@angular/core';
import {DataGetterService} from "../service/data-getter.service";
import {ActivatedRoute} from "@angular/router";
import {Worker} from "../models/worker.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-workers',
  templateUrl: './workers.page.html',
  styleUrls: ['./workers.page.scss'],
})
export class WorkersPage implements OnInit {
  departmentId: number;
  workers: Worker[];
  showNew = false;
  showEdit = -1;
  subscription: Subscription;

  constructor(private dataGetterService: DataGetterService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.departmentId = +this.route.snapshot.paramMap.get('departmentId');
    this.dataGetterService.getWorkers(this.departmentId).subscribe(
        workers => {
          this.workers = workers;
        }
    )
    this.subscription = this.dataGetterService.workersChanged.subscribe(
        workers => {
          this.workers = workers;
        }
    )
  }

  add() {
    this.showNew = true;
  }

  delete(id: number) {
    this.dataGetterService.deleteWorker(id);
  }

  addWorker(worker: Worker) {
    this.dataGetterService.addWorker(worker);
    this.showNew = false;
  }

  editWorker(worker: Worker) {
    this.dataGetterService.updateWorker(worker);
    this.showEdit = -1;
  }
}
