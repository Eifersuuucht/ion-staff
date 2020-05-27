import { Component, OnInit } from '@angular/core';
import {Worker} from "../models/worker.model";
import {Subscription} from "rxjs";
import {DataGetterService} from "../service/data-getter.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user.model";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {

  users: User[];
  showEdit = -1;
  subscription: Subscription;

  constructor(private dataGetterService: DataGetterService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataGetterService.getUsers().subscribe(
        users => {
          this.users = users;
        }
    )
    this.subscription = this.dataGetterService.usersChanged.subscribe(
        usersObs => {
            usersObs.subscribe(
              users => {
                this.users = users;
              }
          );
        }
    )
  }

  editUser(user: User) {
    this.dataGetterService.updateUserRoles(user);
    this.showEdit = -1;
  }

    hasRights(roleName: string){
        return this.dataGetterService.hasRights(roleName);
    }
}
