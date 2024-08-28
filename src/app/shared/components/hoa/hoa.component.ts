/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/component-selector */
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BillModeOptions, PaymentModeOptions, gemNonGemOptions } from 'src/app/core/enum/common_enum';
import { ValidationObj } from 'src/app/core/helper';
import { CommonService } from 'src/app/core/services/common.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { trConfigObj } from 'src/app/core/utils/trConfig';

@Component({
    selector: 'hoa',
    templateUrl: './hoa.component.html',
    styleUrls: ['./hoa.component.scss']
})
export class HoaComponent implements OnInit {

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    soeList: any;
    CopyClaimForList: any;
    demandCodeList: any;
    copyDemandCodeList: any;
    demandCode: any;
    majorHeadList: any;
    copyMajorHeadList: any;
    majorHead: any;
    subMajorHeadList: any;
    copySubMajorHeadList: any;
    subMajorHead: any;
    minorHeadList: any;
    copyMinorHeadList: any;
    minorHead: any;
    subHeadList: any;
    copySubHeadList: any;
    subHead: any;
    detailHeadList: any;
    copyDetailHeadList: any;
    votedCharged: any[] = [{ name: 'V' }, { name: 'C' }];

    ufType: any[] = [
        { name: 'Bulk' },
        { name: 'Integrated' },
    ];

    serviceProvider: any[] = [];
    consumerList: any[] = [];

    iFileLocation: any[] = [
        { name: "KANYASREE" },
        { name: "YUVASREE" },
        { name: "VIVEKANANDA SCH" },
        { name: "FOOD  SUPPLY" },
        { name: "GRAM PANCHAYET(IOSMS)" },
        { name: "LOKPRASAR PRAKALPA (ICA)" },
        { name: "OASIS (BCWTD)" },
        { name: "SIKSHASHREE (BCWTD)" },
        { name: "TALENT SUPPORT PROGRAMME (WBMDFC)" },
        { name: "SVMCMS-MINORITY (WBMFDC)" },
        { name: "WBMDFCAPPS (WBMDFC)" },
        { name: "PRE-MATRIC OBC (BCWTD)" },
        { name: "i-OSMS(DVET)" },
        { name: "RUPASHREE(WCDSW)" },
        { name: "AIKYASHREE(WBMFDC)" },
        { name: "SAMAJIK SURAKSHA YOJANA-SSY(LABOUR)" },
        { name: "PBSSD (TETSDD)" },
        { name: "JAI BANGLA - TAPOSILI BANDHU" },
        { name: "JAI BANGLA - MANABIK" },
        { name: "JAI BANGLA - JAI JOHAR" },
        { name: "KRISHAK BANDHU" },
        { name: " JAI BANGLA ARTISANS WEAVERS OLD AGE PENSION " },
        { name: "JAI BANGLA FISHERMEN OLD AGE PENSION" },
        { name: "DEPARTMENT OF LABOUR" },
        { name: "BANGLAR SHIKSHA" },
        { name: "DIRECTORATE OF VOCATIONAL EDUCATION AND TRAINING" },
        { name: "PBSSD-ORG" },
        { name: "FOOD Dept(DDO-CABFSF002)" },
        { name: "MEDHASREE" },
        { name: "e-Paddy Procurement Portal(FOOD Department)" }
    ];

    // These variables are for binding to the the Department info.
    deptCode: any;
    deptDescription: any;
    ClaimForIsActive: boolean = false;
    @Input() stateData: any;
    @Input() parentFormName!: FormGroup;
    @Output() onHoaSelect = new EventEmitter<any>();
    @Output() onHoaSelect2 = new EventEmitter<any>();
    @Output() PaymentModeChange = new EventEmitter<any>();
    @Output() ServiceProviderChange = new EventEmitter<any>();

    ClaimForListarray: Array<any> = [];
    gissIsActive: boolean | undefined;
    schemeHd: any;
    myDate = Date();
    someDate = '2023-12-27'; //my change from the original documentation example
    currentDate = new Date();

