import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../../provider/data-service.service' ;
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobcardprint',
  templateUrl: './jobcardprint.component.html',
  styleUrls: ['./jobcardprint.component.scss']
})
export class JobcardprintComponent implements OnInit {
  basicdatails:any={};
  details:any=[];
  constructor(public ds : DataServiceService,public route : ActivatedRoute) { 
    route.params.subscribe(params => {
      if(params.id){
        this.ds.getData('/PrintJobCard/'+params.id).then((data:any) => {
          this.basicdatails=data.recordset[0];
          console.log(this.basicdatails);
					this.details=data.recordsets[1];
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
        <title>JOB CARD</title>
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
