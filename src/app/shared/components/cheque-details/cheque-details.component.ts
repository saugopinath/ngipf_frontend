import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { log } from 'console';
import { ChequeBill_Model } from 'src/app/core/models/ChequeBill.model';
import { CommonService } from 'src/app/core/services/common.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
    selector: 'app-cheque-details',
    templateUrl: './cheque-details.component.html',
    styleUrls: ['./cheque-details.component.scss']
})
export class ChequeDetailsComponent implements OnInit {

    @Input() parentFormName: FormGroup;
    @Output() ChequeDataEntered = new EventEmitter<any>();
    chequeFilled: boolean = false;
    ecsAmt: number = 0;
    chequeTableArray: any[] = [];
    payModeArray: any[] = [{ id: 1, name: 'AC' }, { id: 2, name: 'Order' }];

    chequeForm = this._formBuilder.group({
        payeename: ['', [Validators.required]],
        amount: ['', Validators.required],
        paymode: ['', Validators.required],
    });

    constructor(private _formBuilder: FormBuilder, private commonservice: CommonService, private notify: NotificationService, private sharedService: SharedService) { }

    ngOnInit() {
        this.sharedService.getData().subscribe((res) => {
            if (res) {
                if (res.ecsDetails) {
                    this.ecsAmt = 0;
                    res.ecsDetails.forEach((element: any) => {
                        this.ecsAmt += element.amount;
                    });
                }
            }
        });
    }

    get errorControl() {
        return this.chequeForm.controls;
    }

    addToChequeArray() {
        if (this.chequeForm.valid) {
            if (this.parentFormName.getRawValue().paymentMode.value == '2') {
                if (this.totalChequeAmt + this.ecsAmt + this.chequeForm.value.amount > this.parentFormName.getRawValue().net_amount) {
                    this.notify.warning('Sum of ECS amount and Cheque amount should not be greater than Net amount...!');
                    this.chequeForm.reset();
                } else {
                    this.chequeTableArray.push(this.chequeForm.value);
                    this.chequeForm.reset();
                }
            } else if (this.parentFormName.getRawValue().paymentMode.value == '0') {
                if (this.totalChequeAmt + this.chequeForm.value.amount > this.parentFormName.getRawValue().net_amount) {
                    this.notify.warning("Cheque amount can't be greater than Net Amount...!");
                    this.chequeForm.reset();
                } else {
                    this.chequeTableArray.push(this.chequeForm.value);
                    this.chequeForm.reset();
                }
            }
        } else {
            this.notify.warning('Please fill the form atfirst..!');
            this.chequeForm.markAllAsTouched();
        }
    }

    get totalChequeAmt(): number {
        let sum: number = 0;
        this.chequeTableArray.forEach((e) => {
            sum += +e.amount;
        });
        return sum;
    }

    get payMode(): string {
        return this.parentFormName.getRawValue().paymentMode.value == '0' ? 'Cheque' : this.parentFormName.getRawValue().paymentMode.value == '2' ? 'Both' : '';
    }

    onBtCodeSelectionChange() {

    }

    saveCheque() {
        if (this.chequeTableArray.length == 0) {
            this.notify.warning('Please add the form data to the table first...!');
        } else {
            var chequeDEtail: ChequeBill_Model[] = [];
            this.chequeTableArray.forEach((element, index) => {
                var chequeArray: ChequeBill_Model = new ChequeBill_Model();
                chequeArray.payeeName = element.payeename;
                chequeArray.amount = element.amount;
                chequeArray.billId = this.parentFormName.getRawValue().billId;
                // chequeArray.trMasterId = this.parentFormName.getRawValue().trMasterId;
                chequeArray.payMode = element.paymode.id;
                chequeDEtail.push(chequeArray);
            });

            if (this.parentFormName.getRawValue().paymentMode.value == '2') {
                this.commonservice.submitCheque_Bill(chequeDEtail).subscribe((res: any) => {
                    if (res.apiResponseStatus == 1) {
                        this.notify.success(res.message);
                        this.ChequeDataEntered.emit({
                            chequeDEtail: chequeDEtail,
                            chequeFilled: true,
                        });
                        this.sharedService.updateData({ chequeDetails: chequeDEtail });
                    } else {
                        this.notify.error(res.message);
                    }
                });
            } else if (this.parentFormName.getRawValue().paymentMode.value == '0') {
                if (this.totalChequeAmt != this.parentFormName.getRawValue().net_amount) {
                    this.notify.warning('Cheque Amount and Net amount are not equal...!');
                } else {
                    this.commonservice.submitCheque_Bill(chequeDEtail).subscribe((res: any) => {
                        if (res.apiResponseStatus == 1) {
                            this.notify.success(res.message);
                            this.ChequeDataEntered.emit({
                                chequeDEtail: chequeDEtail,
                                chequeFilled: true,
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
