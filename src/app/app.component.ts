import {
  Component,
  NgModule
} from '@angular/core';
import {BitcoinApiService} from './bitcoin.api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(public apiService: BitcoinApiService) {}


}

