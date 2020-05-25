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
  @Output() departmentEdited = new EventEmitter();
  @Output() editingDepartmentCanceled = new EventEmitter();
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

  edit() {
    if(!this.isNew) {
      this.departmentEdited.emit(this.department);
    }
  }

  cancelEditing() {
    if(!this.isNew) {
      this.editingDepartmentCanceled.emit();
    }
  }
}
