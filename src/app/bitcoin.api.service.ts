/**
 * Created by ilya on 31/03/2017.
 */
import { Injectable } from '@angular/core';
import axios from 'axios';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs';
import {Http, Response} from "@angular/http";

@Injectable()
export class BitcoinApiService {

  public response: any;
  public error: string;
  private btcTestUrl = 'get_btc_test';
  constructor(private http: Http){}

  public get_market_data(){
  let project = new ReplaySubject(1);
   project.subscribe(result => this.setResult(result));
   return this.http.get(this.btcTestUrl)
     // .map(this.extractData)
     .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || [];
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private setResult(result: any){
    this.response=result;
  }

  public getResponse(){
    return this.response;
  }

}
