import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicDtlServiceService } from 'src/app/core/services/employeeDetails/basic-dtl-service.service';
import { EmployeeDetailsService } from 'src/app/core/services/employeeDetails/employee-details.service';

interface Gender {
    value: string;
}
interface MritalStatus {
    marriagestatus: string;
}
interface Religion {
    religion: string;
}
@Component({
    selector: 'app-basic-details',
    templateUrl: './basic-details.component.html',
    styleUrls: ['./basic-details.component.scss'],
})
export class BasicDetailsComponent implements OnInit {
    addPersonal!: FormGroup;
    addService!: FormGroup;
    submitted: boolean = false;
    maxDateValue: Date = new Date(Date.now());
    employeeData: any;
    employeePersonalDtl: any;
    employeeServiceDtl: any;
    usingDefaultData: boolean = false;
    disableFields: boolean = false;  // Flag to determine if fields should be disabled
    activeState: boolean[] = [true, false];

    dropdownItemGender: Gender[] = [];
    dropdownItemMaritalStatus: MritalStatus[] = [];
    dropdownItemReligion: Religion[] = [];
    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private employeeDataService: EmployeeDetailsService, private basicDtlService: BasicDtlServiceService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const navigation = this.router.getCurrentNavigation();
            if (navigation?.extras?.state?.data) {
                this.employeeData = navigation.extras.state.data;
                this.employeePersonalDtl = this.employeeData[0].hrMmEmpBasicDtl;
                this.employeeServiceDtl = this.employeeData[0].serviceDetailsDtl;
                this.initializeForm();
                this.disableForm();  // Disable the form fields
            } else {
                this.employeeData = this.employeeDataService.getData();
                if (this.employeeData) {
                    this.employeePersonalDtl = this.employeeData[0].hrMmEmpBasicDtl;
                    this.employeeServiceDtl = this.employeeData[0].serviceDetailsDtl;
                } else {
                    this.usingDefaultData = true;
                    this.employeePersonalDtl = this.getDefaultEmployeepersonalDtl();
                    this.employeeServiceDtl = this.getDefaultEmployeeserviceDtl();
                    this.getGender();
                    this.getMaritalStatus();
                    this.getReligion();
                }
                this.initializeForm();
                // Check if we need to disable fields based on route or data
                this.checkIfShouldDisableFields();
                // this.getGender();
                // this.getMaritalStatus();
                // this.getReligion();
            }
        });
    }

    getDefaultEmployeepersonalDtl() {
        return {
            intEmployeeId: '',
            name: '',
            gender: '',
            religion: '',
            dob: '',
            pan: '',
            aadhaar: '',
            martialStatus: '',
        };
    }

    getDefaultEmployeeserviceDtl() {
        return {
            GPFNo: '',
            selectedDOJ: '',
            approvalNo: '',
            selectedApprovalDate: '',
            selectedEffecteDate: '',
            selectedEffectFormDate: '',
            gpfcpf: '',
            selectedDOR: '',
            selectedDOT: '',
            tot: '',
        };
    }

    initializeForm(): void {
        this.addPersonal = this.fb.group({
            empID: [{ value: this.employeePersonalDtl.intEmployeeId, disabled: this.disableFields }, Validators.required],
            pfAcc: ['', Validators.required],
            name: [{ value: this.employeePersonalDtl.name, disabled: this.disableFields }, Validators.required],
            gender: [{ value: this.employeePersonalDtl.gender, disabled: this.disableFields }, Validators.required],
            religion: [{ value: this.employeePersonalDtl.religion, disabled: this.disableFields }, Validators.required],
            selectedDOB: [{ value: this.employeePersonalDtl.dob, disabled: this.disableFields }, Validators.required],
            pan: [{ value: this.employeePersonalDtl.pan, disabled: this.disableFields }, Validators.required],
            adhaar: [{ value: this.employeePersonalDtl.aadhaar, disabled: this.disableFields }, Validators.required],
            maritalStatus: [{ value: this.employeePersonalDtl.martialStatus, disabled: this.disableFields }, Validators.required],
            selectedEffectFormDate: [null, Validators.required],
        });

        this.addService = this.fb.group({
            GPFNo: [{ value: this.employeeServiceDtl.oldGPFNo, disabled: this.disableFields }, Validators.required],
            pfAccStatus: ['', Validators.required],
            selectedDOJ: [{ value: this.employeeServiceDtl.dateOfJoining, disabled: this.disableFields }, Validators.required],
            approvalNo: [{ value: this.employeeServiceDtl.approvalNoOfAppointment, disabled: this.disableFields }, Validators.required],
            selectedApprovalDate: [{ value: this.employeeServiceDtl.approvalDate, disabled: this.disableFields }, Validators.required],
            selectedEffecteDate: [{ value: this.employeeServiceDtl.ageOnEffect, disabled: this.disableFields }, Validators.required],
            type: ['', Validators.required],
            selectedEffectFormDate: [{ value: this.employeeServiceDtl.ageOnEffect, disabled: this.disableFields }, Validators.required],
            designation: [{ value: this.employeeServiceDtl.designation, disabled: this.disableFields }, Validators.required],
            gpfcpf: [{ value: this.employeeServiceDtl.gpfcpf, disabled: this.disableFields }, Validators.required],
            selectedDOR: [{ value: this.employeeServiceDtl.dateOfRetirement, disabled: this.disableFields }, Validators.required],
            tot: [{ value: this.employeeServiceDtl.terminationType, disabled: this.disableFields }, Validators.required],
            selectedDOT: [{ value: this.employeeServiceDtl.dateOfTermination, disabled: this.disableFields }, Validators.required],
        });
    }

    checkIfShouldDisableFields() {
        if (this.employeePersonalDtl && !this.usingDefaultData) {
            this.disableFields = true;
            this.disableForm();  // Disable the form fields
        }
    }

    disableForm(): void {
        // Disables all controls in both forms
        Object.keys(this.addPersonal.controls).forEach(controlName => {
            this.addPersonal.get(controlName)?.disable();
        });
        Object.keys(this.addService.controls).forEach(controlName => {
            this.addService.get(controlName)?.disable();
        });
    }

    isInvalidAndTouched(controlName: string): boolean {
        const control = this.addPersonal.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    prevPage() {
        this.router.navigate(['']);
    }

    nextPage() {
        this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/Contact-details']);
        this.submitted = true;
    }

    toggle(index: number) {
        this.activeState[index] = !this.activeState[index];
    }



    getGender() {
        this.basicDtlService.getGender().subscribe((response) => {

            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item, index) => {
                    item.value = item.masterDescr + ' (' + item.masterAbbr + ')';
                });
                this.dropdownItemGender = response.result;
                console.log("Gender", this.dropdownItemGender);

            }
        });
    }
    getMaritalStatus() {
        this.basicDtlService.getMaritalStatus().subscribe((response) => {

            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item) => {
                    item.marriagestatus = item.masterDescr;
                });
                this.dropdownItemMaritalStatus = response.result;
                console.log("Marriage Status", this.dropdownItemMaritalStatus);

            }
        });
    }
    getReligion() {
        this.basicDtlService.getReligion().subscribe((response) => {

            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item) => {
                    item.religion = item.masterDescr;
                });
                this.dropdownItemReligion = response.result;
                console.log("Religion", this.dropdownItemReligion);

            }
        });
    }
}
