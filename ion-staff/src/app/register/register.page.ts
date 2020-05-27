import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DataGetterService} from "../service/data-getter.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userName: string;
  password: string;
  subscriptionRegistered: Subscription;

  constructor(private router: Router,
              private dataGetterService: DataGetterService,
              public alertController: AlertController) { }

  ngOnDestroy(): void {
    this.subscriptionRegistered.unsubscribe();
  }

  ngOnInit() {
    this.subscriptionRegistered = this.dataGetterService.Registered.subscribe(
        isRegistered => {
          if(isRegistered) {
            this.router.navigate(['/login']);
          } else {
            this.userNotCreatedAlert();
          }
        });
  }


  register() {
    this.dataGetterService.register(this.userName, this.password)
  }

  async userNotCreatedAlert() {
    const alert = await this.alertController.create({
      header: 'Attention!',
      subHeader: 'Registration error',
      message: `User is not created.`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
