
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactServiceService } from 'src/app/core/services/employeeDetails/contact-service.service';
import { EmployeeDetailsService } from 'src/app/core/services/employeeDetails/employee-details.service';

interface State{
    stateName:string;
}
interface District{
    districtName:string;
}
@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
    addContact!: FormGroup;
    checked: boolean = false;
    submitted: boolean = false;
    maxDateValue: Date = new Date(Date.now());
    employeeContactData: any;
    employeeContactDataDtl: any;
    usingDefaultData: boolean = false;
    disableFields: boolean = false;  // Flag to determine if fields should be disabled

    dropdownItemState:State[]=[];
    dropdownItemDistrict:District[]=[];
    constructor(private fb: FormBuilder, 
                private router: Router,
                private route: ActivatedRoute,
                private employeeDataService: EmployeeDetailsService,private contactService:ContactServiceService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const navigation = this.router.getCurrentNavigation();
            if (navigation?.extras?.state?.data) {
                this.employeeContactData = navigation.extras.state.data;
                this.employeeContactDataDtl = this.employeeContactData[0].contactDetailsDtl;
                this.initializeForm();
                this.disableForm();  // Disable the form fields
            } else {
                this.employeeContactData = this.employeeDataService.getData();
                if (this.employeeContactData) {
                    this.employeeContactDataDtl = this.employeeContactData[0].contactDetailsDtl;
                } else {
                    this.usingDefaultData = true;
                    this.employeeContactDataDtl = this.getDefaultEmployeeContactDtl();
                }
                this.initializeForm();
                // Check if we need to disable fields based on route or data
                this.checkIfShouldDisableFields();
                this.getState();
                this.getDistrict();
            }
        });
    }

    getDefaultEmployeeContactDtl() {
        return {
            mobileNo: '',
            emailId: '',
            line1: '',
            line2: '',
            state: '',
            district: '',
            pinCode: '',
            selectedAED: null,
            checked: false
        };
    }

    initializeForm(): void {
        this.addContact = this.fb.group({
            mobileNo: [{ value: this.employeeContactDataDtl.mobileNo, disabled: this.disableFields }, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            emailId: [{ value: this.employeeContactDataDtl.emailId, disabled: this.disableFields }, [Validators.required, Validators.email]],
            line1: [{ value: this.employeeContactDataDtl.house, disabled: this.disableFields }, Validators.required],
            line2: [{ value: this.employeeContactDataDtl.city_town_village, disabled: this.disableFields }, Validators.required],
            state: [{ value: this.employeeContactDataDtl.state, disabled: this.disableFields }],
            district: [{ value: this.employeeContactDataDtl.district, disabled: this.disableFields }],
            pinCode: [{ value: this.employeeContactDataDtl.pin, disabled: this.disableFields }],
            selectedAED: [{ value: this.employeeContactDataDtl.effectForm || '',  disabled: this.disableFields}, Validators.required],
            checked: [],
        });
    }

    checkIfShouldDisableFields() {
        // Logic to determine if fields should be disabled based on route or data
        // For example, disable all fields if data is present and no navigation state
        if (this.employeeContactDataDtl && !this.usingDefaultData) {
            this.disableFields = true;
            this.disableForm();  // Disable the form fields
        }
    }

    disableForm(): void {
        // Disables all controls in the form
        Object.keys(this.addContact.controls).forEach(controlName => {
            this.addContact.get(controlName)?.disable();
        });
    }

    isInvalidAndTouched(controlName: string): boolean {
        const control = this.addContact.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    allowOnlyNumbers(event: KeyboardEvent): boolean {
        const charCode = event.charCode;
        if (charCode >= 48 && charCode <= 57) {
            return true;
        }
        event.preventDefault();
        return false;
    }

    onCheckboxChange(event: any): void {
        const isChecked = event.checked;
        this.checked = isChecked;

        if (isChecked) {
            this.addContact.patchValue({
                line1: this.addContact.get('line1')?.value,
                line2: this.addContact.get('line2')?.value,
                state: this.addContact.get('state')?.value,
                district: this.addContact.get('district')?.value,
                pinCode: this.addContact.get('pinCode')?.value
            });

            this.addContact.get('line1')?.disable();
            this.addContact.get('line2')?.disable();
            this.addContact.get('state')?.disable();
            this.addContact.get('district')?.disable();
            this.addContact.get('pinCode')?.disable();
        } else {
            this.addContact.get('line1')?.enable();
            this.addContact.get('line2')?.enable();
            this.addContact.get('state')?.enable();
            this.addContact.get('district')?.enable();
            this.addContact.get('pinCode')?.enable();
        }
    }

    prevPage() {
        this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/Basic-details']);
    }

    nextPage() {
        this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/Salary']);
        this.submitted = true;
    }
    getState(){
        this.contactService.getState().subscribe((response) => {
        
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item, index) => {
                    item.state= item.stateName ;
                });
                this.dropdownItemState = response.result;
                console.log("State",this.dropdownItemState);
                
            }
        });
    }
    getDistrict(){
        this.contactService.getDistict().subscribe((response) => {
        
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item, index) => {
                    item.state= item.stateName ;
                });
                this.dropdownItemDistrict = response.result;
                console.log("District",this.dropdownItemDistrict);
                
            }
        });
    }
}
