import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Worker} from "../../models/worker.model";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Output() userEdited = new EventEmitter();
  @Output() editingUserCanceled = new EventEmitter();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }

  edit() {
    this.userEdited.emit(this.user);
  }

  cancelEditing() {
    this.editingUserCanceled.emit();
  }
}
