import {Component, OnInit} from '@angular/core';
import {Department} from "../models/department.model";
import {DataGetterService} from "../service/data-getter.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  extraData: string;

  constructor(private dataGetterService: DataGetterService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userName = this.dataGetterService.getUser();
    this.extraData = this.route.snapshot.paramMap.get('data');
    this.dataGetterService.getDepartments().subscribe(
        (departments) => {
          this.departments = departments;
        }
    );
  }

  getData() {
    this.router.navigate(['/data-sender', {data: this.extraData}]);
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

  editDepartment(department: Department) {
    this.dataGetterService.updateDepartment(department);
    this.showEdit = -1;
  }
}
