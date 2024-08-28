import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-advance',
  templateUrl: './view-advance.component.html',
  styleUrls: ['./view-advance.component.scss']
})
export class ViewAdvanceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  dppgAdvanceSearchClick(){
    this.router.navigate(['advance/viewAdvance/dppgAdvanceSearch']);
  }
  masterMaintanceClick(){
    this.router.navigate(['advance/viewAdvance/masterMaintanace']);
  }

}