    payModeOptions: any[] = [];
    billModeOptions: any[] = [];
    gemNonGemOptions: any[] = [];
    activeHoaData: any[] = [];
    snaList: any[] = [{ name: 'Non-SNA', code: 2 }, { name: 'SNA', code: 1 }];
    grantTypeList: any[] = [{ name: 'Grant-in-Aid in Cash', code: 1 }, { name: 'Grant-in-Aid in Kind', code: 2 }];
    constructor(private datePipe: DatePipe, private commonService: CommonService, private router: Router, private notify: NotificationService, private validationService: ValidationService, private cdref: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.getDemands();
        if (trConfigObj.claimFor_PresentsInTR.includes(this.parentFormName.getRawValue().form_code)) {
            this.ClaimForIsActive = true;
            this.parentFormName.controls['demand'].disable();
            this.parentFormName.controls['deptName'].disable();
            this.parentFormName.controls['detailed_head'].disable();
            this.parentFormName.controls['sub_head'].disable();
            this.parentFormName.controls['minor_head'].disable();
            this.parentFormName.controls['sub_major_head'].disable();
            this.parentFormName.controls['major_head'].disable();
            this.parentFormName.controls['votedCharged'].disable();
        }
        if (trConfigObj.GISS_PresentsInTR.includes(this.parentFormName.getRawValue().form_code)) {
            this.gissIsActive = true;
        }
        this.getHOA();

        //#region : enList enum elements into appropriate arrays
        for (let x in Object.keys(PaymentModeOptions).filter(key => isNaN(Number(key)))) {
            this.payModeOptions.push({ name: PaymentModeOptions[x], value: +x })
        }
        for (let x in Object.keys(BillModeOptions).filter(key => isNaN(Number(key)))) {
            this.billModeOptions.push({ name: BillModeOptions[x], value: +x })
        }
        for (let x in Object.keys(BillModeOptions).filter(key => isNaN(Number(key)))) {
            this.gemNonGemOptions.push({ name: gemNonGemOptions[x], value: +x })
        }
        //#endregion
        this.getSetviceProvider();
    }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    formatDate(date: Date | string): string {
        return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }

    get trConfigObjGetter() {
        return trConfigObj;
    }

    get gValidationObj() {
        return ValidationObj;
    }

    getHOA() {
        if (this.ClaimForIsActive || this.gissIsActive) {
            this.commonService.get('ClaimForHoa/GetClaimForHoaByTRForm?formCode=' + this.parentFormName.getRawValue().form_code).subscribe((res) => {
                this.ClaimForListarray = this.CopyClaimForList = res.result;
                this.onHoaSelect2.emit(res.result);
            });
        }
    }

    onClaimForSelect(e: any) {
        let claim = this.parentFormName.getRawValue().claimFor;
        this.deptDescription = claim.demandCode;
        this.deptCode = claim.demand;
        this.parentFormName.patchValue({
            demand: claim.demand,
            deptName: claim.deptName,
            major_head: claim.majorHead,
            sub_major_head: claim.subMajorHead,
            minor_head: claim.minorHead,
            sub_head: claim.schemeHead,
            detailed_head: claim.detailHead,
            sub_detailed_head: claim.subDetailHead,
            votedCharged: claim.votedCharged,
        });
        this.onHoaSelect.emit({
            demand: claim.demand,
            major_head: claim.majorHead,
            sub_major_head: claim.subMajorHead,
            minor_head: claim.minorHead,
            sub_head: claim.schemeHead,
            detailed_head: claim.detailHead,
            sub_detailed_head: claim.subDetailHead,
        });
    }

    onClaimForClear(e: any) {
        this.deptDescription = null;
        this.deptCode = null;
        this.parentFormName.patchValue({
            demand: null,
            deptName: null,
            major_head: null,
            sub_major_head: null,
            minor_head: null,
            sub_head: null,
            detailed_head: null,
            sub_detailed_head: null,
            votedCharged: null,
        });
    }

    getToday(): string {
        return new Date().toISOString().split('T')[0];
    }

    getDemands() {
        this.commonService.getDemandData().subscribe((res: { result: any; }) => {
            this.demandCodeList = this.copyDemandCodeList = res.result;
        });
    }

