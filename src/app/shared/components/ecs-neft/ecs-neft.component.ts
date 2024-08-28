/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { log } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentModeOptions } from 'src/app/core/enum/common_enum';
import { BankDetailsModel } from 'src/app/core/models/BankDetail.model';
import { CommonService } from 'src/app/core/services/common.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
    selector: 'ecsNeft',
    templateUrl: './ecs-neft.component.html',
    styleUrls: ['./ecs-neft.component.scss']
})
export class EcsNeftComponent implements OnInit {
    @Input() parentFormName: FormGroup;
    @Input() defaultEntries: any[] = [];
    @Input() snaBenData: any[] = [];
    @Output() ECSNEFTdetailsEntered = new EventEmitter<any>();
    ecsForm: FormGroup;
    ecsPayeeInfo: any[] = [];
    ecsTableArray: any[] = [];
    isNeftFilled: boolean = false;
    chequeAmt: number = 0;
    ecsNeftDetails: any[] = [];
    @Input() billId: string;
    ecsDetailsFrm: any[] = [];

    constructor(private notify: NotificationService, private commonService: CommonService, private spinnerService: NgxSpinnerService, private fb: FormBuilder, private sharedService: SharedService) {
        // this.extendedTR21.patchValue({ referenceNO: this.parentFormName.getRawValue().billId });
    }

    ngOnInit(): void {
        this.ecsForm = this.fb.group({
            ecsPartyName: ['', Validators.required],
            ecsPayeeCode: ['', Validators.required],
            ecsIfscCode: ['', Validators.required],
            ecsBankName: [''],
            ecsAccountNo: ['', Validators.required],
            ecsEmail: ['', Validators.required],
            ecsContactNo: [''],
            ecsPanNo: [''],
            ecsAddress: [''],
            ecsAmount: [0, Validators.required],
            ecsPaymentType: [, Validators.required],
            // common: ['', Validators.required],
            // courtPayeeval: ['', Validators.required],
            // isCourtpay: ['', Validators.required],
            // chalanValidityDate: ['', Validators.required],
        });
        this.sharedService.getData().subscribe((res) => {
            if (res) {
                if (res.chequeDetails) {
                    this.chequeAmt = 0;
                    res.chequeDetails.forEach((element: any) => {
                        this.chequeAmt += element.amount;
                    });
                }
            }
        });

        this.defaultEntries.forEach(element => {
            this.ecsTableArray.push(element);
        });

        console.log(this.snaBenData);
        this.snaBenData?.forEach(element => {
            this.ecsTableArray.push({
                ecsPartyName: { beneficiaryName: element.beneficiaryName },
                ecsIfscCode: element.ifscCode,
                ecsAccountNo: element.accNo,
                ecsEmail: element.email,
                ecsContactNo: element.mobileNo,
                ecsPanNo: element.panNo,
                ecsAddress: element.beneficiaryAddress,
                ecsPaymentType: element.beneficiaryType,
                ecsPayeeCode: element.beneficiaryId,
                ecsBankName: element.bankName,
                ecsAmount: this.parentFormName.getRawValue().net_amount,
            });
        });

        if (this.parentFormName.getRawValue().__inModifyMode) {
            this.commonService.getECSbillingData(this.parentFormName.getRawValue().billId).subscribe((res: any) => {
                this.ecsNeftDetails = res.result;
                if (res) {
                    this.ecsDetailsFrm = [];
                    this.ecsNeftDetails.forEach((element: any) => {
                        this.ecsDetailsFrm.push({
                            ecsPartyName: { beneficiaryName: element.payeeName },
                            ecsPayeeCode: element.beneficiaryId,
                            ecsIfscCode: element.ifscCode,
                            ecsBankName: element.bankName,
                            ecsAccountNo: element.bankAccountNumber,
                            ecsEmail: element.email,
                            ecsContactNo: element.contactNumber,
                            ecsPanNo: element.panNo,
                            ecsAddress: element.address,
                            ecsAmount: element.amount,
                            ecsPaymentType: element.payeeType
                        })
                    });
                }
                this.ecsTableArray = this.ecsDetailsFrm;
            });
        }
    }

