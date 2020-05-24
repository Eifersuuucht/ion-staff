import { Injectable } from '@angular/core';
import {Department} from "../models/department.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataGetterService {
  private departments: Department[] = [
    {
      id: 1,
      name: 'Engineering',
      vacancyNumber: 15
    },
    {
      id: 2,
      name: 'Human Resource',
      vacancyNumber: 3
    }
  ];

  private userName = '';
  private users = [
      'Ivan',
      'Dmytro',
      'Olga'
  ]

  constructor() { }

  getDepartments(): Observable<Department[]> {
    return new Observable<Department[]>(
        subscriber => {
          subscriber.next(this.departments);
          subscriber.complete();
        }
    );
  }

  addDepartment(department){
    department.id = this.departments.length + 1;
    this.departments.push(department);
  }

  deleteDepartment(id: number){
    const departmentToDelete = this.departments.find(department => department.id === id);
    const indexToDelete = this.departments.indexOf(departmentToDelete);
    this.departments.splice(indexToDelete, 1);
  }

  getUser() {
    return this.userName;
  }

  setUser(name: string) {
    this.userName = name;
  }

  userExists(name: string): boolean {
    return this.users.indexOf(name) !== -1;
  }
}
