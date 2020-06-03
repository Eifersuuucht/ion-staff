import { Component, OnInit } from '@angular/core';
import {DataGetterService} from "../service/data-getter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Worker} from "../models/worker.model";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {FireDataGetterService} from "../service/fire-data-getter.service";

@Component({
  selector: 'app-workers',
  templateUrl: './workers.page.html',
  styleUrls: ['./workers.page.scss'],
})
export class WorkersPage implements OnInit {
  departmentId: number;
  departmentDocId: string;
  workers: any[];
  showNew = false;
  showEdit = -1;
  subscription: Subscription;
  private workersCount: number = 0;
  private workerStep: number = 10;

  constructor(private dataGetterService: DataGetterService,
              private route: ActivatedRoute,
              private router: Router,
              private fireDataGetterService: FireDataGetterService) { }

  ngOnInit() {
    this.departmentDocId = this.route.snapshot.queryParamMap.get('id');
    this.departmentId = +this.route.snapshot.paramMap.get('departmentId');
    this.fireDataGetterService.getWorkers(this.departmentDocId).subscribe(
        workers => {
            console.log(workers);
          this.workers = workers;
        }
    )
    this.subscription = this.dataGetterService.workersChanged.subscribe(
        workersObs => {
          workersObs.subscribe(
              workers => {
                this.workers = workers;
              }
          );
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

  refreshData(refresher) {
    this.workers = [];
    this.workersCount = 0;
    this.addData(refresher);
  }

  addData(refresher) {
    this.dataGetterService.getWorkers(this.departmentId)
        .pipe(map(
        (res: Array<any>) => res.filter(
            row => row.id > this.workersCount &&
                row.id < this.workersCount + this.workerStep
        )
    ))
        .subscribe(
            data => {
                this.workers = this.workers.concat(data);
                if(refresher) {
                    refresher.target.complete();
                }
                this.workersCount += this.workerStep;
            }
        )
  }

    hasRights(roleName: string){
        return this.dataGetterService.hasRights(roleName);
    }
}
