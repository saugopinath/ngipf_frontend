// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';

// interface SanctionAdminCount {
//     sanctionAdminCount: string;
// }
// interface SanctionAdminNature {
//     sanctionAdminNature: string;
// }
// interface RecommendingAuthorityReq {
//     required: Boolean;
// }
// interface RecommendingAuthorityCount {
//     count: string;
// }

// @Component({
//     selector: 'app-edit-stakeholder',
//     templateUrl: './edit-stakeholder.component.html',
//     styleUrls: ['./edit-stakeholder.component.scss'],
// })
// export class EditStakeholderComponent implements OnInit {
//     isEditable: boolean = false;
//     editStakeHolder!: FormGroup;
//     dropdownSanctionAdminCount: SanctionAdminCount[] = [];
//     testdropdownSanctionAdminCount: SanctionAdminCount[] = [];
//     dropdownSanctionAdminNature: SanctionAdminNature[] = [];
//     testdropdownSanctionAdminNature: SanctionAdminNature[] = [];
//     dropdownRecommendingAuthorityReq: RecommendingAuthorityReq[] = [];
//     testdropdownRecommendingAuthorityReq: RecommendingAuthorityReq[] = [];
//     dropdownRecommendingAuthorityCount: RecommendingAuthorityCount[] = [];
//     testdropdownRecommendingAuthorityCount: RecommendingAuthorityCount[] = [];

//     stakeHolderTableValue: any;

//     constructor(private fb: FormBuilder, private route: ActivatedRoute) {
//         this.testdropdownSanctionAdminCount = this.dropdownSanctionAdminCount = [
//             { sanctionAdminCount: 'Single & Same' },
//             { sanctionAdminCount: 'Single' },
//             { sanctionAdminCount: 'Multiple' },
//         ];
//         this.testdropdownSanctionAdminNature = this.dropdownSanctionAdminNature = [
//             { sanctionAdminNature: 'Type 1' },
//             { sanctionAdminNature: 'Secondary Schools' },
//             { sanctionAdminNature: 'Type 3' },
//         ];
//         this.testdropdownRecommendingAuthorityReq = this.dropdownRecommendingAuthorityReq = [
//             { required: true },
//             { required: false },
//         ];
//         this.testdropdownRecommendingAuthorityCount = this.dropdownRecommendingAuthorityCount = [
//             { count: 'Single' },
//             { count: 'Multiple' },
//         ];
//     }

//     ngOnInit(): void {
//         this.initializeForm();
//         this.route.params.subscribe((params) => {
//             if (params['data']) {
//                 this.stakeHolderTableValue = JSON.parse(params['data']);
//                 console.log(this.stakeHolderTableValue);

//                 this.initializeForm();

//                 this.dropdownSanctionAdminCount = [
//                     { sanctionAdminCount: this.stakeHolderTableValue[0].sanctionAdminCount },
//                 ];
//                 this.dropdownSanctionAdminNature = [
//                     { sanctionAdminNature: this.stakeHolderTableValue[0].sanctionAdminNature },
//                 ];
//                 this.dropdownRecommendingAuthorityReq = [
//                     { required: this.stakeHolderTableValue[0].recommendingAuthRequired },
//                 ];
//                 this.dropdownRecommendingAuthorityCount = [
//                     { count: this.stakeHolderTableValue[0].recommendingCount },
//                 ];
//             }

//         });
//     }

//     initializeForm(): void {
//         this.editStakeHolder = this.fb.group({
//             HOA: [{ value: this.stakeHolderTableValue != null ? this.stakeHolderTableValue[0].hoa : '', disabled: !this.isEditable }],
//             PFDAdmin: [{ value: '', disabled: !this.isEditable }],
//             dropdownSanctionAdminCount: [{ value: '', disabled: !this.isEditable }],
//             dropdownSanctionAdminNature: [{ value: '', disabled: !this.isEditable }],
//             dropdownRecommendingAuthorityReq: [{ value: '', disabled: !this.isEditable }],
//             dropdownRecommendingAuthorityCount: [{ value: '', disabled: !this.isEditable }],
//             recommAuthorityNature: [{ value: this.stakeHolderTableValue != null ? this.stakeHolderTableValue[0].recommendingNature : '', disabled: !this.isEditable }],
//         });
//     }
//     // populateForm(): void {
//     //     if (this.stakeHolderTableValue && this.stakeHolderTableValue.length > 0) {
//     //         // const hoa = this.
//     //         const firstStakeHolder = this.stakeHolderTableValue[this.stakeHolderTableValue.length - 1];
//     //         this.editStakeHolder.patchValue({
//     //             HOA: firstStakeHolder.intHoaCode,
//     //             // Populate other form fields similarly
//     //         });
//     //     }
//     // }

//      // get recomendingAuth(): RecommendingAuthorityReq[] {
//     //     return this.stakeHolderTableValue[0].recommendingAuthRequired == false ? [{ required: false }] : [{ required: true }];
//     // }


//     isInvalidAndTouched(controlName: string): boolean {
//         const control = this.editStakeHolder.get(controlName);
//         return control && control.invalid && (control.dirty || control.touched);
//     }

