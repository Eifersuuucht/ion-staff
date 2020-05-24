import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Department} from "../../models/department.model";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  @Input() department: Department;
  @Input() isNew: boolean;
  @Output() departmentAdded = new EventEmitter();
  @Output() addingDepartmentCanceled = new EventEmitter();
  title: string;

  constructor() { }

  ngOnInit() {
    if(this.isNew) {
      this.department = {
        id: null,
        name: '',
        vacancyNumber: null
      };
      this.title = 'New Department'
    }
  }

  addNew() {
    if(this.isNew) {
      this.departmentAdded.emit(this.department);
    }
  }

  cancelAdding() {
    if(this.isNew) {
      this.addingDepartmentCanceled.emit();
    }
  }
}
