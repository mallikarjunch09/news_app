import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { NewsProvider } from "../../providers/news/news";
import { Http } from '@angular/http';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { NewsdetailsPage } from '../newsdetails/newsdetails';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newsKey = "my-news-key";
  errorMsg: any;
  newsObj: Observable<any>;
  country: string = "us";


  constructor(public navCtrl: NavController, public http: Http, private cache: CacheService) {

  }

  ionViewWillEnter() {
    this.loadNews();
  }

  loadNews(refresher?) {
    let url = "https://newsapi.org/v2/top-headlines?country=" + this.country + "&apiKey=7a1a26e9219c4edeba77609c13c88bd6";
    let req = this.http.get(url).map(res => {
      console.log(res.json().articles);
      return res.json().articles;
    })

    let ttl = 60 * 60;  //set default cache TTL for 1 hour
    if (refresher) {
      let delayType = 'all';
      this.newsObj = this.cache.loadFromDelayedObservable(url, req, this.newsKey, ttl, delayType);
      this.newsObj.subscribe(data => {
        refresher.complete();
      })
    } else {
      this.newsObj = this.cache.loadFromObservable(url, req, this.newsKey);
    }

  }

  openNews(news) {
    this.navCtrl.push(NewsdetailsPage, {
      newsData: news
    })
  }

  onChange($event) {
    this.loadNews();
  }

  refreshNews(refresher) {

    //this.cache.clearGroup(this.newsKey);
    this.loadNews(refresher);

  }



  ngOnInit() {

  }

}
