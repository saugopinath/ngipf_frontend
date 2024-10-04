import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { CapturePFInterestYearService } from 'src/app/core/services/CapturePFInterestYearDetails/capture-pfinterest-year.service';
import { MasterService } from 'src/app/core/services/master/master.service';
import {
    DynamicTable,
    DynamicTableQueryParameters,
    ActionButtonConfig,
    FilterParameter,
    SortParameter
} from 'src/app/core/models/dynamic-table';
import { InterestCreditedStatus } from 'src/app/core/models/interest';

interface CodeMasterList {
    name: string;
    code: number;
  }




@Component({
    selector: 'app-capture-pf-interest-year',
    templateUrl: './capture-pf-interest-year.component.html',
    styleUrls: ['./capture-pf-interest-year.component.scss'],
})
export class CapturePfInterestYearComponent implements OnInit {
    capturePfInterestYearForm!: FormGroup;
    showTreasury: boolean = true;
    showHeadOfAccount: boolean = true;
    dropdownItemHeadOfAccountId:CodeMasterList[] = [];
    HoadMasterList: CodeMasterList[] = [];
    TresuaryMasterList: CodeMasterList[] = [];
    StatusMasterList: CodeMasterList[] = [];
    filterParams: FilterParameter[] = [];
    sortParams: SortParameter | any;
    routeItems: MenuItem[] = [];
    tableActionButton: ActionButtonConfig[] = [];
    tableData:DynamicTable<InterestCreditedStatus>|any;
    tableQueryParameters:DynamicTableQueryParameters|any;
    private subscribtion: Subscription | any;
    showTable: boolean = false;

    constructor(private fb: FormBuilder, private MasterService: MasterService, private CapturePFInterestYearService: CapturePFInterestYearService) {
  
        this.dropdownItemHeadOfAccountId = [
            { name: '2049', code: 2049 },
            
        ];
    }

    ngOnInit(): void {
        this.initializeForm();
       
        this.capturePfInterestYearForm.get('Search_By')?.valueChanges.subscribe((value) => {
            this.toggleFieldsVisibility(value);
        });
    }

    initializeForm(): void {
        this.capturePfInterestYearForm = this.fb.group({
            DebitHeadOfAccount: [''],
            HeadOfAccountId: [''],
            HeadOfAccount: [''],
            OperatorName: [''],
            Search_By: ['', Validators.required],
            Treasury: ['', Validators.required],
            Status: ['', Validators.required],
            Year: [''],
        });
        this.getStatusMaster(3);
    }

  
   
    toggleFieldsVisibility(value: string): void {
        if (value === 'option1') {  
            this.showTreasury = true;
            this.showHeadOfAccount = true;
            this.capturePfInterestYearForm.get('Treasury')?.setValidators(Validators.required);
            this.getHOA();
            this.capturePfInterestYearForm.get('HeadOfAccount')?.setValidators(Validators.required);
        } else if (value === 'option2') {
            this.showTreasury = false;
            this.showHeadOfAccount = true;
            this.getHOA();
            this.capturePfInterestYearForm.get('Treasury')?.clearValidators();
            this.capturePfInterestYearForm.get('HeadOfAccount')?.setValidators(Validators.required);
        } else {
            this.showTreasury = true;
            this.showHeadOfAccount = false;
            this.getallTresury();
            this.capturePfInterestYearForm.get('Treasury')?.setValidators(Validators.required);
            this.capturePfInterestYearForm.get('HeadOfAccount')?.clearValidators();
        }
        this.capturePfInterestYearForm.get('Treasury')?.updateValueAndValidity();
        this.capturePfInterestYearForm.get('HeadOfAccount')?.updateValueAndValidity();
    }

