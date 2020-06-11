import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AmChartsService } from "@amcharts/amcharts3-angular";
 import { DataServiceService } from '../../../provider/data-service.service';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  key:any;
	iv:any;
  decryptdata:any;
  data:any;
  minumdata:any=[];
  procdata:any=[];
  saledata:any=[];

  constructor(public route : ActivatedRoute,private router:Router,private AmCharts: AmChartsService,private ds:DataServiceService ) {

   }

   getminiumStock(){
  
    this.ds.getData('/dashboardChart').then((data:any) => {
     
      this.minumdata = data.recordsets[0] || [];
      this.procdata=data.recordsets[1];
      if(this.minumdata.length>0){
          this.miniumStock();
      }if(this.procdata.length>0){
         this. piechart();
      }
		},err => {
			console.log(err);
		})
   }

   piechart(){
    var chart2 = this.AmCharts.makeChart( "chartdiv3", {
      "type": "pie",
      "theme": "none",
      "dataProvider":this.procdata,
      "valueField": "visits",
      "titleField": "country",
      "startEffect": "elastic",
      "startDuration": 2,
      "labelRadius": 15,
      "innerRadius": "50%",
      "depth3D": 10,
      "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      "angle": 20,
      "export": {
        "enabled": true
      }
    } );
   }

miniumStock(){
      var chart = this.AmCharts.makeChart("chartdiv2", {
      "theme": "none",
      "type": "serial",
      "startDuration": 2,
      "dataProvider": this.minumdata,
      "valueAxes": [{
          "position": "left",
          "axisAlpha":0,
          "gridAlpha":0
      }],
      "graphs": [{
          "balloonText": "[[category]]: <b>[[value]]</b>",
          "colorField": "color",
          "fillAlphas": 0.85,
          "lineAlpha": 0.1,
          "type": "column",
          "topRadius":1,
          "valueField": "visits"
      }],
      "depth3D": 40,
    "angle": 30,
      "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": false
      },
      "categoryField": "country",
      "categoryAxis": {
          "gridPosition": "start",
          "axisAlpha":0,
          "gridAlpha":0
  
      },
      "export": {
        "enabled": true
       }
  
  }, 0);


}



  ngOnInit() {
    this.data=sessionStorage.getItem("Data")|| null ;
    // this.key = CryptoJS.enc.Utf8.parse('7061737323313233');
    // this.iv = CryptoJS.enc.Utf8.parse('7061737323313233'); 
    if(!this.data) {
      this.router.navigate(['login']);
    }else{
      // this.key = CryptoJS.enc.Utf8.parse('7061737323313233');
      // this.iv = CryptoJS.enc.Utf8.parse('7061737323313233'); 
      // var decrypted = CryptoJS.AES.decrypt(this.data, this.key, {
      //   keySize: 128 / 8,	
      //   iv: this.iv,
      //   mode: CryptoJS.mode.CBC,
      //   padding: CryptoJS.pad.Pkcs7
      //   });
      //   this.decryptdata= JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    }
    var chart1 = this.AmCharts.makeChart( "chartdiv", {
      "type": "gauge",
      "theme": "none",
      "startDuration": 0.3,
      "marginTop": 20,
      "marginBottom": 50,
      "axes": [ {
        "axisAlpha": 0.3,
        "endAngle": 360,
        "endValue": 12,
        "minorTickInterval": 0.2,
        "showFirstLabel": false,
        "startAngle": 0,
        "axisThickness": 1,
        "valueInterval": 1
      } ],
      "arrows": [ {
        "radius": "50%",
        "innerRadius": 0,
        "clockWiseOnly": true,
        "nailRadius": 10,
        "nailAlpha": 1
      }, {
        "nailRadius": 0,
        "radius": "80%",
        "startWidth": 6,
        "innerRadius": 0,
        "clockWiseOnly": true
      }, {
        "color": "#CC0000",
        "nailRadius": 4,
        "startWidth": 3,
        "innerRadius": 0,
        "clockWiseOnly": true,
        "nailAlpha": 1
      } ],
      "export": {
        "enabled": true
      }
    } );
    
    // update each second
    setInterval( updateClock, 1000 );
    
    // update clock
    function updateClock() {
      if(chart1.arrows.length > 0){
        // get current date
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
    
        if(chart1.arrows[ 0 ].setValue){
          // set hours
          chart1.arrows[ 0 ].setValue( hours + minutes / 60 );
          // set minutes
          chart1.arrows[ 1 ].setValue( 12 * ( minutes + seconds / 60 ) / 60 );
          // set seconds
          chart1.arrows[ 2 ].setValue( 12 * date.getSeconds() / 60 );
          }
      }
      }
      this.getminiumStock();
      this.chart4();
  }

  chart4(){
  }

}
