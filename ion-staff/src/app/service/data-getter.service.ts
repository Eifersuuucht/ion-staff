import { Injectable } from '@angular/core';
import {Department} from "../models/department.model";
import {Observable, Subject} from "rxjs";
import {Worker} from "../models/worker.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataGetterService {
  baseUrl = 'https://localhost:44378/api/';

  private departments: Department[];

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

  workersChanged = new Subject<Observable<Worker[]>>();
  departmentsChanged = new Subject<Observable<Department[]>>();
  LoggedIn = new Subject<boolean>();
  lastDepartmentId: number;
  isLoggedIn: boolean;

  constructor(private httpClient: HttpClient) { }

  getDepartments() {
    return this.httpClient.get<Department[]>(this.baseUrl + 'departments', {headers: this.getAuthHeaders()});
  }

  addDepartment(department){
    return this.httpClient.post<any>(this.baseUrl + 'departments', {
      name: department.name,
      vacancy: department.vacancyNumber
    }, {headers: this.getAuthHeaders()}).subscribe(() => {
      this.departmentsChanged.next(this.getDepartments());
    });
  }

  updateDepartment(department: Department){
    return this.httpClient.put<any>(this.baseUrl + 'departments/' + department.id, department, {headers: this.getAuthHeaders()})
        .subscribe(() => {
      this.departmentsChanged.next(this.getDepartments());
    });
  }

  deleteDepartment(id: number){
    return this.httpClient.delete<any>(this.baseUrl + 'departments/' + id, {headers: this.getAuthHeaders()})
        .subscribe(() => {
          this.departmentsChanged.next(this.getDepartments());
        });
  }

  getWorkers(departmentId: number){
    this.lastDepartmentId = departmentId;
    return this.httpClient.get<Worker[]>(this.baseUrl + 'workers/department/' + departmentId, {headers: this.getAuthHeaders()});
  }

  addWorker(worker: Worker){
    return this.httpClient.post<any>(this.baseUrl + 'workers', {
      lastName: worker.lastName,
      experienceInMonth: worker.experienceInMonth,
      position: worker.position,
      departmentId: worker.departmentId
    }, {headers: this.getAuthHeaders()}).subscribe(() => {
      this.workersChanged.next(this.getWorkers(this.lastDepartmentId));
    });
  }

  updateWorker(worker: Worker){
    return this.httpClient.put<any>(this.baseUrl + 'workers/' + worker.id, worker, {headers: this.getAuthHeaders()})
        .subscribe(() => {
          this.workersChanged.next(this.getWorkers(this.lastDepartmentId));
        });
  }

  deleteWorker(id: number){
    return this.httpClient.delete<any>(this.baseUrl + 'workers/' + id, {headers: this.getAuthHeaders()})
        .subscribe(() => {
          this.workersChanged.next(this.getWorkers(this.lastDepartmentId));
        });
  }

  IsLoggedIn() {
    return this.isLoggedIn;
  }

  getUser(): string {
    return this.userName;
  }

  login(username: string, password: string){
    this.httpClient.post<any>(this.baseUrl + 'auth/login', {
      login: username,
      password: password
    }).subscribe((data) => {
      localStorage.setItem('authToken', data.authToken);
      this.isLoggedIn = true;
      this.userName = data.username;
      this.LoggedIn.next(true);
    }, (error) => {
      this.isLoggedIn = false;
      this.LoggedIn.next(false);
    });
  }

  getAuthHeaders(): HttpHeaders{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('authToken')
    })

    return headers;
  }
}
