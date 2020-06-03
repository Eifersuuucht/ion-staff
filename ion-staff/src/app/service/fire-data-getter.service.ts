import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Department} from "../models/department.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {validateConstructorDependencies} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FireDataGetterService {

    departments: Observable<Department[]>
    departmentsLength: number;

  constructor(private readonly angularFirestore: AngularFirestore) {
    const departmentsCollection = angularFirestore.collection('departments');
    this.departments = departmentsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const docId = a.payload.doc.id;

          // @ts-ignore
          return {docId, ...data};
        }))
    );
  }

  getDepartments() {
    return this.departments;
  }

  editDepartment(department) {
      return this.angularFirestore
          .doc('departments/' + department.docId)
          .update({
              id: this.departments,
              name: department.name,
              vacancyNumber: department.vacancyNumber
          });
  }

  addDepartment(department) {
      this.angularFirestore.collection('departments')
          .add({
              id: department.id,
              name: department.name,
              vacancyNumber: department.vacancyNumber
          });
  }

  deleteDepartment(department) {
      return this.angularFirestore
          .doc('departments/' + department.docId)
          .delete();
  }

  getWorkers(id) {
      return this.angularFirestore
          .doc('departments/' + id)
          .collection('workers')
          .valueChanges();
  }
}