    isInvalidAndTouched(controlName: string): boolean {
        const control = this.capturePfInterestYearForm.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    resetForm(): void {
        this.capturePfInterestYearForm.reset();
        this.showTreasury = true;
        this.showHeadOfAccount = true;
    }

   



    getHOA(): void {
        this.MasterService.getHoa().subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item, index) => {
                    item.Name = item.Name ;
                    item.Code = item.Code;
                });
                this.HoadMasterList = response.result;
            }
        });
    }
    HoaSelected($event) {
        this.getTresuryByHoa($event.value.code);
      }
    getTresuryByHoa(hoa: number) {
        this.MasterService.getTresuryByHoa(hoa).subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
               // console.log(response.result);
                response.result.map((item, index) => {
                  item.Name = item.treasuryName+' ('+item.treasuryCode+')';
                  item.Code = item.intTreasuryId;
                   
                });
                this.TresuaryMasterList = response.result;
                //console.log(this.TresuaryMasterList);
                
                
            }
        });
      }
      getallTresury(): void {
        this.MasterService.getallTresury().subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
               // console.log(response.result);
                response.result.map((item, index) => {
                    item.Name = item.treasuryName+' ('+item.treasuryCode+')';
                    item.Code = item.intTreasuryId;
                });
                this.TresuaryMasterList = response.result;
                
            }
        });
    }

      getStatusMaster(masterType: number) {
        this.MasterService.getStatusMaster(masterType).subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item, index) => {
                    item.Name = item.Name ;
                    item.Code = item.Code;
                });
                this.StatusMasterList = response.result;
            }
        });
    }
  

    onSearch(): void {
        
        if (this.capturePfInterestYearForm.valid) {
            
           

           
           const SortParameter = {
                field: 'IntOperator.OperatorId',
                order: 'ASC'
            };
            const convertedFilters: FilterParameter[] = [];
            const treasury_id = this.capturePfInterestYearForm.get('Treasury').value;
            if(treasury_id!== null){
                convertedFilters.push({
                    field: 'IntOperator.intTreasuryId',
                    value: treasury_id,
                    operator: 'eq',
                });
            }
            const status_id = this.capturePfInterestYearForm.get('Status').value;
            if(status_id!== null){
                convertedFilters.push({
                    field: 'Status',
                    value: status_id,
                    operator: 'eq',
                });
            }
            const operator_id = this.capturePfInterestYearForm.get('OperatorName').value;
            if(operator_id!== null){
                convertedFilters.push({
                    field: 'IntOperator.IntPlOperatorId',
                    value: operator_id,
                    operator: 'eq',
                });
            }
            const queryParameters: DynamicTableQueryParameters = {
                pageSize: 10,
                pageIndex: 1,
                filterParameters: convertedFilters,
                sortParameters: SortParameter,
            };
            //console.log(queryParameters);
            this.tableQueryParameters =queryParameters;
           
            this.showTable = true; // Show the table when the form is valid and search button is clicked
            this.subscribtion = this.CapturePFInterestYearService
            .getActionButtonObservable()
            .subscribe((data) => {
                // this.setToBillCheck();
            });
        this.tableActionButton = [
            {
                buttonIdentifier: 'bill_checking',
                class: '"p-button-raised p-button-rounded',
                icon: 'pi pi-check-circle',
                lable: 'Bill Checking',
              },
        ];
        this.routeItems = [
            { label: 'Bill Details', routerLink: 'personal' },
            { label: 'List Of Objection', routerLink: 'role' },
            // { label: 'BY Transfer', routerLink: 'confirmation' },
            // { label: 'PL Transfer', routerLink: 'confirmation' },
        ];
        
        this.getTableData();
        } else {
            this.showTable = false; // Hide the table if form is invalid
            Object.keys(this.capturePfInterestYearForm.controls).forEach((field) => {
                const control = this.capturePfInterestYearForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }
    }

    getTableData(){
        //console.log(this.tableQueryParameters);
        this.CapturePFInterestYearService.getList('Interest/interestCreditedStatus',this.tableQueryParameters).subscribe((response)=>{
            if(response.apiResponseStatus==1){
                this.tableData = response.result;
            }
        });
    }


    

 





    

  

  
 
}
