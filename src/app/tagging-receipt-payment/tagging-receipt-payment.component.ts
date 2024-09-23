import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from '../core/services/TaggingReceipt/payment.service';
import { ToastService } from '../core/services/toast.service';

enum ReferenceType{
    Deposit='D',
    Ebill='E',
    HRMS='H'
}
interface FinancialYear {
    year: string;
    code: string;
}

enum TransactionType {
    Payment='P',
    Receipt='R'
}

@Component({
    selector: 'app-tagging-receipt-payment',
    templateUrl: './tagging-receipt-payment.component.html',
    styleUrls: ['./tagging-receipt-payment.component.scss'],
})
export class TaggingReceiptPaymentComponent implements OnInit {
    taggingReceiptPayement!: FormGroup;
    maxDateValue: Date = new Date();
    dropdownItemFinancialYear: FinancialYear[];
    displayDialog: boolean = false;
    displayOperatorDialog: boolean = false;
    treasuryCode: string = '';
    isDateRangeLoading: boolean = false;
    treasuryList: any[] = [];
    selectedTreasury: any;
    tableData: any[] = [];
    selectedTransactionType: string;
    selectedPaymentType: string;
    transactionType: string;
    paymentType: string;
    showTableData: boolean = false;
   
    private financialYearDates: { [key: string]: { fromDate: Date; toDate: Date } } = {
        '2022-2023': { fromDate: new Date(2022, 3, 1), toDate: new Date(2023, 2, 31) },
        '2023-2024': { fromDate: new Date(2023, 3, 1), toDate: new Date(2024, 2, 31) },
        '2024-2025': { fromDate: new Date(2024, 3, 1), toDate: new Date(2025, 2, 31) },
    };

    constructor(private fb: FormBuilder,private paymentService: PaymentService,private toastService: ToastService) {
        this.dropdownItemFinancialYear = [
            { year: '2022-2023', code: '2022-2023' },
            { year: '2023-2024', code: '2023-2024' },
            { year: '2024-2025', code: '2024-2025' },
        ];
    }
    
    ngOnInit(): void {
        this.initializeForm();
        
    }
    dropdownItemTransactionType = [
        { label: 'Payment', value:TransactionType.Payment },
        { label: 'Receipt', value:TransactionType.Receipt },
    ];
    dropdownReferenceType = [
        { label : 'Deposit into Treasury Bank',value:ReferenceType.Deposit },
        { label: 'Ebilling/Online PI',value:ReferenceType.Ebill },
        { label: 'HRMS',value:ReferenceType.HRMS },
    ];

    initializeForm(): void {
        this.taggingReceiptPayement = this.fb.group({
            treasuryName: ['', Validators.required],
            operatorDesc: ['',],
            selectedItemTransactionType: ['', Validators.required],
            selectedItemFinancialYear: ['', Validators.required],
            selectedFromDate: ['', Validators.required],
            selectedToDate: ['', Validators.required],
            selectedReferenceType: ['', Validators.required],
        });
    }

    isInvalidAndTouched(controlName: string): boolean {
        const control = this.taggingReceiptPayement.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    onFinancialYearChange(event: any): void {
        const selectedYear = event.value.code;
        const dateRange = this.financialYearDates[selectedYear];

        if (dateRange) {
            this.isDateRangeLoading = true;
            setTimeout(() => {
                this.isDateRangeLoading = false;
                this.taggingReceiptPayement.patchValue({
                    selectedFromDate: dateRange.fromDate,
                selectedToDate: dateRange.toDate
                });
            }, 1000);
        }
    }
    showTreasuryDialog(): void {
        this.displayDialog = true;
        this.getTreasury();
    }
    showOperatorDialog(): void {
        this.displayOperatorDialog = true;
    }
    hideDialog(): void {
        this.displayDialog = false;
    }

    // onSelectTreasury(selectedTreasury: any): void {
    //     if (selectedTreasury) {
    //         this.taggingReceiptPayement.patchValue({
    //             treasuryName: selectedTreasury.treasuryName
    //         });
    //     }
    //     this.hideDialog(); // Close the dialog
    // }
    //  onSelectTreasury(): void {
        
    //         this.hideDialog(); // Close the dialog
        
    // }

    onSelectTreasury(): void {
        if (this.selectedTreasury) {
            this.taggingReceiptPayement.patchValue({
                treasuryName: this.selectedTreasury.treasuryName
            });
        }
        this.hideDialog(); // Close the dialog
    }

    onRowSelect(selectedItem: any): void {
        this.selectedTreasury = selectedItem; // Store the selected treasury
    }
    onReferenceTypeChange(event: any, type: string): void {
        if (type === 'transaction') {
            this.selectedTransactionType = event.value;
            console.log("Transaction Type:", this.selectedTransactionType);
        } else if (type === 'payment') {
            this.selectedPaymentType = event.value;
            console.log("Payment Type:", this.selectedPaymentType);
        }

    }
    onSearch(): void {
        this.showTableData=true;
        this.getTableData(this.selectedTransactionType, this.selectedPaymentType);
    }
    // showTable(transactionType: string, paymentType: string): void {
    //     this.showTableData=true;
        
    //     console.log("Displaying table with Transaction Type:", transactionType, "and Payment Type:", paymentType);
    //     // Add your logic here to display the table based on the selected values
    // }
    // onSearch(transactionType: string, paymentType: string): void {
        
    //     console.log("Displaying table with Transaction Type:", transactionType, "and Payment Type:", paymentType);
    //     // Add your logic here to display the table based on the selected values
    // }
    getTreasury(): void {
        this.paymentService.getTresury().subscribe((response) => {
            if ( response.apiResponseStatus == 1 ) {

                this.toastService.showSuccess(response.message);
                this.treasuryList = response.result;
            }
            else{
                this.toastService.showError(response.message);
            }
        });
    } 
    getTableData(transactionType: string, paymentType: string): void {
        // debugger;
        if(this.selectedTransactionType && this.selectedPaymentType){
        
        console.log(paymentType,transactionType);
        this.paymentService.getTableData(paymentType,transactionType).subscribe((response) => {
            if (response.apiResponseStatus == 1 ){
                this.toastService.showSuccess(response.message);
                this.tableData = response.result;
                console.log(this.tableData);
            } else {
                this.toastService.showError(response.message);
            }
        });
    }
        this.showTableData=true;
    }
}
