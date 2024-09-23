import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { CapturePFInterestYearService } from 'src/app/core/services/CapturePFInterestYearDetails/capture-pfinterest-year.service';
import { hoa } from 'src/app/core/models/hoa.model';

interface Year {
    year: string;
}

interface HOAId {
    hoaId: string;
}

interface OperatorName {
    operatorName: string;
    operatorId: string;
}

interface Status {
    name: string;
    code: string;
}

interface HOA {
    hoaName: string;
    hoaCode: string;
}

interface Treasury {
    trName: string;
    trCode: string;
}
export interface Item {
    hoa: string;
    operatorName: string;
    operatorId: string;
    treasuryName: string;
    intTransfer: string;
    status: string;
    fin_Year: string;
    ind?: number;
    treasuryCode: string;
    intTreasuryCode: string;
    year?: string; 
     interestYearUpto: string;
    
    
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
    dropdownItemStatusType: Status[];
    value: boolean;
    showTable: boolean = false;
    capturePfInterestYear: any[] = [];
    dropdownItemTreasuryname: Treasury[] = [];
    dropdownItemHeadOfAccount: HOA[] = [];
    dropdownItemHeadOfAccountId: HOAId[] = [];
    dropdownItemOperatorName: OperatorName[] = [];
    dropdownItemInterestYear: Year[] = [];
    i: any;
    displayDetails: boolean = false;
    displayApprovalDialog: boolean = false;
    selectedCapturePfInterestYear: any;
    isVerifiedAndChecked: boolean = true;
    selectedCheckbox: number | null = null;
    SelectedHOA: string = '';
    selectTreasuryCode: string = '';
    selectedIntTreasuryCode: string = '';
    dialogboxData: Item[] = [];
    mpp: Map<number, number> = new Map();
    tableData: any[] = [];
    constructor(private fb: FormBuilder, private toastService: ToastService, private CapturePFInterestYearService: CapturePFInterestYearService) {
        this.dropdownItemStatusType = [
            { name: 'Approved', code: 'Approved' },
            { name: 'All', code: 'All' },
            { name: 'Initiated', code: 'Initiated' },
            { name: 'Unapproved', code: 'Unapproved' },
        ];
    }

    ngOnInit(): void {
        this.initializeForm();
        this.getTresury();
        this.getHOA();
        this.getHOAId();
        this.getOperatorname();
        this.capturePfInterestYearForm.get('Search_By')?.valueChanges.subscribe((value) => {
            this.toggleFieldsVisibility(value);
        });
    }

    initializeForm(): void {
        this.capturePfInterestYearForm = this.fb.group({
            DebitHeadOfAccount: [''],
            HeadOfAccountId: ['', Validators.required],
            HeadOfAccount: [''],
            OperatorName: [''],
            Search_By: ['', Validators.required],
            Treasury: [''],
            Status: ['', Validators.required],
            Year: [''],
        });
    }

