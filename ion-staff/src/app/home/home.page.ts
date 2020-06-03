import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "../models/department.model";
import {DataGetterService} from "../service/data-getter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Role} from "../models/role.model";
import {FireDataGetterService} from "../service/fire-data-getter.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{
  departments: any[];
  userName: string;
  showNew = false;
  showEdit = -1;
  extraData: string;
  subscription: Subscription;

  constructor(private dataGetterService: DataGetterService,
              private router: Router,
              private route: ActivatedRoute,
              private fireDataGetterService: FireDataGetterService) {}

  ngOnInit(): void {
    this.userName = this.fireDataGetterService.getUser();
    this.extraData = this.route.snapshot.paramMap.get('data');
    this.fireDataGetterService.getDepartments().subscribe(
        (departments) => {
          this.departments = departments;
        }
    );
    // this.subscription = this.dataGetterService.departmentsChanged.subscribe(
    //     departmentsObs => {
    //       departmentsObs.subscribe(
    //           departments => {
    //             this.departments = departments;
    //           }
    //       );
    //     }
    // );
  }

  // hasRights(roleName: string){
  //   return this.dataGetterService.hasRights(roleName);
  // }

  getData() {
    this.router.navigate(['/data-sender', {data: this.extraData}]);
  }

  add() {
    this.showNew = true;
  }

  delete(department: Department) {
    this.fireDataGetterService.deleteDepartment(department);
    //this.dataGetterService.deleteDepartment(id);
  }

  addDepartment(department: Department) {
    department.id = this.departments.length + 1;
    this.fireDataGetterService.addDepartment(department);
    //this.dataGetterService.addDepartment(department);
    this.showNew = false;
  }

  editDepartment(department: Department) {
    this.fireDataGetterService.editDepartment(department);
    // this.dataGetterService.updateDepartment(department);
    this.showEdit = -1;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