    getMajorHeadByDemandId() {
        if (this.notNull(this.parentFormName.getRawValue().demand?.demandCode)) {
            this.parentFormName.controls['major_head'].reset();
            this.parentFormName.controls['sub_major_head'].reset();
            this.parentFormName.controls['minor_head'].reset();
            this.parentFormName.controls['sub_head'].reset();
            this.parentFormName.controls['detailed_head'].reset();
            this.commonService.getMajorHeadByDemandId(this.parentFormName.getRawValue().demand.demandCode).subscribe((res: any) => {
                this.majorHeadList = this.copyMajorHeadList = res.result;
            });
        }
    }

    getSubMajorHeadByMajorHeadId() {
        if (this.notNull(this.parentFormName.getRawValue().major_head?.id)) {
            this.parentFormName.controls['sub_major_head'].reset();
            this.parentFormName.controls['minor_head'].reset();
            this.parentFormName.controls['sub_head'].reset();
            this.parentFormName.controls['detailed_head'].reset();
            this.commonService.getSubMajorHeadByMajorHeadId(this.parentFormName.getRawValue().major_head.id).subscribe((res: any) => {
                this.subMajorHeadList = this.copySubMajorHeadList = res.result;
            });
        }
    }

    getMinorHead() {
        if (this.notNull(this.parentFormName.getRawValue().sub_major_head?.id)) {
            this.parentFormName.controls['minor_head'].reset();
            this.parentFormName.controls['sub_head'].reset();
            this.parentFormName.controls['detailed_head'].reset();
            this.commonService.getMinorHead(this.parentFormName.getRawValue().sub_major_head.id).subscribe((res: any) => {
                this.minorHeadList = this.copyMinorHeadList = res.result;
            });
        }
    }

    getSubHead() {
        if (this.notNull(this.parentFormName.getRawValue().minor_head?.id) && this.notNull(this.parentFormName.getRawValue().demand?.demandCode)) {
            this.parentFormName.controls['sub_head'].reset();
            this.parentFormName.controls['detailed_head'].reset();
            this.commonService.getSchemeHead(this.parentFormName.getRawValue().minor_head.id, this.parentFormName.getRawValue().demand.demandCode).subscribe((res: any) => {
                this.subHeadList = this.copySubHeadList = res.result;
            });
        }
    }

    getDetailHead() {
        this.parentFormName.controls['detailed_head'].reset();
        this.commonService.getDetailHead().subscribe((res: any) => {
            this.detailHeadList = this.copyDetailHeadList = res.result;
        });
    }

    readingEntireHoa() {
        if (this.parentFormName.getRawValue().demand != '' && this.parentFormName.getRawValue().major_head != '' && this.parentFormName.getRawValue().sub_major_head != '' && this.parentFormName.getRawValue().minor_head != '' && this.parentFormName.getRawValue().sub_head != '' && this.parentFormName.getRawValue().detailed_head != '') {
            const activeHoaPayload = {
                demandNo: this.parentFormName.getRawValue().demand.demandCode,
                majorHead: this.parentFormName.getRawValue().major_head.code,
                submajorHead: this.parentFormName.getRawValue().sub_major_head.code,
                minorHead: this.parentFormName.getRawValue().minor_head.code,
                schemeHead: this.parentFormName.getRawValue().sub_head.code,
                detailHead: this.parentFormName.getRawValue().detailed_head.code,
            }

            this.commonService.getActiveHoaData(activeHoaPayload).subscribe((res: any) => {
                this.activeHoaData = res.result;
                this.onHoaSelect.emit({
                    demand: this.parentFormName.getRawValue().demand,
                    major_head: this.parentFormName.getRawValue().major_head,
                    sub_major_head: this.parentFormName.getRawValue().sub_major_head,
                    minor_head: this.parentFormName.getRawValue().minor_head,
                    sub_head: this.parentFormName.getRawValue().sub_head,
                    detailed_head: this.parentFormName.getRawValue().detailed_head,
                    beneficiaryDetails: this.activeHoaData
                });
            });
        } else {
            this.notify.warning('Please specify previous parts of HOA.');
            // this.parentFormName.get('demand').setValue('');
            // this.parentFormName.get('major_head').setValue('');
            // this.parentFormName.get('sub_major_head').setValue('');
            // this.parentFormName.get('minor_head').setValue('');
            // this.parentFormName.get('sub_head').setValue('');
            // this.parentFormName.get('detailed_head').setValue('');
        }
    }

