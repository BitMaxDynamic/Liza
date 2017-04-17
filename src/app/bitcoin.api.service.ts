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
import {Http} from "@angular/http";

@Injectable()
export class BitcoinApiService {

  public response: any;

  constructor(private http: Http){}

  public get_market_data(){
  let project = new ReplaySubject(1);
   project.subscribe(result => this.setResult(result));
   return this.http.get('/get_btc_test');
  }

  private setResult(result: any){
    this.response=result;
  }

  public getResponse(){
    return this.response;
  }

}
