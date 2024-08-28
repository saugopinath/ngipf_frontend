import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface SanctionAdminCount {
    sanctionAdminCount: string;
}
interface SanctionAdminNature {
    sanctionAdminNature: string;
}
interface RecommendingAuthorityReq {
    required: string;
}
interface RecommendingAuthorityCount {
    count: string;
}

@Component({
  selector: 'app-add-stakeholder',
  templateUrl: './add-stakeholder.component.html',
  styleUrls: ['./add-stakeholder.component.scss']
})
export class AddStakeholderComponent implements OnInit {
    value: boolean = false;
    addStakeHolder!: FormGroup;
    dropdownSanctionAdminCount: SanctionAdminCount[] = [];
    testdropdownSanctionAdminCount: SanctionAdminCount[] = [];
    dropdownSanctionAdminNature: SanctionAdminNature[] = [];
    testdropdownSanctionAdminNature: SanctionAdminNature[] = [];
    dropdownRecommendingAuthorityReq: RecommendingAuthorityReq[] = [];
    testdropdownRecommendingAuthorityReq: RecommendingAuthorityReq[] = [];
    dropdownRecommendingAuthorityCount: RecommendingAuthorityCount[] = [];
    testdropdownRecommendingAuthorityCount: RecommendingAuthorityCount[] = [];


    stakeHolderTableValue: any;
    constructor(private fb: FormBuilder, private route: ActivatedRoute) {
        this.testdropdownSanctionAdminCount = this.dropdownSanctionAdminCount = [{ sanctionAdminCount: 'Single & Same' }, { sanctionAdminCount: 'Single' }, { sanctionAdminCount: 'Multiple' }];
        this.testdropdownSanctionAdminNature = this.dropdownSanctionAdminNature=[{ sanctionAdminNature: 'Type 1' }, { sanctionAdminNature: 'Type 2' }, { sanctionAdminNature: 'Type 3' }];
        this.testdropdownRecommendingAuthorityReq = this.dropdownRecommendingAuthorityReq=[{ required: 'Yes' }, { required: 'No' }];
       this.testdropdownRecommendingAuthorityCount= this.dropdownRecommendingAuthorityCount = [{ count: 'Single' }, { count: 'Multiple' }];
    }

    ngOnInit(): void {
        this.initializeForm();
        this.route.params.subscribe((params) => {
            if (params['data']) {
                this.stakeHolderTableValue = JSON.parse(params['data']);
                console.log('StakeHolder data:', this.stakeHolderTableValue);
                this.initializeForm();

                this.dropdownSanctionAdminCount = [{ sanctionAdminCount: this.stakeHolderTableValue[0].sanctionCount }];
                this.dropdownSanctionAdminNature = [{ sanctionAdminNature: this.stakeHolderTableValue[0].sanctionNature }];
                this.dropdownRecommendingAuthorityReq = [{ required: this.stakeHolderTableValue[0].recommendingAuthRequired }];
                this.dropdownRecommendingAuthorityCount = [{ count: this.stakeHolderTableValue[0].recommendingCount }];

                console.log(this.stakeHolderTableValue[0]);

                //  this.populateForm();
                // console.log(params['data'])
            }
        });
    }

    initializeForm(): void {
        this.addStakeHolder = this.fb.group({
            HOA: [{ value: this.stakeHolderTableValue != null ? this.stakeHolderTableValue[0].intHoaCode : '', disabled: !this.value }],
            PFDAdmin: [{ value: '', disabled: !this.value }],
            dropdownSanctionAdminCount: [{ value: '', disabled: !this.value }],
            dropdownSanctionAdminNature: [{ value: '', disabled: !this.value }],
            dropdownRecommendingAuthorityReq: [{ value: '', disabled: !this.value }],
            dropdownRecommendingAuthorityCount: [{ value: '', disabled: !this.value }],
            recommAuthorityNature: [{ value: '', disabled: !this.value }],
        });
    }

    // populateForm(): void {
    //     if (this.stakeHolderTableValue && this.stakeHolderTableValue.length > 0) {
    //         // const hoa = this.
    //         const firstStakeHolder = this.stakeHolderTableValue[this.stakeHolderTableValue.length - 1];
    //         this.editStakeHolder.patchValue({
    //             HOA: firstStakeHolder.intHoaCode,
    //             // Populate other form fields similarly
    //         });
    //     }
    // }

    isInvalidAndTouched(controlName: string): boolean {
        const control = this.addStakeHolder.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    toggleEdit(event: any): void {
        const enabled = event.checked;
        if (enabled) {
            this.addStakeHolder.enable();
            this.dropdownSanctionAdminCount= this.testdropdownSanctionAdminCount;    
            this.dropdownSanctionAdminNature=this.testdropdownSanctionAdminNature;
            this.dropdownRecommendingAuthorityReq = this.testdropdownRecommendingAuthorityReq
        } else {
            this.addStakeHolder.disable();
        }
    }

    resetForm(): void {
        this.addStakeHolder.reset();
    }

    approveForm(): void {
        if (this.addStakeHolder.valid) {
            // Handle search logic here
        }
    }


}