    get payMode(): string {
        return this.parentFormName.getRawValue().paymentMode.value == PaymentModeOptions.Cheque ? 'Cheque' : this.parentFormName.getRawValue().paymentMode.value == PaymentModeOptions.Both ? 'Both' : 'ECS/NEFT';
    }

    get errorControl(): any {
        return this.ecsForm.controls;
    }

    onECSPartyChange(): void {
        const selectedEcsParty = this.ecsForm.getRawValue().ecsPartyName;
        this.ecsForm.patchValue({
            ecsPayeeCode: selectedEcsParty.beneficiaryIdExt,
            ecsIfscCode: selectedEcsParty.ifscCode,
            ecsBankName: selectedEcsParty.bankName,
            ecsAccountNo: selectedEcsParty.accNo,
            ecsEmail: selectedEcsParty.email,
            ecsContactNo: selectedEcsParty.mobileNo,
            ecsPanNo: selectedEcsParty.panNo,
            ecsAddress: selectedEcsParty.beneficiaryAddress,
            ecsAmount: '',
            // ecsPaymentType: selectedEcsParty.payeeType == 1 ? 'Employee' : selectedEcsParty.payeeType == 2 ? 'Pensioner' : 'Others',
            ecsPaymentType: selectedEcsParty.beneficiaryType,
        });
    }

    searchforBeneficaryName(e: any) {
        if (e.filter.length >= 2) {
            this.commonService.getECSneft(e.filter).subscribe((res: any) => {
                this.ecsPayeeInfo = res.result;
            });
        }
    }

    addECSArray() {
        console.log(this.ecsForm.value);
        if (this.ecsForm.valid) {
            const elmExist: any = this.ecsTableArray.find((elm: any) => elm.ecsPayeeCode == this.ecsForm.value.ecsPayeeCode);
            if (this.parentFormName.getRawValue().paymentMode.value == PaymentModeOptions.Both) {
                if (!elmExist) {
                    if (this.ecsAmt + this.chequeAmt + this.ecsForm.value.ecsAmount > this.parentFormName.getRawValue().net_amount) {
                        this.notify.warning('Sum of ECS amount and Cheque amount should not be greater than Net amount...!');
                        this.ecsForm.reset();
                    } else {
                        this.ecsTableArray.push(this.ecsForm.value);
                        this.ecsForm.reset();
                    }
                } else {
                    if (elmExist.ecsPayeeCode == this.ecsForm.value.ecsPayeeCode && elmExist.ecsAmount != this.ecsForm.value.ecsAmount) {
                        const index = this.ecsTableArray.findIndex((elm: any) => elm.ecsPayeeCode == this.ecsForm.value.ecsPayeeCode);
                        if (index !== -1) {
                            if (this.ecsAmt + this.chequeAmt + this.ecsForm.value.ecsAmount - elmExist.ecsAmount > this.parentFormName.getRawValue().net_amount) {
                                this.notify.warning('Sum of ECS amount and Cheque amount should not be greater than Net amount...!');
                                this.ecsForm.reset();
                            } else {
                                this.ecsTableArray[index] = this.ecsForm.value;
                                this.ecsForm.reset();
                            }
                        }
                    } else if (elmExist.ecsPayeeCode == this.ecsForm.value.ecsPayeeCode && elmExist.ecsAmount == this.ecsForm.value.ecsAmount) {
                        this.notify.warning('This beneficiary is already selected, please change the amount to update the record..!');
                    }
                }
            } else if (this.parentFormName.getRawValue().paymentMode.value == PaymentModeOptions['ECS/NEFT']) {
                if (!elmExist) {
                    if (this.ecsAmt + this.ecsForm.value.ecsAmount > this.parentFormName.getRawValue().net_amount) {
                        this.notify.warning("ECS deduction can't be greater than Net Amount...!");
                        this.ecsForm.reset();
                    } else {
                        this.ecsTableArray.push(this.ecsForm.value);
                        this.ecsForm.reset();
                    }
                } else {
                    if (elmExist.ecsPayeeCode == this.ecsForm.value.ecsPayeeCode && elmExist.ecsAmount != this.ecsForm.value.ecsAmount) {
                        const index = this.ecsTableArray.findIndex((elm: any) => elm.ecsPayeeCode == this.ecsForm.value.ecsPayeeCode);
                        if (index !== -1) {
                            if (this.ecsAmt + this.ecsForm.value.ecsAmount - elmExist.ecsAmount > this.parentFormName.getRawValue().net_amount) {
                                this.notify.warning("ECS deduction can't be greater than Net Amount...!");
                                this.ecsForm.reset();
                            } else {
                                this.ecsTableArray[index] = this.ecsForm.value;
                                this.ecsForm.reset();
                            }
                        }
                    } else if (elmExist.ecsPayeeCode == this.ecsForm.value.ecsPayeeCode && elmExist.ecsAmount == this.ecsForm.value.ecsAmount) {
                        this.notify.warning('This beneficiary is already selected, please change the amount to update the record..!');
                    }
                }
            }
        } else {
            this.notify.warning('Please fill the form atfirst..!');
            this.ecsForm.markAllAsTouched();
        }
    }