//     toggleEdit(event: any): void {
//         this.isEditable = event.target.checked;
//         this.isEditable ? this.editStakeHolder.enable() : this.editStakeHolder.disable();
//     }

//     resetForm(): void {
//         this.editStakeHolder.reset();
//     }

//     approveForm(): void {
//         if (this.editStakeHolder.valid) {
//             // Handle form submission logic here
//         }
//     }
// }


















import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    selector: 'app-edit-stakeholder',
    templateUrl: './edit-stakeholder.component.html',
    styleUrls: ['./edit-stakeholder.component.scss'],
})
export class EditStakeholderComponent implements OnInit {
    isEditable: boolean = false;
    editStakeHolder!: FormGroup;
    dropdownSanctionAdminCount: SanctionAdminCount[] = [];
    allDropdownSanctionAdminCount: SanctionAdminCount[] = [];
    dropdownSanctionAdminNature: SanctionAdminNature[] = [];
    allDropdownSanctionAdminNature: SanctionAdminNature[] = [];
    dropdownRecommendingAuthorityReq: RecommendingAuthorityReq[] = [];
    allDropdownRecommendingAuthorityReq: RecommendingAuthorityReq[] = [];
    dropdownRecommendingAuthorityCount: RecommendingAuthorityCount[] = [];
    allDropdownRecommendingAuthorityCount: RecommendingAuthorityCount[] = [];
    showRecommendingAuthorityReq: boolean = true;  // Initial value to show the field

    stakeHolderTableValue: any;

    constructor(private fb: FormBuilder, private route: ActivatedRoute) {
        this.allDropdownSanctionAdminCount = [
            { sanctionAdminCount: 'Single' },
            { sanctionAdminCount: 'Single & Same' },
            { sanctionAdminCount: 'Multiple' },
        ];
        this.allDropdownSanctionAdminNature = [
            { sanctionAdminNature: 'Type 1' },
            { sanctionAdminNature: 'Secondary Schools' },
            { sanctionAdminNature: 'Type 3' },
        ];
        this.allDropdownRecommendingAuthorityReq = [
            { required: 'Yes' },
            { required: 'No'}
        ];
        this.allDropdownRecommendingAuthorityCount = [
            { count: 'Single' },
            { count: 'Multiple' },
        ];
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['data']) {
                this.stakeHolderTableValue = JSON.parse(params['data']);
                this.initializeForm();
                this.populateDropdowns();
            }
        });
    }

    initializeForm(): void {
        this.editStakeHolder = this.fb.group({
            HOA: [{ value: this.stakeHolderTableValue != null ? this.stakeHolderTableValue[0].hoa : '', disabled: !this.isEditable }],
            PFDAdmin: [{ value: '', disabled: !this.isEditable }],
            dropdownSanctionAdminCount: [{ value: '', disabled: !this.isEditable }],
            dropdownSanctionAdminNature: [{ value: '', disabled: !this.isEditable }],
            dropdownRecommendingAuthorityReq: [{ value: '', disabled: !this.isEditable }],
            dropdownRecommendingAuthorityCount: [{ value: '', disabled: !this.isEditable }],
            recommAuthorityNature: [{ value: this.stakeHolderTableValue != null ? this.stakeHolderTableValue[0].recommendingNature : '', disabled: !this.isEditable }],
        });
    }

    populateDropdowns(): void {
        this.dropdownSanctionAdminCount = [{ sanctionAdminCount: this.stakeHolderTableValue[0].sanctionAdminCount }];
        this.dropdownSanctionAdminNature = [{ sanctionAdminNature: this.stakeHolderTableValue[0].sanctionAdminNature }];
        this.dropdownRecommendingAuthorityReq = [
            { required: this.stakeHolderTableValue[0].recommendingAuthRequired }
        ];
        this.dropdownRecommendingAuthorityCount = [{ count: this.stakeHolderTableValue[0].recommendingCount }];
    }

    toggleEdit(event: any): void {
        this.isEditable = event.target.checked;
        if (this.isEditable) {
            this.editStakeHolder.enable();
            this.showAllDropdownOptions();
            this.editStakeHolder.get('HOA')?.disable();  // Keep the "Head Of Account" field disabled
        } else {
            this.editStakeHolder.disable();
            this.populateDropdowns();
        }
    }

    showAllDropdownOptions(): void {
        this.dropdownSanctionAdminCount = this.allDropdownSanctionAdminCount;
        this.dropdownSanctionAdminNature = this.allDropdownSanctionAdminNature;
        this.dropdownRecommendingAuthorityReq = this.allDropdownRecommendingAuthorityReq;
        this.dropdownRecommendingAuthorityCount = this.allDropdownRecommendingAuthorityCount;
    }

    onSanctionAdminCountChange(event: any): void {
        const selectedOption = event.value.sanctionAdminCount;
        this.showRecommendingAuthorityReq = selectedOption === 'Multiple';
    }
    

    resetForm(): void {
        this.editStakeHolder.reset();
    }

    approveForm(): void {
        if (this.editStakeHolder.valid) {
            // Handle form submission logic here
        }
    }
}