    notNull(v: any): boolean {
        return v != null && v != -1 && v != '';
    }

    getErrorMessage(control: AbstractControl): any {
        for (const propertyName in control.errors) {
            if (control.errors.hasOwnProperty(propertyName)) {
                console.log(this.validationService.getValidatorErrorMessage(propertyName, control.errors[propertyName]));
                return this.validationService.getValidatorErrorMessage(propertyName, control.errors[propertyName]);
            }
        }
        return null;
    }

    setUploadFileType(e: any) {
        if (e.value === null || e.value === '') {
            this.parentFormName.controls.serviceProvider.enable();
            this.parentFormName.controls.serviceProvider.reset();
        } else {
            this.parentFormName.patchValue({
                serviceProvider: { name: 'GENERAL' }
            });
            this.parentFormName.controls.serviceProvider.disable();
        }
    }

    getSetviceProvider() {
        this.commonService.get('ServiceProviderMaster').subscribe((res: { result: any; }) => {
            this.serviceProvider = res.result;
        });
    }

    getConsumerList(spId: number) {
        this.commonService.get(`Consumer/ByServiceProviderId?sp_id=${spId}`).subscribe((res: { result: any; }) => {
            this.consumerList = res.result;
        });
    }

    onServiceProviderSelect($event: any) {
        console.log($event);
        if (!!$event.value) {
            // this.getConsumerList($event.value.id);
            this.ServiceProviderChange.emit($event);
        }

        // throw new Error('Method not implemented.');
    }

    // onDemandSelect(e: any, demandId: string, demandDesc: string) {
    //     if (e.isUserInput || e.type == 'focusout') {
    //         this.demandCode = demandId;
    //         this.deptDescription = demandDesc;
    //         this.deptCode = demandId;
    //         this.parentFormName.controls['major_head'].reset();
    //         this.parentFormName.controls['sub_major_head'].reset();
    //         this.parentFormName.controls['minor_head'].reset();
    //         this.parentFormName.controls['sub_head'].reset();
    //         this.parentFormName.controls['detailed_head'].reset();
    //         this.parentFormName.patchValue({
    //             deptCode: this.deptCode,
    //             deptName: this.deptDescription,
    //         });
    //         this.parentFormName.controls['__hoa_ids'].patchValue({
    //             demand_mstId: +demandId,
    //         });
    //     }
    // }

    // onMajorHeadSelect(e: any, majorHeadId: any) {
    //     if (e.isUserInput || e.type == 'focusout') {
    //         this.parentFormName.controls['__hoa_ids'].patchValue({
    //             major_head_mstId: +majorHeadId,
    //         });
    //         this.parentFormName.controls['sub_major_head'].reset();
    //         this.parentFormName.controls['minor_head'].reset();
    //         this.parentFormName.controls['sub_head'].reset();
    //         this.parentFormName.controls['detailed_head'].reset();
    //     }
    // }

    // onSubmajorHeadSelect(e: any, subMajorheadId: string) {
    //     if (e.isUserInput || e.type == 'focusout') {
    //         this.parentFormName.controls['__hoa_ids'].patchValue({
    //             sub_major_head_mstId: +subMajorheadId,
    //         });
    //         this.parentFormName.controls['minor_head'].reset();
    //         this.parentFormName.controls['sub_head'].reset();
    //         this.parentFormName.controls['detailed_head'].reset();
    //     }
    // }

    // onMinorHeadSelect(e: any, minorHeadId: string) {
    //     if (e.isUserInput || e.type == 'focusout') {
    //         this.parentFormName.controls['__hoa_ids'].patchValue({
    //             minor_head_mstId: +minorHeadId,
    //         });
    //         this.parentFormName.controls['sub_head'].reset();
    //         this.parentFormName.controls['detailed_head'].reset();
    //     }
    // }

