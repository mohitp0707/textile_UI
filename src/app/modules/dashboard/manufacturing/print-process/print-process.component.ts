import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-process',
  templateUrl: './print-process.component.html',
  styleUrls: ['./print-process.component.scss']
})
export class PrintProcessComponent implements OnInit {

  basicdatails: any ={};

  constructor(public ds : DataServiceService,public route : ActivatedRoute) { 


    route.params.subscribe(params => {
    if(params.id){
      this.ds.getData('/ProcessPrint/'+params.id).then((data:any) => {
        this.basicdatails=data.recordset[0];
        this.particular = data.recordsets[1] || [];
      },err => {
        console.log(err);
      })
    }
    });
  }

  invoice={};
  particular:any=[];

  ngOnInit() {
    
  }

  getColor(item:any) {
    if(item.JPRD_RMK != null){
        if(item.JPRD_RMK != ""){
            return 'table-info';
        }else{
          return 'abc';
        }
    }else{
    return 'abc';
  }}
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <title>Process Print</title>
        <style>
          .modal-footer{
            visibility: hidden;
          }
          .table-info{
            border-bottom:dotted;
          }
          </style>
      </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
  

}
