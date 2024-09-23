import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InterestGenerationMasterService } from 'src/app/core/services/InterestCreditBill/interest-generation-master.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { dateString } from 'src/app/utils/dateToString';

interface hoaName {
    hoaName: string;
    hoaCode: string;
}
interface Treasury {
    treasuryName: string;
    treasuryCode: string;
    // intTreasuryCode: number;
}
interface Interest {
    Type: string;
}

export interface Item {
    treasury: string;
    operator: string;
    GoNo: string;
    selectedDate: string;
    interest: string;
    ind?: number;
    convertDate: string;
}

@Component({
    selector: 'app-interest-credit-generation-master',
    templateUrl: './interest-credit-generation-master.component.html',
    styleUrls: ['./interest-credit-generation-master.component.scss'],
})
export class InterestCreditGenerationMasterComponent implements OnInit {
    FinalPaymentMasterForm!: FormGroup;
    showTable: boolean = false;
    dropdownItemHoa: hoaName[] = [];
    dropdownItemTreasuryname: Treasury[] = [];
    setTableData: [];
    tableData: any;
    rowData: any;
    i: any;
    displayDetails: boolean = false;
    displayApprovalDialog: boolean = false;
    isVerifiedAndChecked: boolean = true;
    selectedCheckbox: number | null = null;
    dropdownItemInterest: Interest[];
    selectedItem: any[] = [];
    selectedItemData: any[] = [];
    mpp: Map<number, number> = new Map();
    dialogboxData: Item[] = [];

    constructor(private fb: FormBuilder, private toastService: ToastService, private router: Router, private interestgenerationmasterService: InterestGenerationMasterService) {
        this.dropdownItemInterest = [{ Type: 'TR-43 Bill' }, { Type: 'Statement to AGWB' }];
    }

    ngOnInit(): void {
        this.initializeForm();
        this.getTresury();
        this.getHOA();
    }

    initializeForm(): void {
        this.FinalPaymentMasterForm = this.fb.group({
            Head_of_Account: ['', Validators.required],
            Treasury: ['', Validators.required],
            NGIPF_Administrator: [''],
        });
    }

    onSearch(): void {
        if (this.FinalPaymentMasterForm.valid) {
            const hoa = this.FinalPaymentMasterForm.get('Head_of_Account')?.value.hoa;
            const treasuryCode = this.FinalPaymentMasterForm.get('Treasury')?.value.intTreasuryCode;
            console.log({ hoa, treasuryCode });
            if (hoa && treasuryCode) {
                this.getTableData(hoa, treasuryCode);
                this.showTable = true;
            } else {
                this.toastService.showError('Please select both Head of Account and Treasury.');
            }
        } else {
            this.showTable = false; // Hide the table if form is invalid
            Object.keys(this.FinalPaymentMasterForm.controls).forEach((field) => {
                const control = this.FinalPaymentMasterForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }
    }

    showApprovalDialog(): void {
        console.log({ test: this.dialogboxData });
        this.displayApprovalDialog = true;
    }


    confirmApproval(): void {
        if (this.isVerifiedAndChecked) {
            // let data = this.dialogboxData.filter((item)=>{item.GoNo,item.convertDate})
            console.log("works"+"this.dialogboxData")
            // this.toastService.showAlert('Approval confirmed!', 1);
            // this.ApproveData()
        } else {
            this.toastService.showAlert('Please verify and check the details.', 0);
        }
        this.displayApprovalDialog = false;
    }

    approveRow(rowData: any): void {
        this.selectedItem = rowData;
        this.isVerifiedAndChecked = false; // Reset checkbox state
        this.displayApprovalDialog = true;
    }

    // onCheckboxChange(indexNo: number): void {
    //     if (this.selectedItem.includes(indexNo)) {
    //         this.isVerifiedAndChecked = !this.isVerifiedAndChecked; // Toggle the checkbox state
    //         this.selectedItem = this.selectedItem.filter((item, index) => item !== indexNo);
    //         this.selectedItemData = this.tableData.filter((item, index) => this.selectedItem.includes(index));
    //     } else {
    //         this.selectedCheckbox = indexNo;
    //         this.selectedItem.push(indexNo);
    //         this.isVerifiedAndChecked = true; // Set the checkbox state to true
    //         this.selectedItemData = [...this.selectedItemData, this.tableData[indexNo]];
    //     }
    // }
    onCheckboxChange($event: any, item: Item, ri: number): void {
        if ($event.checked && !this.mpp[ri]) {
            item.convertDate = dateString(item.selectedDate);
            item.ind = ri;
            this.dialogboxData.push(item);
            this.mpp[ri] = 1;
        } else if (!$event.checked && this.mpp[ri]) {
            this.dialogboxData = this.dialogboxData.filter((element) => element.ind != ri);
            this.mpp[ri] = 0;
        }
    }
    isCheckboxDisabled(item: Item): boolean {
        return !(item.GoNo && item.selectedDate && item.interest);
    }

    setCheckBox($event: any) {
        this.isVerifiedAndChecked = !$event.checked;
    }
    getTresury() {
        this.interestgenerationmasterService.getTresury().subscribe((response) => {
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
        this.interestgenerationmasterService.getHOA().subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item) => {
                    item.hoaName = item.institutions + ' (' + item.hoa + ')';
                });
                this.dropdownItemHoa = response.result;
                console.log(this.dropdownItemHoa);
            }
        });
    }

    getTableData(hoa: string, treasuryCode: string) {
        this.interestgenerationmasterService.getTableDataByHoaAndTreasury(hoa, treasuryCode).subscribe((response) => {
            console.log('hoa&treasury', response);
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                if (response.result) {
                    this.tableData = response.result;
                } else {
                    this.toastService.showError(response.message);
                }
            }
        });
    }
    
    ApproveData() {
        const payload = this.dialogboxData.map(item => ({
            goNumber: item.GoNo,
            goDate: item.convertDate
        }));
        
        this.interestgenerationmasterService.InsertInterestCreditGenerationMaster(payload).subscribe((response) => {
            if (response.apiResponseStatus == 1 ) {
               this.toastService.showSuccess(response.message)
                
            }else{
                this.toastService.showError(response.message)
            }
        });
        this.displayApprovalDialog = false;
    }
    // Method to check if a form control is invalid and touched
    isInvalidAndTouched(controlName: string): boolean {
        const control = this.FinalPaymentMasterForm.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }
}
