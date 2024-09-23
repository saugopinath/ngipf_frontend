import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { EmployeeDetailsService } from './../../core/services/employeeDetails/employee-details.service';
import { convertDate } from 'src/app/utils/dateConversion';
import { Router } from '@angular/router';

interface Salary {
    name: string;
    code: string;
}
interface Treasury {
    treasuryName: string;
    treasuryCode: string;
    intTreasuryCode: number;
}
interface PFDAdmin {
    pfdName: string;
    pfdCode: number;
    // operaterCode: number;
}

interface SanctionAdmin {
    sanctionName: string;
    sanctionCode: number;
}

@Component({
    selector: 'app-serach-employee',
    templateUrl: './serach-employee.component.html',
    styleUrls: ['./serach-employee.component.scss'],
})
export class SerachEmployeeComponent implements OnInit {
    // searchEmployee:FormGroup=new FormGroup({});
    treasurySelected:number=0;
    pfdSelected: number = 0;
    searchEmployee: any[] = [];
    dropdownItemSalaryType: Salary[];
    searchEmployeeForm!: FormGroup;
    dropdownItemTreasuryname: Treasury[] = [];
    dropdownItemPfdAdmin: PFDAdmin[] = [];
    dropdownItemSanctionAdmin: SanctionAdmin[] = [];
    trNameSelected: string = '';

    constructor(private fb: FormBuilder, private toastService: ToastService, private EmployeeDetailsService: EmployeeDetailsService, private router: Router) {
        this.dropdownItemSalaryType = [
            { name: 'HRMS', code: 'hrms' },
            { name: 'IOSMS', code: 'iosms' },
        ];
    }

    ngOnInit(): void {
        this.initializeForm();
        this.getTresury();
        // this.getPFDAdmin();
        // this.getSanctionAdmin();
    }

    initializeForm(): void {
        this.searchEmployeeForm = this.fb.group({
            Treasury: ['', Validators.required],
            SanctionAdmin: ['', Validators.required],
            SalarySource: [null, Validators.required],
            PFDAdmin: ['', Validators.required],
            RecommendingAuthority: ['', Validators.required],
            EmployeeId: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Assuming EmployeeId is a numeric value
            PFAccountNumber: ['', Validators.required],
        });
    }

    isInvalidAndTouched(controlName: string): boolean {
        const control = this.searchEmployeeForm.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    trSelected($event) {
        this.treasurySelected=$event.value.intTreasuryCode;
        this.getPFDAdmin($event.value.intTreasuryCode);
    }

    pfdCodeSelected($event) {
        this.pfdSelected = $event.value.operatorId;        // this.pfdCode($event.value.pfdCode);
    }

    getTresury() {
        this.EmployeeDetailsService.getTresury().subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item, index) => {
                    item.treasuryName = item.treasuryName + ' (' + item.treasuryCode + ')';
                    item.intTreasuryCode = item.intTreasuryCode;
                });
                this.dropdownItemTreasuryname = response.result;
                console.log(this.dropdownItemTreasuryname);
                
            }
        });
    }

    getPFDAdmin(intTreasuryCode: number) {
        this.EmployeeDetailsService.getPfdAdmin(intTreasuryCode).subscribe((Response) => {
            if (Response.apiResponseStatus == 0 || Response.apiResponseStatus == 1 || Response.apiResponseStatus == 3) {
                Response.result.map((item, index) => {
                    item.pfdName = item.operatorName + ' (' + item.operatorId + ')';
                    item.pfdCode=item.operatorId;
                });
                this.dropdownItemPfdAdmin = Response.result;
                console.log({"P":this.dropdownItemPfdAdmin});
                // Response.result.map((item:any)=>{
                //   item.Name=this.dropdownItemTreasuryname[{item.trName,item.trCode}];
                // })
            }
        });
    }

    getSanctionAdmin() {
        this.EmployeeDetailsService.getSanctionAdmin().subscribe((Response) => {
            if (Response.apiResponseStatus == 1 || Response.apiResponseStatus == 3) {
                Response.result.map((item, index) => {
                    item.sanctionName = item.sanctionName + ' (' + item.sanctionCode + ')';
                });
                this.dropdownItemSanctionAdmin = Response.result;
                console.log(this.dropdownItemSanctionAdmin);
                // Response.result.map((item:any)=>{
                //   item.Name=this.dropdownItemTreasuryname[{item.trName,item.trCode}];
                // })
            }
        });
    }

    viewEmployee(trcode, pfdCode) {
        this.EmployeeDetailsService.viewEmployee(trcode, pfdCode).subscribe((response) => {
            console.log({response});
            if (response.apiResponseStatus == 0 ||response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                console.log(response);
                response.result.map((item: any) => {
                    // item.pfAccount = item.pfAccount;
                    item.empName = item.hrMmEmpBasicDtl.name + '(' + item.hrMmEmpBasicDtl.intEmployeeId + ')';
                    item.DOJ = convertDate(item.serviceDetailsDtl.dateOfJoining);
                    // item.status = item.status;
                });
                this.searchEmployee = response.result;
            } else {
                this.toastService.showAlert(response.message, response.apiResponseStatus);
            }
        });
    }
    onSearchViewEmployee() {
        if (!this.searchEmployeeForm.valid) {
            const formValues = this.searchEmployeeForm.value;
            const trcode = this.treasurySelected; // Assuming Treasury is an object with a trCode property
            const pfdCode = this.pfdSelected; // Assuming PFDAdmin is an object with a pfdCode property
            // const sanctionCode = formValues.SanctionAdmin.sanctionCode; // Assuming SanctionAdmin is an object with a sanctionCode property

            this.viewEmployee(trcode, pfdCode);
        } else {
            this.toastService.showAlert('Please fill out the form correctly.', 2);
        }
    }
    editEmployee($event) {
        console.log('event',$event);
        
        const selectedEmployee = this.searchEmployee.filter(e => e.hrMmEmpBasicDtl === $event);
        console.log('selected data',selectedEmployee);

        if (selectedEmployee) {
            this.router.navigate(['employeeDetails/viewEmployee/entryEmployee'], { state: { data: selectedEmployee } });
        } else {
            console.error('Employee not found');
        }
        
        // this.router.navigate(['employeeDetails/viewEmployee/entryEmployee'], { state: { data: selectedEmployee } });
    }
    

    
}
