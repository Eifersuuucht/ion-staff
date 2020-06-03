import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataGetterService} from "../service/data-getter.service";
import {AlertController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {FireDataGetterService} from "../service/fire-data-getter.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  userName: string;
  password: string;
  subscription: Subscription

  constructor(private router: Router,
              private dataGetterService: DataGetterService,
              public alertController: AlertController,
              private fireDataGetterService: FireDataGetterService) { }

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

  ngOnInit() {
    // this.subscription = this.dataGetterService.LoggedIn.subscribe(
    //     isLoggedIn => {
    //       if(isLoggedIn) {
    //         this.router.navigate(['/home']);
    //       } else {
    //         this.userNotExistAlert();
    //       }
    //     });
    }


    login() {
      this.fireDataGetterService.checkUser({
            userName: this.userName,
            passwd: this.password
      }).then(
          res => {
            this.fireDataGetterService.setUser(this.userName);
            this.router.navigate(['/home']);
          },
          err => {
            this.userNotExistAlert();
          }
      )
      // this.dataGetterService.login(this.userName, this.password)
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
