import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import * as $ from "jquery";


@Component({
  selector: 'app-trackreport',
  templateUrl: './trackreport.component.html',
  styleUrls: ['./trackreport.component.scss']
})
export class TrackreportComponent implements OnInit {

  dispatchtabl:boolean=false;
  invoicetabl:boolean=false;
  proctabl:boolean=false;
  disptabl:any=[];
  invtabl:any=[];
  p: number = 1;
  proctable:any=[];
  sersupp:any;
  serchl:any;
  serlot:any;
  sergpcs:any;
  sergmtr:any;
  serchk:any;
  serbatc:any;
  serInt:any;
  serjpcs:any;
  serjmtr:any;
  serProc:any;
  serpack:any;
  serdisp:any;
  serInv:any;

  constructor(public ds : DataServiceService) { }
  trackdata:any=[];
  ngOnInit() {
    this.ds.getData('/trackReport').then((data:any) => {
      this.trackdata = data.recordset || [];
		},err => {
			console.log(err);
		})
  }

  clickdisp(inv){
    console.log(inv);
    this.ds.getData('/dispTrackDetail',inv).then((data:any) => {
      this.dispatchtabl=true;
      this.invoicetabl=false;
      this.proctabl=false;
      this.disptabl = data.recordset || [];
      console.log(this.disptabl);
		},err => {
			console.log(err);
		})
  }
  
  clickinv(inv){
	  // console.log(inv.GR_Batch);
    this.ds.getData('/invTrackDetails',inv.GR_Batch).then((data:any) => {
      this.dispatchtabl=false;
      this.invoicetabl=true;
      this.proctabl=false;
      this.invtabl = data.recordset || [];
		},err => {
			console.log(err);
		})
  }
  clickproc(inv){
        // console.log(inv.GR_Batch);
        this.dispatchtabl=false;
        this.invoicetabl=false;
        this.proctabl=true;
        this.ds.getData('/jobcardProcStatus',inv.GR_Batch).then((data:any) => {
          this.dispatchtabl=false;
          this.invoicetabl=false;
          this.proctabl=true;
          this.proctable = data.recordset || [];
        },err => {
          console.log(err);
        })
  }
  export(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(18);
    doc.text('TRACK REPORT', 220, 50);
    doc.setFontSize(8);
    doc.setTextColor(100);
      doc.autoTable({html: '#dattab',margin: {top: 70}});
      doc.save('trackreport.pdf');
  }
  exportExcel(){
    $("#dattab").tableExport();
  }

}
