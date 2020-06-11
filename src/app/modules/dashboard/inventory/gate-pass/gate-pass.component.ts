import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../../provider/data-service.service' ;

@Component({
  selector: 'app-gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.scss']
})
export class GatePassComponent implements OnInit {

  invoice : any = {
		particular : []
	};
	particular : any = {
		IM_NM : "",
		unit : 1,
		quantity : 1,
		rate:1
	};
	GodownArr:any=[];
	productList:any=[];
  constructor(public ds : DataServiceService, public route : ActivatedRoute) { }

  ngOnInit() {
  }

}