    // onSubHeadSelect(e: any, subHeadId: any, subHead: any) {
    //     if (e.isUserInput || e.type == 'focusout') {
    //         this.parentFormName.controls['__hoa_ids'].patchValue({
    //             sub_head_mstId: +subHeadId,
    //         });
    //         this.parentFormName.controls['detailed_head'].reset();
    //         this.schemeHd = subHead;
    //     }
    // }

    // searchClaimFor(e: any) {
    //     if (e !== undefined) {
    //         let term = '';
    //         if (e.target.value.length > 0) {
    //             term = e.target.value;
    //         }
    //         if (term !== undefined && term !== '' && term != null) {
    //             if (term.length > 0) {
    //                 this.ClaimForListarray = this.CopyClaimForList?.filter((data: any) => {
    //                     return data.claiM_FOR?.toLowerCase().indexOf(term.toLowerCase()) >= 0 || data.hoa?.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    //                 });
    //                 const exists: boolean = this.ClaimForListarray?.length > 0;
    //                 if (exists) {
    //                     this.parentFormName.controls['claimFor'].updateValueAndValidity();
    //                 } else {
    //                     // this.parentFormName.controls.claimFor.setErrors({ erArisesDC: true });
    //                 }
    //             }
    //         } else {
    //             this.ClaimForListarray = this.CopyClaimForList;
    //         }
    //     }
    // }

    // searchDemand(e: any) {
    //     if (e !== undefined) {
    //         let term = '';
    //         if (e.target.value.length > 0) {
    //             term = e.target.value;
    //         }
    //         if (term !== undefined && term !== '' && term != null) {
    //             if (term.length > 0) {
    //                 this.demandCodeList = this.copyDemandCodeList?.filter((data: any) => {
    //                     return data.name?.toLowerCase().indexOf(term.toLowerCase()) >= 0 || data.demandCode.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    //                 });
    //                 const exists: boolean = this.demandCodeList?.length > 0;
    //                 if (exists) {
    //                     this.parentFormName.controls['demand'].updateValueAndValidity();
    //                 } else {
    //                     // this.parentFormName.controls.demand.setErrors({ erArisesDC: true });
    //                 }
    //             }
    //         } else {
    //             this.demandCodeList = this.copyDemandCodeList;
    //         }
    //     }
    // }

    // searchMajorHead(e: any) {
    //     if (e !== undefined) {
    //         let term = '';
    //         if (e.target.value.length > 0) {
    //             term = e.target.value;
    //         }
    //         if (term !== undefined && term !== '' && term != null) {
    //             if (term.length > 0) {
    //                 this.majorHeadList = this.copyMajorHeadList?.filter((data: any) => {
    //                     return data.name?.toLowerCase().indexOf(term.toLowerCase()) >= 0 || data.code.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    //                 });
    //                 const exists: boolean = this.majorHeadList?.length > 0;
    //                 if (exists) {
    //                     this.parentFormName.controls['major_head'].updateValueAndValidity();
    //                 } else {
    //                     // this.parentFormName.controls.major_head.setErrors({ erArisesDC: true });
    //                 }
    //             }
    //         } else {
    //             this.majorHeadList = this.copyMajorHeadList;
    //         }
    //     }
    // }

    // searchSubMajorHead(e: any) {
    //     if (e !== undefined) {
    //         let term = '';
    //         if (e.target.value.length > 0) {
    //             term = e.target.value;
    //         }
    //         if (term !== undefined && term !== '' && term != null) {
    //             if (term.length > 0) {
    //                 this.subMajorHeadList = this.copySubMajorHeadList?.filter((data: any) => {
    //                     return data.name?.toLowerCase().indexOf(term.toLowerCase()) >= 0 || data.code.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    //                 });
    //                 const exists: boolean = this.subMajorHeadList?.length > 0;
    //                 if (exists) {
    //                     this.parentFormName.controls['sub_major_head'].updateValueAndValidity();
    //                 } else {
    //                     // this.parentFormName.controls.sub_major_head.setErrors({ erArisesDC: true });
    //                 }
    //             }
    //         } else {
    //             this.subMajorHeadList = this.copySubMajorHeadList;
    //         }
    //     }
    // }

