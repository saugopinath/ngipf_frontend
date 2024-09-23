import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { InitialBalanceCaptureService } from 'src/app/core/services/openingbalancecapture/initial-balance-capture.service';
import { ToastService } from 'src/app/core/services/toast.service';

interface SubscriberStatus {
    subscriberStatus: string;
}
interface Status {
    status: string;
}
@Component({
    selector: 'app-initial-capture-balance',
    templateUrl: './initial-capture-balance.component.html',
    styleUrls: ['./initial-capture-balance.component.scss'],
})
export class InitialCaptureBalanceComponent implements OnInit {
    remarks: string = '';
    status: string = '';
    modalDisplayData: any;
    index: number = 0;
    initialBalanceCaptureForm!: FormGroup;
    dropDownItemSubscriberStatus: SubscriberStatus[] = [];
    dropdownStatus: Status[] = [];
    showTable: boolean = false;
    tableForm!: FormGroup;
    tableData: any[] = [];
    isEditable: boolean = false;
    isEditMode: boolean = false;
    isModify: boolean = false;
    showDialog: boolean = false;

    totalCaptureBalance: number;
    totalDeposit: number = 0;
    totalClosing: number = 0;
    totalWithdrawal: number = 0;
    constructor(private fb: FormBuilder, private initialBalanceCaptureService: InitialBalanceCaptureService, private toastService: ToastService) {
        this.dropDownItemSubscriberStatus = [{ subscriberStatus: 'Own Office' }, { subscriberStatus: 'Transffed/Terminated' }, { subscriberStatus: 'All' }];
        this.dropdownStatus = [{ status: 'All' }, { status: 'Yet to be Captured' }, { status: 'Saved' }, { status: 'Forwarded to Approver' }, { status: 'Approved' }, { status: 'Send Back' }];
    }

    ngOnInit(): void {
        this.initializeForm();
    }
    initializeForm(): void {
        this.initialBalanceCaptureForm = this.fb.group({
            Head_of_Account: [''],
            treasury: [''],
            subscribersStatus: [''],
            pfd_Admin: [''],
            year: [''],
            Sanction_Admin: [''],
            pfAccNo: [''],
            emp_id: [''],
            status: [''],
        });
    }
    tableFormData(): void {
        this.tableForm = this.fb.group({
            captureBalance: [{ value: this.totalCaptureBalance, disabled: !this.isEditable }],
            totalWithdrawal: [{ value: this.totalWithdrawal, disabled: !this.isEditable }],
            totalDeposit: [{ value: this.totalDeposit, disabled: !this.isEditable }],
            totalOpening: [''],
            totalClosing: [{ value: this.totalClosing, disabled: !this.isEditable }],
            unsetteldBalance: [''],
        });
    }
    resetForm(): void {
        this.initialBalanceCaptureForm.reset();
    }

    getTableData(): void {
        this.initialBalanceCaptureService.getTableData().subscribe((response) => {
            console.log(response);

            if (response.apiResponseStatus === 0 || response.apiResponseStatus === 1 || response.apiResponseStatus === 3) {
                this.toastService.showSuccess(response.message);

                const data = response.result.map((x, index) => ({
                    ...x,
                    id: index,
                    isChanged: false,
                    isChecked: false,
                }));

                this.tableData = data;
                console.log(this.tableData);
                this.calTotalCaptureBalance();
            } else {
                const data = response.result.map((x, index) => ({
                    ...x,
                    id: index,
                    isChanged: true,
                    isChecked: true,
                }));

                this.tableData = data;
                this.toastService.showAlert(response.message, response.apiResponseStatus);
            }
        });
    }

    calTotalCaptureBalance() {
        let total = 0;
        for (let i = 0; i < this.tableData.length; i++) {
            total += parseFloat(this.tableData[i].openingBalance);
            this.totalDeposit += parseFloat(this.tableData[i].totalDeposit);
            this.totalClosing += parseFloat(this.tableData[i].closingBalance);
            this.totalWithdrawal += parseFloat(this.tableData[i].totalWithdrawal);
        }
        // console.log("Onchange Event", this.tableData);

        //   console.log("total count", total);

        this.totalCaptureBalance = total;
        this.tableFormData();
    }

    onValueChange(index: any, newValue: any): void {
        console.log(`'Start,index=${index},value=${newValue}`);

        const rowData = this.tableData[index];
        if (rowData) {
            // Compare new value with original value
            const originalValue = rowData.originalOpeningBalance || 0; // Use 0 if undefined
            rowData.isChanged = newValue !== originalValue.toString();

            // Automatically check the checkbox if the value has changed
            rowData.isChanged = true;
            rowData.isChecked = rowData.isChanged;
            console.log(rowData);

            this.calTotalCaptureBalance();
            // this.tableFormData();

            // console.log(`capture${this.totalCaptureBalance}`);
            console.log(this.getCheckedValues());
        }
    }

    getCheckedValues() {
        let ans = [];
        for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].isChecked) {
                ans.push(this.tableData[i]);
            }
        }
        return ans;
    }

    onSearch(): void {
        this.showTable = true;
        this.getTableData();
        this.calTotalCaptureBalance();
    }

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        this.isModify = true;
    }

    // Function to handle saving changes
    saveChanges() {
        // Save the modified data
        console.log('Data saved:', this.tableData);
        this.isEditMode = false; // Exit edit mode after saving
    }

    displayDialog(index: any, newValue: any) {
        this.showDialog = true;
        console.log(index);
        this.modalDisplayData = this.tableData[index];
        this.remarks = `Directorate of Pension, Provident Fund and Group Insurance, West Bengal (DPPG,WB) has given permission for balance capture of all subscribers under the ${this.modalDisplayData.pfAcountNumber}, NETAJI INSTITUTE FOR ASIAN STUDIES of Calcutta PAO-III(CAF) as on 01/04/2023. PF Register for the year 2023-2024 is to be verified and submitted online to DPPG,WB`;
    }
    handleOk() {
        if (this.remarks != '') {
            this.status = this.remarks;
        }
    }
    closeDialog() {
        this.showDialog = false;
    }
}
