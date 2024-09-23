import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { PermissionOfInitiationService } from 'src/app/core/services/openingbalancecapture/permission-of-initiation.service';

interface hoaName {
    hoaName: string;
    hoaCode: string;
}
interface Treasury {
    treasuryName: string;
    treasuryCode: string;
    intTreasuryCode: number;
}
interface Status {
    name: string;
}
interface Year {
    year: string;
}
export interface Item {
    operatorId: number;
    operatorName: string;
    treasuryCode: string;
    intTransfer: string;
    interestYearUpto: string;
    status1: string;
    ind?: number;
}
@Component({
    selector: 'app-permission-of-initiation',
    templateUrl: './permission-of-initiation.component.html',
    styleUrls: ['./permission-of-initiation.component.scss'],
})
export class PermissionOfInitiationComponent implements OnInit {
    selectedCheckboxList: number[] = [];
    confirmationTableData: any[] = [];
    PermissionForm!: FormGroup;
    showTreasury: boolean = true;
    showHeadOfAccount: boolean = true;
    showTable: boolean = false; // Flag to control table visibility
    value: boolean;
    dropdownItemHoa: hoaName[] = [];
    dropdownItemTreasuryname: Treasury[] = [];
    dropdownPermissionStatus: Status[] = [];
    dropdownItemInterestYear: Year[] = [];
    tableData: any;
    displayDetails: boolean = false;
    displayApprovalDialog: boolean = false;
    treasurySelected: string = '';
    hoaSelected: string = '';
    isVerifiedAndChecked: boolean = true;
    selectedCheckbox: number | null = null;
    selectedpermissionOfInitiation: any;
    permissionStatus: any = [];
    permissionFinYear: any = [];
    dialogboxData: Item[] = [];
    mpp: Map<number, number> = new Map();
    showDialog: boolean = false;
    
    i:any;
     status: string = ''
     remarks: string = ''
    constructor(private fb: FormBuilder, private toastService: ToastService, private permissionOfInitiationService: PermissionOfInitiationService, private router: Router) { }

    ngOnInit(): void {
        this.initializeForm();
        this.PermissionForm.get('Search_By')?.valueChanges.subscribe((value) => {
            this.toggleFieldsVisibility(value);
        });
    }

    initializeForm(): void {
        this.PermissionForm = this.fb.group({
            Search_By: ['', Validators.required],
            Treasury: [''],
            Head_of_Account: [''],

        });
    }


    trSelected($event) {
        console.log('treasury event', $event.value.intTreasuryCode);
        this.treasurySelected = $event.value.intTreasuryCode;

    }

    selectedHoa($event: any): void {
        console.log($event.value.hoa);
        this.hoaSelected = $event.value.hoa;
    }

    toggleFieldsVisibility(value: string): void {
        if (value === 'treasury') {
            this.showTreasury = true;
            this.showHeadOfAccount = false;
            this.PermissionForm.get('Treasury')?.setValidators(Validators.required);
            this.PermissionForm.get('Head_of_Account')?.clearValidators();
            this.getTresury();

        } else if (value === 'hoa') {
            this.showTreasury = false;
            this.showHeadOfAccount = true;
            this.PermissionForm.get('Treasury')?.clearValidators();
            this.PermissionForm.get('Head_of_Account')?.setValidators(Validators.required);
            this.getHOA();
        } else {
            this.showTreasury = true;
            this.showHeadOfAccount = true;
            this.PermissionForm.get('Treasury')?.setValidators(Validators.required);
            this.PermissionForm.get('Head_of_Account')?.setValidators(Validators.required);
            this.getTresury();
            this.getHOA();

        }
        this.PermissionForm.get('Treasury')?.updateValueAndValidity();
        this.PermissionForm.get('Head_of_Account')?.updateValueAndValidity();
    }

