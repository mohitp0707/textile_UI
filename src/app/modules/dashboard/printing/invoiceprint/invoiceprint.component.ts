import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-invoiceprint',
  templateUrl: './invoiceprint.component.html',
  styleUrls: ['./invoiceprint.component.scss']
})
export class InvoiceprintComponent implements OnInit {

  basicdatails:any={};
  details:any=[];
  deailsproc:any=[];
  othrchrg:any=[];
  constructor(public ds : DataServiceService,public route : ActivatedRoute) {
    route.params.subscribe(params => {
      if(params.id){
        this.ds.getData('/PrintInvoice/'+params.id).then((data:any) => {
          // console.log(data);
          this.basicdatails=data.recordset[0];
          this.details=data.recordsets[1];
          this.deailsproc=data.recordsets[2];
          this.othrchrg=data.recordsets[3];
        },err => {
          console.log(err);
        })
      }else{
        alert("data not found");
      }
    });
  }

  ngOnInit() {
   
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <title>INVOICE</title>
        <style>
      
          table, th, td {
            border: 1px solid black;
          }
          </style>
      </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
