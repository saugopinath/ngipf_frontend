/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIResponseStatus } from 'src/app/core/enum/common_enum';
import { BillSeriviceProviderInsertUpdateModel } from 'src/app/core/models/InsertModel/BillSeriviceProviderInsertUpdateModel';
import { CommonService } from 'src/app/core/services/common.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'electricity-service-provider',
    templateUrl: './electricity-service-provider.component.html',
    styleUrls: ['./electricity-service-provider.component.scss']
})
export class ElectricityServiceProviderComponent implements OnInit {
    connectionTypes: any[] = [
        { name: "New Connection", id: 1 },
        { name: "Existing Connection", id: 2 },
        { name: "Load Enhancement", id: 3 },
        { name: "Collective Bill", id: 4 },
        { name: "Security Deposit", id: 5 },
        { name: "Deposit Work", id: 6 },
    ]
    consumer_ids: any[] = [];
    @Input() parentFormName: FormGroup;
    @Output() onServiceProviderAdd = new EventEmitter<any>();
    serviceProviderDataList: any[] = [];

    ServiceProviderForm: FormGroup = this.fb.group({
        Service_Provider: [null],
        Connection_Type: [null],
        Consumer_ID_Qtn_Ref_No: [null],
        Installation_No: [null],
        Application_No: [null],
        Outstanding_Amount: [null],
        Amouont_Paid: [null],
    });

    constructor(public fb: FormBuilder, private cs: CommonService, private notify: NotificationService) {
        // this.ServiceProviderForm.patchValue({
        //     Service_Provider: this.parentFormName.getRawValue().serviceProvider?.name
        // })
    }

    ngOnInit() {
        this.ServiceProviderForm.patchValue({
            Service_Provider: this.parentFormName.value.serviceProvider?.name
        });
    }

    onConsumerSelect(e: any) {
        this.ServiceProviderForm.patchValue({
            Installation_No: this.ServiceProviderForm.getRawValue().Consumer_ID_Qtn_Ref_No?.applicationNoInstallationNo,
            Application_No: this.ServiceProviderForm.getRawValue().Consumer_ID_Qtn_Ref_No?.applicationNoInstallationNo,
            Outstanding_Amount: this.ServiceProviderForm.getRawValue().Consumer_ID_Qtn_Ref_No?.spApiData[0]?.outstandingAmount,
        });
    }

    onConnectionTypeChange(e: any) {
        console.log(this.ServiceProviderForm.value.Connection_Type);
        if (!!this.parentFormName.value.serviceProvider?.id && !!this.ServiceProviderForm.value.Connection_Type?.id) {
            this.cs.get<any>(`ServiceProviderConsumerMaster/GetBySPIDAndConnectionType?SPID=${this.parentFormName.value.serviceProvider?.id}&connectionTypeID=${this.ServiceProviderForm.value.Connection_Type?.id}`).subscribe((resp: any) => {
                if (resp.apiResponseStatus == APIResponseStatus.Success) {
                    this.consumer_ids = resp.result
                }
                else if (resp.apiResponseStatus == APIResponseStatus.Warning) {

                }
            })
        }
    }

    addServiceProviderData() {
        console.log(this.ServiceProviderForm.getRawValue());
        this.serviceProviderDataList.push(this.ServiceProviderForm.getRawValue());
        this.onServiceProviderAdd.emit({
            ecsPartyName: { beneficiaryName: "PARTYNAME" },
            ecsPayeeCode: "PAYEECODE",
            ecsIfscCode: this.ServiceProviderForm.getRawValue().Consumer_ID_Qtn_Ref_No?.spMst?.ifscCode,
            ecsBankName: "RBI",
            ecsAccountNo: `${this.ServiceProviderForm.getRawValue().Consumer_ID_Qtn_Ref_No?.spMst?.bankAcNo}`,
            ecsEmail: "email@exmaple.com",
            ecsContactNo: "0000000000",
            ecsPanNo: "PANWB0000X",
            ecsAddress: "ADDRESS",
            ecsAmount: +this.ServiceProviderForm.getRawValue().Amouont_Paid,
            ecsPaymentType: 2,
        });
        this.ServiceProviderForm.patchValue({
            Service_Provider: this.parentFormName.value.serviceProvider?.name,
            Connection_Type: null,
            Consumer_ID_Qtn_Ref_No: null,
            Installation_No: null,
            Application_No: null,
            Outstanding_Amount: null,
            Amouont_Paid: null,
        });
    }

    saveServiceProviderData() {
        let payload = this.createServiceProviderData();
        this.cs.saveServiceProviderData(this.parentFormName.getRawValue().billId, payload).subscribe((res: any) => {
            if (res.apiResponseStatus == APIResponseStatus.Success) {
                this.notify.success(res.message);
            } else {
                this.notify.error(res.message);
            }
        });;
    }

    createServiceProviderData(): BillSeriviceProviderInsertUpdateModel[] {
        let payload: BillSeriviceProviderInsertUpdateModel[] = [];
        this.serviceProviderDataList.forEach(element => {
            let val = new BillSeriviceProviderInsertUpdateModel();
            val.billId = this.parentFormName.getRawValue().billId;
            val.amountPaid = element.Amouont_Paid;
            val.consumerId = element.Consumer_ID_Qtn_Ref_No?.consumerId;
            val.outstandingAmount = element.Consumer_ID_Qtn_Ref_No?.spApiData[0]?.outstandingAmount;
            val.spMstId = this.parentFormName.value.serviceProvider?.id;
            payload.push(val)
        });
        return payload;
    }
}