    // searchMinorHead(e: any) {
    //     if (e !== undefined) {
    //         let term = '';
    //         if (e.target.value.length > 0) {
    //             term = e.target.value;
    //         }
    //         if (term !== undefined && term !== '' && term != null) {
    //             if (term.length > 0) {
    //                 this.minorHeadList = this.copyMinorHeadList?.filter((data: any) => {
    //                     return data.name?.toLowerCase().indexOf(term.toLowerCase()) >= 0 || data.code.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    //                 });
    //                 const exists: boolean = this.minorHeadList?.length > 0;
    //                 if (exists) {
    //                     this.parentFormName.controls['minor_head'].updateValueAndValidity();
    //                 } else {
    //                     // this.parentFormName.controls.minor_head.setErrors({ erArisesDC: true });
    //                 }
    //             }
    //         } else {
    //             this.minorHeadList = this.copyMinorHeadList;
    //         }
    //     }
    // }

    // searchSubHead(e: any) {
    //     if (e !== undefined) {
    //         let term = '';
    //         if (e.target.value.length > 0) {
    //             term = e.target.value;
    //         }
    //         if (term !== undefined && term !== '' && term != null) {
    //             if (term.length > 0) {
    //                 this.subHeadList = this.copySubHeadList?.filter((data: any) => {
    //                     return data.name?.toLowerCase().indexOf(term.toLowerCase()) >= 0 || data.code.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    //                 });
    //                 const exists: boolean = this.subHeadList?.length > 0;
    //                 if (exists) {
    //                     this.parentFormName.controls['sub_head'].updateValueAndValidity();
    //                 } else {
    //                     // this.parentFormName.controls.sub_head.setErrors({ erArisesDC: true });
    //                 }
    //             }
    //         } else {
    //             this.subHeadList = this.copySubHeadList;
    //         }
    //     }
    // }

    // searchDetailHead(e: any) {
    //     if (e !== undefined) {
    //         let term = '';
    //         if (e.target.value.length > 0) {
    //             term = e.target.value;
    //         }
    //         if (term !== undefined && term !== '' && term != null) {
    //             if (term.length > 0) {
    //                 this.detailHeadList = this.copyDetailHeadList?.filter((data: any) => {
    //                     return data.name?.toLowerCase().indexOf(term.toLowerCase()) >= 0 || data.code.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    //                 });
    //                 const exists: boolean = this.detailHeadList?.length > 0;
    //                 if (exists) {
    //                     this.parentFormName.controls['detailed_head'].updateValueAndValidity();
    //                 } else {
    //                     // this.parentFormName.controls.detailed_head.setErrors({ erArisesDC: true });
    //                 }
    //             }
    //         } else {
    //             this.detailHeadList = this.copyDetailHeadList;
    //         }
    //     }
    // }

    // tryToSelectDemand(e: Event) {
    //     if (this.demandCodeList?.length == 1) {
    //         this.onDemandSelect(e, this.demandCodeList[0].demandCode, this.demandCodeList[0].name);
    //     }
    // }

    // tryToSelectMajor(e: Event) {
    //     if (this.majorHeadList?.length == 1) {
    //         this.onMajorHeadSelect(e, this.majorHeadList[0].id);
    //     }
    // }

    // tryToSelectSubMajor(e: Event) {
    //     console.log(this.subMajorHeadList);
    //     if (this.subMajorHeadList?.length == 1) {
    //         this.onSubmajorHeadSelect(e, this.subMajorHeadList[0].id);
    //     }
    // }

    // tryToSelectMinor(e: Event) {
    //     if (this.minorHeadList?.length == 1) {
    //         this.onMinorHeadSelect(e, this.minorHeadList[0].id);
    //     }
    // }

    // tryToSelectSunHd(e: Event) {
    //     if (this.subHeadList?.length == 1) {
    //         this.onSubHeadSelect(e, this.subHeadList[0].code, this.subHeadList[0]);
    //     }
    // }

    // tryToSelectDetailHd(e: Event) {
    //     if (this.detailHeadList?.length == 1) {
    //         this.onDetailHeadSelect(e, this.detailHeadList[0].code);
    //         this.readingEntireHoa();
    //     }
    // }

}
