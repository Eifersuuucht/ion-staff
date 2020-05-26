import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Department} from "../../models/department.model";
import {Worker} from "../../models/worker.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
})
export class WorkerComponent implements OnInit {
  @Input() worker: Worker;
  @Input() isNew: boolean;
  @Output() workerAdded = new EventEmitter();
  @Output() addingWorkerCanceled = new EventEmitter();
  @Output() workerEdited = new EventEmitter();
  @Output() editingWorkerCanceled = new EventEmitter();
  title: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.isNew) {
      this.worker = {
        id: null,
        lastName: '',
        position: '',
        experienceInMonth: null,
        departmentId: +this.route.snapshot.paramMap.get('departmentId')
      };
      this.title = 'New Worker'
    }
  }

  addNew() {
    if(this.isNew) {
      this.workerAdded.emit(this.worker);
    }
  }

  cancelAdding() {
    if(this.isNew) {
      this.addingWorkerCanceled.emit();
    }
  }

  edit() {
    if(!this.isNew) {
      this.workerEdited.emit(this.worker);
    }
  }

  cancelEditing() {
    if(!this.isNew) {
      this.editingWorkerCanceled.emit();
    }
  }
}
