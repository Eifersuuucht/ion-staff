import { Injectable } from '@angular/core';
import {Department} from "../models/department.model";
import {Observable, Subject} from "rxjs";
import {Worker} from "../models/worker.model";

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

  private workers: Worker[] = [
    {
      id: 1,
      lastName: 'Nitro',
      experienceInMonth: 15,
      position: 'Director',
      departmentId: 2
    },
    {
      id: 2,
      lastName: 'Laus',
      experienceInMonth: 2,
      position: 'Director',
      departmentId: 1
    },
    {
      id: 3,
      lastName: 'Skolnik',
      experienceInMonth: 33,
      position: 'Software Engineer',
      departmentId: 1
    },
    {
      id: 4,
      lastName: 'Nash',
      experienceInMonth: 11,
      position: 'HR Manager',
      departmentId: 2
    }
  ];

  workersChanged = new Subject<Worker[]>();
  lastDepartmentId: number;

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

  updateDepartment(department: Department){
    const indexToChange = this.departments.indexOf(department);
    this.departments[indexToChange] = department;
  }

  deleteDepartment(id: number){
    const departmentToDelete = this.departments.find(department => department.id === id);
    const indexToDelete = this.departments.indexOf(departmentToDelete);
    this.departments.splice(indexToDelete, 1);
  }

  getWorkers(departmentId: number): Observable<Worker[]>{
    this.lastDepartmentId = departmentId;
    return new Observable<Worker[]>(
        subscriber => {
          subscriber.next(this.workers.filter(elem => {
            return elem.departmentId === departmentId;
          }));
          subscriber.complete();
        }
    );
  }

  addWorker(worker: Worker){
    worker.id = this.workers.length + 1;
    this.workers.push(worker);
    this.workersChanged.next(this.workers.filter(elem => {
      return elem.departmentId === this.lastDepartmentId;
    }));
  }

  updateWorker(worker: Worker){
    const indexToChange = this.workers.indexOf(worker);
    this.workers[indexToChange] = worker;
    this.workersChanged.next(this.workers.filter(elem => {
      return elem.departmentId === this.lastDepartmentId;
    }));
  }

  deleteWorker(id: number){
    const workerToDelete = this.workers.find(worker => worker.id === id);
    const indexToDelete = this.workers.indexOf(workerToDelete);
    this.workers.splice(indexToDelete, 1);
    this.workersChanged.next(this.workers.filter(elem => {
      return elem.departmentId === this.lastDepartmentId;
    }));
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
