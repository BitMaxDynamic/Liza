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
  public btce_array = [{timestampVal:1490572800, currencyVal:1030}];
  el: any;
  chart: any;
  svg: any;
  ngOnInit(){
    Observable.interval(3000).subscribe(x => {
      this.getApiData();
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
        x: function(d){ return d.timestampVal; },
        y: function(d){ return d.currencyVal; },
        showValues: true,
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Time (ms)'
        },
        yAxis: {
          axisLabel: 'BTC (v)',
          tickFormat: function(d){
             return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };

    this.data = this.sinAndCos();
  }

  private getApiData() : void{
    this.backendApi.get_market_data().subscribe(res => {
      this.set_data(res)
    });
  }
  sinAndCos() {
    var sin = [],sin2 = [],
      cos = [];

    //Data is represented as an array of {x,y} pairs.
    // for (var i = 1490572800; i < 1490572900; i++) {
    //   sin.push({x: i, y: Math.sin(i/10)});
    //   sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
    //   cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
    // }
    //Line chart data should be sent as an array of series objects.
    return [
      {
        values:  this.btce_array,      //values - represents the array of {x,y} data points
        key: 'Price', //key  - the name of the series.
        color: '#ff7f0e',  //color - optional: choose your own line color.
        area: true
      },
      // {
      //   values: this.btce_array,
      //   key: 'Quantity',
      //   color: '#2ca02c'
      // },
      // {
      //   values: this.btce_array,
      //   key: 'currency',
      //   color: '#7777ff',
      //   area: true      //area - set to true if you want this line to turn into a filled area chart.
      // }

    ];
  }
  private set_data(res: Response) {
    let data_array = res.json()
    for (let currency of data_array){
      this.btce_array.push({timestampVal: currency['x'], currencyVal: currency['y']})
    }
    // console.log(this.btce_array)
  }


}