    get ecsAmt() {
        let sum: number = 0;
        this.ecsTableArray.forEach((e) => {
            sum += +e.ecsAmount;
        });
        return sum;
    }

    save(e: any) {
        if (this.ecsTableArray.length == 0) {
            this.notify.warning('Please add the form data to the table first...!');
        } else {
            var EcsDetails: BankDetailsModel[] = [];
            this.ecsTableArray.forEach((element, index) => {
                var bankdetailarray: BankDetailsModel = new BankDetailsModel();
                // bankdetailarray.trMasterId = this.parentFormName.getRawValue().trMasterId;
                bankdetailarray.bankName = element.ecsBankName;
                bankdetailarray.ifscCode = element.ecsIfscCode;
                // bankdetailarray.accountType = this.ecsPayeeInfo[0].accountType;
                bankdetailarray.bankAccountNumber = element.ecsAccountNo;
                bankdetailarray.amount = element.ecsAmount;
                bankdetailarray.contactNumber = element.ecsContactNo;
                bankdetailarray.address = element.ecsAddress;
                bankdetailarray.email = element.ecsEmail;
                bankdetailarray.billId = this.parentFormName.getRawValue().billId;
                bankdetailarray.payeeName = element.ecsPartyName?.beneficiaryName;
                bankdetailarray.beneficiaryId = element.ecsPayeeCode;
                bankdetailarray.payeeType = element.ecsPaymentType;
                bankdetailarray.panNo = element.ecsPanNo;
                EcsDetails.push(bankdetailarray);
            });

            if (this.parentFormName.getRawValue().paymentMode.value == PaymentModeOptions.Both) {
                this.commonService.postEcsNeft(EcsDetails).subscribe((res: any) => {
                    if (res.apiResponseStatus == 1) {
                        this.notify.successful(res.message);
                        this.ECSNEFTdetailsEntered.emit({
                            isNeftFilled: true,
                            ecsDetails: EcsDetails,
                        });
                        this.sharedService.updateData({ ecsDetails: EcsDetails });
                    } else {
                        this.notify.error(res.message);
                    }
                });
            } else if (this.parentFormName.getRawValue().paymentMode.value == PaymentModeOptions['ECS/NEFT']) {
                if (this.ecsAmt != this.parentFormName.getRawValue().net_amount) {
                    this.notify.warning('ECS deduction and Net amount are not equal...!');
                } else {
                    this.commonService.postEcsNeft(EcsDetails).subscribe((res: any) => {
                        if (res.apiResponseStatus == 1) {
                            this.notify.successful(res.message);
                            this.ECSNEFTdetailsEntered.emit({
                                isNeftFilled: true,
                                ecsDetails: EcsDetails,
                            });
                        } else {
                            this.notify.error(res.message);
                        }
                    });
                }
            }
        }
    }

}
