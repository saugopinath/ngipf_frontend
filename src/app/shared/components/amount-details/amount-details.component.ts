/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaymentModeOptions } from 'src/app/core/enum/common_enum';
import { NotificationService } from 'src/app/core/services/notification.service';
import { trConfigObj } from 'src/app/core/utils/trConfig';

@Component({
    selector: 'amount-details',
    templateUrl: './amount-details.component.html',
    styleUrls: ['./amount-details.component.scss']
})
export class AmountDetailsComponent implements OnInit {
    @Input() parentFormName: FormGroup;
    @Output() AmountChanged = new EventEmitter<any>();

    constructor(private notify: NotificationService) {}

    ngOnInit(): void {
        if (!trConfigObj.bt_PresentsInTR.includes(this.parentFormName.getRawValue().form_code)) {
            this.parentFormName.get('net_amount').disable();
            this.parentFormName.get('BTAmount').disable();
        }
        if (trConfigObj.claimFor_PresentsInTR.includes(this.parentFormName.getRawValue().form_code)) {
            this.parentFormName.controls['net_amount'].disable();
            this.parentFormName.controls['BTAmount'].disable();
        }
    }
    getToday(): string {
        return new Date().toISOString().split('T')[0];
    }

    calculateNetAmt() {
        if (this.parentFormName.getRawValue().paymentMode.value != PaymentModeOptions.NIL) {
            if (this.parentFormName.controls.net_amount.valid && !this.parentFormName.controls.BTAmount.valid && Number(this.parentFormName.controls.gross_amount.value) >= Number(this.parentFormName.controls.net_amount.value)) {
                this.parentFormName.patchValue({
                    BTAmount: this.parentFormName.getRawValue().gross_amount - this.parentFormName.getRawValue().net_amount,
                });
            } else if (this.parentFormName.controls.net_amount.valid && !this.parentFormName.controls.BTAmount.valid && Number(this.parentFormName.controls.gross_amount.value) < Number(this.parentFormName.controls.net_amount.value)) {
                this.notify.warning("Gross Amount can't be lesser than Net Amount...!");
            } else if (!this.parentFormName.controls.net_amount.valid && this.parentFormName.controls.BTAmount.valid && Number(this.parentFormName.controls.gross_amount.value) >= Number(this.parentFormName.controls.BTAmount.value)) {
                this.parentFormName.patchValue({
                    net_amount: this.parentFormName.getRawValue().gross_amount - this.parentFormName.getRawValue().BTAmount,
                });
            } else if (!this.parentFormName.controls.net_amount.valid && this.parentFormName.controls.BTAmount.valid && Number(this.parentFormName.controls.gross_amount.value) < Number(this.parentFormName.controls.BTAmount.value)) {
                this.notify.warning("Gross Amount can't be lesser than BT Amount...!");
            } else {
                this.parentFormName.patchValue({
                    net_amount: this.parentFormName.getRawValue().gross_amount,
                });

                this.parentFormName.patchValue({
                    BTAmount: 0,
                });
            }
        } else {
            //Nill bill
            this.parentFormName.patchValue({ BTAmount: this.parentFormName.getRawValue().gross_amount, net_amount: 0 });
        }

        this.AmountChanged.emit({
            netAmt: this.parentFormName.getRawValue().net_amount,
            grossAmt: this.parentFormName.getRawValue().gross_amount,
            ByTransferAmount: this.parentFormName.getRawValue().BTAmount,
        });
    }

    calculateGrossAmt() {
        if (this.parentFormName.controls.gross_amount.enabled && Number(this.parentFormName.controls.BTAmount.value) > Number(this.parentFormName.controls.gross_amount.value)) {
            this.notify.warning("BT Amount can't be greater than Gross Amount...!");
            this.parentFormName.controls.BTAmount.reset();
        } else {
            if (!this.parentFormName.controls.gross_amount.valid && this.parentFormName.controls.net_amount.valid) {
                this.parentFormName.patchValue({
                    gross_amount: Number(this.parentFormName.getRawValue().net_amount) + Number(this.parentFormName.getRawValue().BTAmount),
                });
            } else if (this.parentFormName.controls.gross_amount.valid && this.parentFormName.controls.net_amount.valid) {
                this.parentFormName.patchValue({
                    net_amount: this.parentFormName.getRawValue().gross_amount - this.parentFormName.getRawValue().BTAmount,
                });
            }
        }
        this.AmountChanged.emit({
            netAmt: this.parentFormName.getRawValue().net_amount,
            grossAmt: this.parentFormName.getRawValue().gross_amount,
            ByTransferAmount: this.parentFormName.getRawValue().BTAmount,
        });
    }

    calculateByTransferAmt() {
        if (Number(this.parentFormName.controls.net_amount.value) > Number(this.parentFormName.controls.gross_amount.value)) {
            this.notify.warning("Net Amount can't be greater than Gross Amount...!");
            this.parentFormName.controls.net_amount.reset();
        } else {
            if (this.parentFormName.controls.gross_amount.valid) {
                this.parentFormName.patchValue({
                    BTAmount: this.parentFormName.getRawValue().gross_amount - this.parentFormName.getRawValue().net_amount,
                });
            } else if (!this.parentFormName.controls.gross_amount.valid && this.parentFormName.controls.BTAmount.valid) {
                this.parentFormName.patchValue({
                    gross_amount: Number(this.parentFormName.getRawValue().net_amount) + Number(this.parentFormName.getRawValue().BTAmount),
                });
            }
        }
        this.AmountChanged.emit({
            netAmt: this.parentFormName.getRawValue().net_amount,
            grossAmt: this.parentFormName.getRawValue().gross_amount,
            ByTransferAmount: this.parentFormName.getRawValue().BTAmount,
        });
    }
}
