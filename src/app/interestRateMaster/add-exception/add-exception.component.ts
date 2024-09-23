import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
enum ActiveStatus {
  Yes = 1,
  No = 0
}
@Component({
  selector: 'app-add-exception',
  templateUrl: './add-exception.component.html',
  styleUrls: ['./add-exception.component.scss']
})
export class AddExceptionComponent implements OnInit {
  

  constructor(private fb: FormBuilder,private route: ActivatedRoute) { }

  addException!: FormGroup;
  addedInterestTableData:any[]=[];
  disableFields: boolean = false; 
  interestRate:number;
  ngOnInit(): void {
    //this.initializeForm();
    this.route.params.subscribe((params) => {
      console.log(params);
      console.log(params.data);
      
      if (params['data']) {
          this.addedInterestTableData = JSON.parse(params['data']);
          // console.log(this.addedInterestTableData);
          
          this.initializeForm();
      }
  });
  }
  initializeForm(): void {
    this.addException = this.fb.group({
        hoa:[''],
        InterestRate: [{value:this.addedInterestTableData[0].interestRate,disabled: this.disableFields }],
        active:[ {value:this.addedInterestTableData[0].activeFlag,disabled: this.disableFields}],
        GONo: [{value:this.addedInterestTableData[0].goNo,disabled: this.disableFields}],
        selectedGODate: [{value:this.addedInterestTableData[0].goDate,disabled: this.disableFields}],
        selectedWEFDate: [{value:this.addedInterestTableData[0].wef,disabled: this.disableFields}],
        selectedWETDate: [{value:this.addedInterestTableData[0].endDate,disabled: this.disableFields}],
    });
  }
  approve(){}
}
