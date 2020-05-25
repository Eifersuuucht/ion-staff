import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.page.html',
  styleUrls: ['./http-test.page.scss'],
})
export class HttpTestPage implements OnInit {
  posts: any[];
  private postCount: number = 0;
  private postStep: number = 10;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.refreshData(false);
  }

  // getData(refresher) {
  //   this.httpClient.get('http://jsonplaceholder.typicode.com/posts')
  //       .pipe(map(
  //           (res: Array<any>) => res.filter(
  //               row => row.id < 9
  //           )
  //       ))
  //       .subscribe(
  //           data => {
  //             this.posts = data;
  //             if(refresher) {
  //               refresher.target.complete();
  //             }
  //           }
  //       )
  // }

  refreshData(refresher) {
    this.posts = [];
    this.postCount = 0;
    this.addData(refresher);
  }

  addData(refresher) {
    this.httpClient.get('http://jsonplaceholder.typicode.com/posts')
          .pipe(map(
              (res: Array<any>) => res.filter(
                  row => row.id > this.postCount &&
                      row.id < this.postCount + this.postStep
              )
          ))
          .subscribe(
              data => {
                this.posts = this.posts.concat(data);
                if(refresher) {
                  refresher.target.complete();
                }
                this.postCount += this.postStep;
              }
          )
  }
}
