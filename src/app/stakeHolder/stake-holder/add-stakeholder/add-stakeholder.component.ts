import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StakeHolderService } from 'src/app/core/services/stakeHolder/stake-holder.service';

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
interface Treasury {
    treasuryName: string;
    treasuryCode: string;
    intTreasuryCode: number;
}

@Component({
  selector: 'app-add-stakeholder',
  templateUrl: './add-stakeholder.component.html',
  styleUrls: ['./add-stakeholder.component.scss']
})
export class AddStakeholderComponent implements OnInit {
    isEditable: boolean = false;
    addStakeHolder!: FormGroup;
    dropdownSanctionAdminCount: SanctionAdminCount[] = [];
    allDropdownSanctionAdminCount: SanctionAdminCount[] = [];
    dropdownSanctionAdminNature: SanctionAdminNature[] = [];
    allDropdownSanctionAdminNature: SanctionAdminNature[] = [];
    dropdownRecommendingAuthorityReq: RecommendingAuthorityReq[] = [];
    allDropdownRecommendingAuthorityReq: RecommendingAuthorityReq[] = [];
    dropdownRecommendingAuthorityCount: RecommendingAuthorityCount[] = [];
    allDropdownRecommendingAuthorityCount: RecommendingAuthorityCount[] = [];
    showRecommendingAuthorityReq: boolean = true;  // Initial value to show the field
    showSanctionAdminNature: boolean = true; // Control visibility of Sanction Admin Nature field

    stakeHolderTableValue: any;
    dropdownItemTreasuryname:Treasury[]=[]

    constructor(private fb: FormBuilder, private route: ActivatedRoute,private stakeHolderService: StakeHolderService) {
        this.allDropdownSanctionAdminCount = [
            { sanctionAdminCount: 'Single' },
            { sanctionAdminCount: 'Single & Same' },
            { sanctionAdminCount: 'Multiple' },
        ];
        this.allDropdownSanctionAdminNature = [
            { sanctionAdminNature: 'Online PL' },
            { sanctionAdminNature: 'Secondary Schools' },
            { sanctionAdminNature: 'Circle Office' },
            { sanctionAdminNature: 'Zilla Parishad/Panchayat Samity/(Block)' },
            { sanctionAdminNature: 'Municipality' },
            { sanctionAdminNature: 'Municipality Coorporation' },
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
        this.getTreasury();
    }

    initializeForm(): void {
        this.addStakeHolder = this.fb.group({
            HOA: [{ value: this.stakeHolderTableValue != null ? this.stakeHolderTableValue[0].hoa : '', disabled: !this.isEditable }],
            Treasury: [{value: '', disabled: !this.isEditable }],
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
            this.addStakeHolder.enable();
            this.showAllDropdownOptions();
            this.addStakeHolder.get('HOA')?.disable();  // Keep the "Head Of Account" field disabled
        } else {
            this.addStakeHolder.disable();
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
        this.showSanctionAdminNature = selectedOption === 'Multiple';
    }
    
    
    getTreasury() {
        this.stakeHolderService.getTresury().subscribe((response) => {
            if (response.apiResponseStatus === 0 || response.apiResponseStatus === 1 || response.apiResponseStatus === 3) {
                response.result.map((item) => {
                    item.treasuryName = item.treasuryName + ' (' + item.treasuryCode + ')';
                });
                this.dropdownItemTreasuryname = response.result;
                this.populateDropdowns();  // Populate dropdown options with the fetched data
            }
        });
    }
    resetForm(): void {
        this.addStakeHolder.reset();
    }

    approveForm(): void {
        if (this.addStakeHolder.valid) {
            // Handle form submission logic here
        }
    }
}
