import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import {BitcoinApiService} from "./bitcoin.api.service";
import { ChartComponent } from './chart/chart.component';
import {nvD3} from 'ng2-nvd3';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    nvD3
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [BitcoinApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

