import { Injectable } from '@angular/core';
import {Department} from "../models/department.model";
import {Observable, Subject} from "rxjs";
import {Worker} from "../models/worker.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user.model";
import {map} from "rxjs/operators";
import {Role} from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class DataGetterService {
  baseUrl = 'https://localhost:44378/api/';

  private departments: Department[];

  private userName = '';
  private userId = -1;

  private workers: Worker[];
  private roles: Role[];

  workersChanged = new Subject<Observable<Worker[]>>();
  departmentsChanged = new Subject<Observable<Department[]>>();
  usersChanged = new Subject<Observable<User[]>>();
  LoggedIn = new Subject<boolean>();
  Registered = new Subject<boolean>()
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

  getUsers() {
    return this.httpClient.get<User[]>(this.baseUrl + 'users', {headers: this.getAuthHeaders()})
        .pipe(map(
            (res: Array<User>) => res.filter(
                u => u.username != this.userName
            )
        ));
  }

  updateUserRoles(user: User) {
    return this.httpClient.put<any>(this.baseUrl + 'roles/users/' + user.id,
        {
          roles :user.roles.filter(u => u.isChecked).map(u => u.name)
        }, {headers: this.getAuthHeaders()})
        .subscribe(() => {
          this.usersChanged.next(this.getUsers());
        });
  }

  login(username: string, password: string){
    this.httpClient.post<any>(this.baseUrl + 'auth/login', {
      login: username,
      password: password
    }).subscribe(async (data) => {
      localStorage.setItem('authToken', data.authToken);
      this.isLoggedIn = true;
      this.userName = data.username;
      this.userId = data.userId;
      this.roles = data.roles;
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

  register(userName: string, password: string) {
    this.httpClient.post<any>(this.baseUrl + 'users', {
      login: userName,
      password: password
    }).subscribe((data) => {
      this.Registered.next(true);
    }, (error) => {
      this.Registered.next(false);
    });
  }

  hasRights(roleName: string){
    return this.roles.find(role => role.name === roleName).isChecked;
  }
}
