import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BitcoinApiService} from "./bitcoin.api.service";
import { ChartComponent } from './chart/chart.component';
import {nvD3} from 'ng2-nvd3';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    nvD3
  ],
  imports: [
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [BitcoinApiService],
  bootstrap: [AppComponent],
  exports: [MaterialModule, BrowserAnimationsModule, MdButtonModule, MdCheckboxModule ]
})
export class AppModule { }

