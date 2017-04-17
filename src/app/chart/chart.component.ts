import {Component, OnInit, OnChanges, ElementRef, Inject, ViewChild} from '@angular/core';
import {BitcoinApiService} from "../bitcoin.api.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
declare let d3: any;

@Component({
  selector: 'app-chart',
  inputs: ['options', 'data'],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})


export class ChartComponent implements OnInit {

  constructor( public backendApi: BitcoinApiService) { }
  public options: any;
  public data: any;
  public btce_array = [];
  chart: any;
  svg: any;
  ngOnInit(){
    this.getApiData();
    this.data = this.btcUsdHistory();
    Observable.interval(1000*10).subscribe(x => {
      this.getApiData();
      this.data = this.btcUsdHistory();
    });
    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        dimensions: [
          "economy (mpg)",
          "cylinders",
          "displacement (cc)",
          "power (hp)",
          "weight (lb)",
          "0-60 mph (s)",
          "year"
        ],
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        background: '#222',
        x: function(d){ return d.timestampVal; },
        y: function(d){ return d.currencyVal; },
        showValues: true,
        useInteractiveGuideline: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        xAxis: {
          axisLabel: 'Time (ms)'
        },
        yAxis: {
          axisLabel: 'BTC (v)',
          tickFormat: function(d){
            return d3.format(',.1f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };
  }

  private getApiData() : void{
    this.backendApi.get_market_data().subscribe(res => {
      this.set_data(res)
    });
  }
  btcUsdHistory() {
    //Line chart data should be sent as an array of series objects.
    return [
      {
        values:  this.btce_array,      //values - represents the array of {x,y} data points
        key: 'Price', //key  - the name of the series.
        color: '#ff7f0e',  //color - optional: choose your own line color.
        area: true,
        background: '#222'
      }
    ];
  }
  private set_data(res: Response) {
    let data_array = res.json();
    for (let currency of data_array){
      this.btce_array.push({timestampVal: currency['x'], currencyVal: currency['y']});
    }
  }


}
