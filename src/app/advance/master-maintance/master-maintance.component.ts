import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-master-maintance',
  templateUrl: './master-maintance.component.html',
  styleUrls: ['./master-maintance.component.scss']
})
export class MasterMaintanceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  purposeMaster(){
    this.router.navigate(['advance/viewAdvance/masterMaintanace/purposeMaster']);
  }
  eligibilityMasterClick(){
    this.router.navigate(['advance/viewAdvance/masterMaintanace/eligibilityMaster'])
  }
  purposeTaggingMasterClick()
  {
    this.router.navigate(['advance/viewAdvance/masterMaintanace/purposeTaggingMaster']);
  }
}
