import {Component, OnInit} from '@angular/core';
import {Department} from "../models/department.model";
import {DataGetterService} from "../service/data-getter.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  departments: Department[];
  userName: string;
  showNew = false;
  showEdit = -1;

  constructor(private dataGetterService: DataGetterService) {}

  ngOnInit(): void {
    this.userName = this.dataGetterService.getUser();
    this.dataGetterService.getDepartments().subscribe(
        (departments) => {
          this.departments = departments;
        }
    )
  }

  add() {
    this.showNew = true;
  }

  delete(id: number) {
    this.dataGetterService.deleteDepartment(id);
  }

  addDepartment(department: Department) {
    this.dataGetterService.addDepartment(department);
    this.showNew = false;
  }
}
