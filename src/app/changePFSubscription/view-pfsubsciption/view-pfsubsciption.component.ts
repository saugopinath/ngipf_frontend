import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-pfsubsciption',
  templateUrl: './view-pfsubsciption.component.html',
  styleUrls: ['./view-pfsubsciption.component.scss']
})
export class ViewPFSubsciptionComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  chnageSubsClick(){
    this.router.navigate(['ChangePfSubscintion/viewPFSubscribtion/changeSubs']);
  }
  minMaxMasterClick(){
    this.router.navigate(['ChangePfSubscintion/viewPFSubscribtion/minMaxMaster']);
  }
}
