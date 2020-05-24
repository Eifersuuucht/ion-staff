import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataGetterService} from "../service/data-getter.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userName: string;

  constructor(private router: Router,
              private dataGetterService: DataGetterService,
              public alertController: AlertController) { }

  ngOnInit() {
  }

    login() {
      if(this.dataGetterService.userExists(this.userName)){
        this.dataGetterService.setUser(this.userName);
        this.router.navigate(['/home']);
      } else {
        this.userNotExistAlert();
      }
    }

    async userNotExistAlert() {
      const alert = await this.alertController.create({
        header: 'Attention!',
        subHeader: 'Authentication error',
        message: `User ${this.userName} is not found. Wrong username.`,
        buttons: ['OK']
      });

      await alert.present();
    }
}
