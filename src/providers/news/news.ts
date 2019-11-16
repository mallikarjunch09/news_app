import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../providers/config'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { CacheService } from "ionic-cache";


@Injectable()
export class NewsProvider {

  apiKey: string = "7a1a26e9219c4edeba77609c13c88bd6";
  country: string = "us";
  category: string = "business";

  serverUrl: string = "https://newsapi.org/v2/top-headlines";
  
  url: string = ""; 


  constructor(public http: HttpClient, private cache: CacheService) {
    console.log('Hello NewsProvider Provider');
  }
  public getNewsHeadlines() {
    this.url = this.serverUrl + "?country=" + this.country + "&apiKey=" + this.apiKey; 
    console.log(this.url)
    return this.http.get(this.url).map((data: any) => {
      return data.articles; 
    }).catch((error: any) => { 
      return Observable.throw("Connectivity error");
    })
  }
}

