import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/services/common.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-bt-details',
    templateUrl: './bt-details.component.html',
    styleUrls: ['./bt-details.component.scss']
})
export class BtDetailsComponent implements OnInit {

    @Input() parentFormName: FormGroup;
    @Output() BtDetailsEntered = new EventEmitter<any>();
    BtFilled: boolean = false;
    btCodeArray: any[] = [];
    btInputArray: any[] = [];
    isDeductionBTAmtEql: boolean = true;
    selectedBtIndex: number;
    payloadArray: any[] = [];

    btForm = this._formBuilder.group({
        amount: ['', Validators.required],
        btSlNo: [, Validators.required],
        btHead: [{ value: '', disabled: true }, [Validators.required]],
        btDesc: [{ value: '', disabled: true }, [Validators.required]],
        btType: [{ value: '', disabled: true }, [Validators.required]],
    });
    fetchedBtDetails: any;

    constructor(private _formBuilder: FormBuilder, private notify: NotificationService, private commonService: CommonService, private spinnerService: NgxSpinnerService) { }

    ngOnInit(): void {
        this.bindBtDetails();
        if (this.parentFormName.getRawValue().__inModifyMode) {
            this.commonService.getBtBillingData(this.parentFormName.getRawValue().billId).subscribe((res: any) => {
                this.fetchedBtDetails = res.result;
                if (res) {
                    this.fetchedBtDetails.forEach((element: any) => {
                        this.btInputArray.push({
                            btSlNo: { btSerial: element.btSerial, type: element.btType },
                            btHead: element.btSerialNavigation.hoa,
                            btDesc: element.btSerialNavigation.desc,
                            btType: element.btSerialNavigation.type,
                            amount: element.amount
                        })
                    });
                }
            });
        }
    }

    get errorControl() {
        return this.btForm.controls;
    }

    bindBtDetails(): any {
        this.commonService.get('BtMaster/BtDetailMaster').subscribe((res: any) => {
            this.btCodeArray = res.result;
        });
    }

    onBtCodeSelectionChange() {
        this.btForm.patchValue({
            btHead: this.btForm.getRawValue().btSlNo['hoa'],
            btDesc: this.btForm.getRawValue().btSlNo['desc'],
            btType: this.btForm.getRawValue().btSlNo['type'],
        });
    }

    get totalBtAmount(): number {
        let t: number = 0;
        this.btInputArray.forEach((e) => {
            t += e.amount;
        });
        return t;
    }

    get totalTreasuryBt(): number {
        let t: number = 0;
        this.btInputArray.forEach((e) => {
            if (e.btType == 'Treasury BT') {
                t += e.amount;
            }
        });
        return t;
    }

    get totalAgBt(): number {
        let t: number = 0;
        this.btInputArray.forEach((e) => {
            if (e.btType == 'Ag BT') {
                t += e.amount;
            }
        });
        return t;
    }

    addBTArray() {
        if (this.btForm.valid) {
            if (this.totalBtAmount + this.btForm.value.amount > this.parentFormName.getRawValue().BTAmount) {
                this.notify.warning("BT deduction can't be greater than BT Amount...!");
                this.btForm.reset();
            } else {
                // this.btCodeArray.splice(this.selectedBtIndex, 1);
                this.btInputArray.push(this.btForm.getRawValue());
                this.btForm.reset();
            }
        } else {
            this.notify.warning('Please fill the form atfirst...!');
            this.btForm.markAllAsTouched();
        }
    }

    savePayeeforBT(event: any) {
        if (this.totalBtAmount != this.parentFormName.getRawValue().BTAmount) {
            this.isDeductionBTAmtEql = false;
            this.notify.warning('Please check the Total BT deduction and BT amount...!');
        } else {
            this.payloadArray = [];
            this.isDeductionBTAmtEql = true;
            if (this.parentFormName.getRawValue().__inModifyMode) {
                this.btInputArray.forEach((elm) => {
                    const payload = {
                        btSerial: elm.btSlNo.btSerial,
                        btType: elm.btSlNo.type,
                        amount: elm.amount,
                        billId: +this.parentFormName.getRawValue().billId
                    };
                    this.payloadArray.push(payload);
                });
            } else {
                this.btInputArray.forEach((elm) => {
                    const payload = {
                        btSerial: elm.btSlNo.btSerial,
                        btType: elm.btSlNo.id,
                        amount: elm.amount,
                        billId: this.parentFormName.getRawValue().billId
                    };
                    this.payloadArray.push(payload);
                });
            }
            this.commonService.saveBtDetails(this.payloadArray,).subscribe((res: any) => {
                if (res.apiResponseStatus == 1) {
                    this.BtFilled = true;
                    this.BtDetailsEntered.emit({
                        totalBtAmount: this.totalBtAmount,
                        btInputArray: this.btInputArray,
                        BtFilled: true,
                    });
                    this.notify.successful(res.message);
                } else {
                    this.notify.error(res.message);
                }
            });
        }
    }

}