    // Method to check if a form control is invalid and touched
    isInvalidAndTouched(controlName: string): boolean {
        const control = this.PermissionForm.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    // Method to reset the form
    resetForm(): void {
        this.PermissionForm.reset();
        this.showTreasury = true;
        this.showHeadOfAccount = true;
        this.showTable = false; // Reset table visibility
    }

    // Method to handle the search button click
    onSearch(): void {
        if (this.PermissionForm.valid) {
            const searchBy = this.PermissionForm.get('Search_By')?.value;
            let code = '';
            if (searchBy === 'treasury') {
                code = this.treasurySelected;
                this.getTableData(searchBy, code);
            } else if (searchBy === 'hoa') {
                code = this.hoaSelected;
                this.getTableData(searchBy, code);
            } else {
                code = this.treasurySelected;
            }
            if (code) {
                this.getTableData(searchBy, code);
            }
            this.showTable = true;

        } else {
            this.showTable = false; // Hide the table if form is invalid
            Object.keys(this.PermissionForm.controls).forEach((field) => {
                const control = this.PermissionForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }
    }




    showDetailsDialog(index: number, rowData: any): void {
        this.selectedpermissionOfInitiation = rowData;
        this.remarks = rowData.remarks;  // Store the remarks for display
        this.displayDetails = true;
    }
    openDialog(ind: number) {
        console.log(ind);
        
        this.showDialog = true;
        this.selectedpermissionOfInitiation = this.tableData[ind];
        this.remarks = this.tableData[ind].remarks;  // Store the remarks for display
    }

    closeDialog() {
        this.showDialog = false;
    }
    showApprovalDialog(): void {
        this.displayApprovalDialog = true;
        // this.permissionOfInitiationService.fetchApprovalData()
    }

    isApproveDisabled(): boolean {
        return this.selectedCheckbox === null;
    }
    setCheckBox($event: any) {
        this.isVerifiedAndChecked = !$event.checked
    }
    confirmApproval(): void {
        if (this.isVerifiedAndChecked) {
            this.toastService.showAlert('Approval confirmed!', 1);
        } else {
            this.toastService.showAlert('Please verify and check the details.', 0);
        }
        this.displayApprovalDialog = false;
    }

    approveRow(rowData: any): void {
        this.selectedpermissionOfInitiation = rowData;
        this.isVerifiedAndChecked = false; // Reset checkbox state
        this.displayApprovalDialog = true;
        console.log(rowData);

    }

    onCheckboxChange(index: number, tableData: any): void {
        console.log(tableData);
        if (this.selectedCheckbox === index) {
            this.isVerifiedAndChecked = !this.isVerifiedAndChecked; // Toggle the checkbox state
            // this.confirmationTableData.push(tableData);
            this.confirmationTableData.filter(item => item != tableData);
        } else {
            this.selectedCheckbox = index;
            this.isVerifiedAndChecked = true; // Set the checkbox state to true
            this.confirmationTableData.push(tableData);
        }
    }
    // onCheckboxChange($event: any, item: Item, ri: number): void {
    //     if ($event.checked && !this.mpp[ri]) {

    //         // item.convertDate = dateString(item.selectedDate);
    //          item.ind = ri;
    //         this.dialogboxData.push(item);
    //         this.mpp[ri] = 1;
    //     } else if (!$event.checked && this.mpp[ri]) {
    //         this.dialogboxData = this.dialogboxData.filter((element) => element.ind != ri);
    //         this.mpp[ri] = 0;
    //     }
    // }
    getTresury() {
        this.permissionOfInitiationService.getTresury().subscribe((response) => {
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
    getHOA() {
        this.permissionOfInitiationService.getHOA().subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item) => {
                    item.hoaName = item.institutions + ' (' + item.hoa + ')';
                });
                this.dropdownItemHoa = response.result;
                console.log(this.dropdownItemHoa);
            }
        });
    }
    getpermissionstatus() {
        this.permissionOfInitiationService.getpermissionstatus().subscribe((response) => {
            console.log("Permission Status", response);
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                this.dropdownPermissionStatus = response.result;
                console.log(this.dropdownPermissionStatus);
            }
        });
    }

    getInterestYears(): void {
        this.permissionOfInitiationService.getInterestYears().subscribe((response) => {
            if (response.apiResponseStatus == 1) {
                if (response.result) {
                    response.result.map((item: any) => {
                        item.year = item.fin_Year;
                    });
                }
                this.dropdownItemInterestYear = response.result;
            } else {
                this.toastService.showError(response.message);
            }
        });
    }


    getTableData(searchBy: string, code: string, treasuryCode?: string) {
        if (searchBy == 'treasury') {

            this.permissionOfInitiationService.getTableDataByTreasury(code).subscribe((response) => {

                console.log('treasury', { response });
                if ([0, 1, 3].includes(response.apiResponseStatus)) {
                    if (response.result) {
                        this.tableData = response.result;
                        console.log(this.tableData);

                    }
                }
            });
        } else if (searchBy == 'hoa') {
            this.permissionOfInitiationService.getTableDataByHOA(code).subscribe((response) => {
                if ([0, 1, 3].includes(response.apiResponseStatus)) {
                    if (response.result) {
                        // Adding remarks dynamically for each row
                        this.tableData = response.result.map((row, index) => ({
                            ...row,
                            ind: index,
                            remarks: `Directorate of Pension, Provident Fund and Group Insurance, West Bengal (DPPG,WB) has given permission for balance capture of all subscribers under the ${row.treassuryName}, ${row.operatorName}as on ${row.goDate}. PF Register for the year 2023-2024 is to be verified and submitted online to DPPG,WB`
                        }));
                        console.log(this.tableData);
                    }
                }
            });

        } else {
            //  console.log(code, treasuryCode);

            // this.permissionOfInitiationService.getTableDataByHoaAndTreasury(code, treasuryCode).subscribe((response) => {
            //     console.log({ response });
            //     if (response.apiResponseStatus == 1) {

            //         this.tableData = response.result;
            //     } else {
            //         this.toastService.showError(response.message);
            //     }
            // });
        }
        this.getInterestYears();
        this.getpermissionstatus();
    }

    ApproveData() {
        //   debugger;  
        //    console.log(this.selectedpermissionOfInitiation);
        console.log(this.confirmationTableData);
        const payload = this.confirmationTableData.map((item: any) => ({
            requestSourceType: "ty",
            workflowStatusFlag: "op",
            dmlStatusFlag: 0,
            description: "string",

        }));
        // [
        //     {
        //         "operatorId": 17,
        //         "operatorName": "B.D.O., ALIPURDUAR-II(GP-8336)",
        //         "treasuryCode": "JAC",
        //         "intTransfer": "Pre NGIPF",
        //         "interestYearUpto": "2022-2023",
        //         "status1": "Approved"
        //     }
        // ]
        this.permissionOfInitiationService.InsertPermissionOfInitiationData(payload).subscribe((response) => {
            if (response.apiResponseStatus == 0) {
                this.toastService.showSuccess(response.message);
            } else {
                this.toastService.showError(response.message);
            }
        });
        this.displayApprovalDialog = false;
    }
}
