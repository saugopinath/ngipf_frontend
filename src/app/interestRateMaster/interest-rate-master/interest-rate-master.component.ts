import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-interest-rate-master',
  templateUrl: './interest-rate-master.component.html',
  styleUrls: ['./interest-rate-master.component.scss']
})
export class InterestRateMasterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addInterestRate()
  {
    this.router.navigate(['interstRateMaster/addInterestRate']);
  }

}
