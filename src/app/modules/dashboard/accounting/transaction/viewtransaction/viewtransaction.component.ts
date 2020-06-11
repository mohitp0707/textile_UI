import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewtransaction',
  templateUrl: './viewtransaction.component.html',
  styleUrls: ['./viewtransaction.component.scss']
})
export class ViewtransactionComponent implements OnInit {
  accountData:any=[];
  constructor() { }

  ngOnInit() {
  }

}