    selectHoa($event: any): void {
        console.log($event.value.hoa);
        this.SelectedHOA = $event.value.hoa;
    }
    selectTreasury($event) {
        console.log('treasury event', $event.value.treasuryCode);
        this.selectTreasuryCode = $event.value.treasuryCode;
        this.selectedIntTreasuryCode = $event.value.intTreasuryCode;
    }
    toggleFieldsVisibility(value: string): void {
        if (value === 'option1') {  
            this.showTreasury = true;
            this.showHeadOfAccount = true;
            this.capturePfInterestYearForm.get('Treasury')?.setValidators(Validators.required);
            this.capturePfInterestYearForm.get('HeadOfAccount')?.setValidators(Validators.required);
        } else if (value === 'option2') {
            this.showTreasury = false;
            this.showHeadOfAccount = true;
            this.capturePfInterestYearForm.get('Treasury')?.clearValidators();
            this.capturePfInterestYearForm.get('HeadOfAccount')?.setValidators(Validators.required);
        } else {
            this.showTreasury = true;
            this.showHeadOfAccount = false;
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

    onSearch(): void {
        if (this.capturePfInterestYearForm.valid) {
            const searchBy = this.capturePfInterestYearForm.get('Search_By')?.value;
            let code = '';

            if (searchBy === 'option1') {
                const hoaCode = this.SelectedHOA;
                code = this.selectedIntTreasuryCode;
                this.getTableData(searchBy, code, hoaCode);
            } else if (searchBy === 'option2') {
                code = this.SelectedHOA;
                this.getTableData(searchBy, code);
            } else {
                code = this.selectedIntTreasuryCode;
            }
            if (code) {
                this.getTableData(searchBy, code);
            }
            this.showTable = true; // Show the table when the form is valid and search button is clicked
        } else {
            this.showTable = false; // Hide the table if form is invalid
            Object.keys(this.capturePfInterestYearForm.controls).forEach((field) => {
                const control = this.capturePfInterestYearForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }
    }

    getTresury(): void {
        this.CapturePFInterestYearService.getTresury().subscribe((response) => {
            console.log('treasury', { response });
            if ([0, 1, 3].includes(response.apiResponseStatus)) {
                response.result.map((item: any) => {
                    item.trName = item.treasuryName + ' (' + item.treasuryCode + ')';
                });
                this.dropdownItemTreasuryname = response.result;
            }
        });
    }

    getHOA(): void {
        this.CapturePFInterestYearService.getHOA().subscribe((response) => {
            console.log('hoa', { response });
            if ([0, 1, 3].includes(response.apiResponseStatus)) {
                if (response.result) {
                    response.result.map((item: any) => {
                        item.hoaName = item.institutions + ' (' + '00-' + item.hoa + ')';
                    });
                    this.dropdownItemHeadOfAccount = response.result;
                }
            }
        });
    }
    getOperatorname() {
        this.CapturePFInterestYearService.getOperatorName().subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item) => {
                    item.pfdName = item.operatorName + ' (' + item.operatorId + ')';
                    item.pfdCode = item.operatorId;
                });
                this.dropdownItemOperatorName = response.result;
                // console.log(this.dropdownItemPfdAdmin);
            }
        });
    }

    getHOAId(): void {
        this.CapturePFInterestYearService.getHOAId().subscribe((response) => {
            console.log('hoaId', { response });
            if ([0, 1, 3].includes(response.apiResponseStatus)) {
                this.dropdownItemHeadOfAccountId = response.result;
            }
        });
    }
    getInterestYears(): void {
        this.CapturePFInterestYearService.getInterestYears().subscribe((response) => {
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

    getCapturePFInterestYear(): void {
        this.CapturePFInterestYearService.capturePFInterest().subscribe((response) => {
            console.log('search', response.result);
            if ([0, 1, 3].includes(response.apiResponseStatus)) {
                this.capturePfInterestYear = response.result;
            } else {
                this.toastService.showAlert(response.message, response.apiResponseStatus);
            }
        });
    }

    showDetailsDialog(capturePfInterestYear: any, event:any): void {
        // console.log(event);
        this.selectedCapturePfInterestYear = capturePfInterestYear;
        this.displayDetails = true;


    }

    showApprovalDialog(): void {
        this.displayApprovalDialog = true;
    }

    isApproveDisabled(): boolean {
        return this.selectedCheckbox === null;
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
        this.selectedCapturePfInterestYear = rowData;
        this.isVerifiedAndChecked = false; // Reset checkbox state
        this.displayApprovalDialog = true;
    }

    // onCheckboxChange(index: number, capturePfInterestYear: any): void {
    //     this.selectedCapturePfInterestYear = capturePfInterestYear;
    //     if (this.selectedCheckbox === index) {
    //         this.isVerifiedAndChecked = !this.isVerifiedAndChecked; // Toggle the checkbox state
    //     } else {
    //         this.selectedCheckbox = index;
    //         this.isVerifiedAndChecked = true; // Set the checkbox state to true
    //     }
    // }
    onCheckboxChange($event: any, item: Item, ri: number): void {
        if ($event.checked && !this.mpp[ri]) {

            // item.convertDate = dateString(item.selectedDate);
            item.ind = ri;
            this.dialogboxData.push(item);
            this.mpp[ri] = 1;
        } else if (!$event.checked && this.mpp[ri]) {
            this.dialogboxData = this.dialogboxData.filter((element) => element.ind != ri);
            this.mpp[ri] = 0;
        }
    }
    isCheckboxDisabled(item: Item): boolean {
        return !(item.intTransfer && item.fin_Year && item.status);
    }

    setCheckBox($event: any) {
        this.isVerifiedAndChecked = !$event.checked;
    }

    getTableData(searchBy: string, code: string, treasuryCode?: string) {
        if (searchBy == 'option1') {
            this.CapturePFInterestYearService.getTableDataByHoaAndTreasury(treasuryCode, code).subscribe((response) => {
                console.log('Hoa and treasury', { response });
                if (response.apiResponseStatus == 1) {
                    this.tableData = response.result;
                } else {
                    this.toastService.showError(response.message);
                }
            });
        } else if (searchBy == 'option2') {
            this.CapturePFInterestYearService.getTableDataByHOA(code).subscribe((response) => {
                console.log('HOA', { response });
                if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                    if (response.result) {
                        this.tableData = response.result;
                    }
                }
            });
        } else {
            this.CapturePFInterestYearService.getTableDataByTreasury(code).subscribe((response) => {
                console.log('Treasury', { response });
                if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                    if (response.result) {
                        this.tableData = response.result;
                        // console.log(this.setTableData);
                    }
                }
            });
        }
        this.getInterestYears();
    }
    ApproveData() {
       
        const payload = this.dialogboxData.map((item) => ({
            hoa: "",
            intTreasuryCode:"",
            treasuryCode: "",
            treasuryName: "",
            operatorName: "",
            intTransfer: "",
            status: item.status,
           interestYearUpto: item.interestYearUpto ,
        }));

        this.CapturePFInterestYearService.InsertInterestYearCapture(payload).subscribe((response) => {
            if (response.apiResponseStatus == 0 ){
                this.toastService.showSuccess(response.message);
            } else {
                this.toastService.showError(response.message);
            }
        });
        this.displayApprovalDialog = false;
    }
}
