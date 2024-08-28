/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { trConfigObj } from 'src/app/core/utils/trConfig';

@Component({
    selector: 'sanction-details',
    templateUrl: './sanction-details.component.html',
    styleUrls: ['./sanction-details.component.scss']
})
export class SanctionDetailsComponent implements OnInit {

    @Input() parentFormName: FormGroup;
    @Input() sanctionStatus: boolean;
    sanctionResp: any[] = [];

    constructor(private notify: NotificationService, private commonService: CommonService) { }

    ngOnInit() {
        if (trConfigObj.claimFor_PresentsInTR.includes(this.parentFormName.getRawValue().form_code)) {
            this.parentFormName.controls['sanctionBy'].disable();
            this.parentFormName.controls['sanctionDate'].disable();
            this.parentFormName.controls['sanctionAmt'].disable();
            this.parentFormName.controls['sanctionNo'].disable();
        }
    }

    sanctionAmt() {
        if (this.parentFormName.getRawValue().sanctionAmt < this.parentFormName.getRawValue().gross_amount) {
            this.notify.alert('Sanction Amount should not be lesser than Gross Amount');
            this.parentFormName.controls.sanctionAmt.reset();
            // this.parentFormName.controls.sanctionAmt.markAllAsTouched();
        }
    }

    getToday(): string {
        return new Date().toISOString().split('T')[0];
    }

    searchSanctionNoById(e: any) {
        if (e.query.length === 6) {
            this.commonService.getSanctionNoById(e.query).subscribe((res: any) => {
                this.sanctionResp = res.result;
            });
        }
    }

    onSanctionNoSelect(): void {
        const selectedValue = this.parentFormName.value.sanctionNo;
        this.parentFormName.patchValue({
            sanctionAmt: selectedValue.sanctionAmount,
            sanctionDate: selectedValue.sanctionDate,
            sanctionBy: selectedValue.sanctionBy,
        });
    }
}
