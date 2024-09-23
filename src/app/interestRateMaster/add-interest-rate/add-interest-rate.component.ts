import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApproveInterestRate } from 'src/app/core/models/InterestRate/interestRate';
import { InterestRateService } from 'src/app/core/services/interestRate/interest-rate.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { dateString } from 'src/app/utils/dateToString';

enum ActiveStatus {
    Yes = 'y',
    No = 'n',
}

@Component({
    selector: 'app-add-interest-rate',
    templateUrl: './add-interest-rate.component.html',
    styleUrls: ['./add-interest-rate.component.scss'],
})
export class AddInterestRateComponent implements OnInit {
    locaLeDateString(arg0: any) {
        return dateString(arg0);
    }
    addInterestRate!: FormGroup;
    maxDateValue: Date = new Date(Date.now());
    interestRates: any[] = [];
    interestRatePayload!: ApproveInterestRate;

    constructor(private fb: FormBuilder, private router: Router, private interestRateService: InterestRateService, private toastService: ToastService) {}

    ngOnInit(): void {
        this.initializeForm();
        this.getAllInterestRates();
    }

    activeOptions = [
        { label: 'Yes', value: ActiveStatus.Yes },
        { label: 'No', value: ActiveStatus.No },
    ];

    initializeForm(): void {
        this.addInterestRate = this.fb.group({
            InterestRate: [0, Validators.required],
            active: [null, Validators.required],
            GONo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+=\-`~\[\]{}|;:'",.<>?\\/]+$/)]],
            selectedGODate: [null, Validators.required],
            selectedWEFDate: [null, Validators.required],
            selectedWETDate: [null, Validators.required],
        });

        // Subscribe to value changes of selectedWEFDate
        this.addInterestRate.get('selectedWEFDate')?.valueChanges.subscribe((date: Date) => {
            if (date) {
                this.setWETDate(date);
            }
        });
    }

    // Method to set selectedWETDate one day after selectedWEFDate
    setWETDate(wefDate: Date): void {
        const wetDate = new Date(wefDate);
        wetDate.setDate(wetDate.getDate() + 1);
        this.addInterestRate.get('selectedWETDate')?.setValue(wetDate);
    }

    // Method to check if a form control is invalid and touched
    isInvalidAndTouched(controlName: string): boolean {
        const control = this.addInterestRate.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    // Method to handle form submission and add data to the table
    approve(): void {
        if (this.addInterestRate.valid) {
            const formData = this.addInterestRate.value;
            const formattedData = {
                ...formData,
                selectedGODate: this.formatDate(new Date(formData.selectedGODate)),
                selectedWEFDate: this.formatDate(new Date(formData.selectedWEFDate)),
                selectedWETDate: this.formatDate(new Date(formData.selectedWETDate)),
            };
            this.interestRatePayload = {
                activeFlag: this.addInterestRate.value.active,
                endDate: this.addInterestRate.value.selectedWETDate,
                wef: this.addInterestRate.value.selectedWEFDate,
                goDate: this.addInterestRate.value.selectedGODate,
                goNo: this.addInterestRate.value.GONo,
                interestRate: this.addInterestRate.value.InterestRate,
            };
            console.log(this.interestRatePayload);

            this.interestRateService.InsertInterestRateMaster(this.interestRatePayload).subscribe((response) => {
                if (response.apiResponseStatus == 1) {
                    this.toastService.showSuccess(response.message);
                    // Add the new entry at the top of the list using unshift
                this.interestRates.unshift(formattedData);
                    this.addInterestRate.reset();
                    this.addInterestRate.get('active')?.setValue(null); // Reset dropdown
                    this.getAllInterestRates();
                } else {
                    this.toastService.showError(response.message);
                }
            });
        } else {
            Object.keys(this.addInterestRate.controls).forEach((field) => {
                const control = this.addInterestRate.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }
    }

    // Method to format the date as 'dd.MM.yyyy'
    formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
    getAllInterestRates() {
        this.interestRateService.getInterestRate().subscribe((response) => {
            if (response.apiResponseStatus === 1) {
                this.toastService.showSuccess(response.message);
                const data = response.result.map((x, index) => {
                    return {
                        ...x,
                        id: index,
                        endDate: dateString(x.endDate),
                        wef: dateString(x.wef),
                        goDate: dateString(x.goDate),
                        activeFlag:x.activeFlag === 'y' ? "Yes" : "No"
                    };
                });
                this.interestRates = data;
            } else {
                this.toastService.showError(response.message);
            }
        });
    }
    addExpection($event) {
        console.log('event', $event);

        const selectedInterestValue = this.interestRates.filter((e) => e.id === $event);
        console.log('selected data', selectedInterestValue);

        if (selectedInterestValue) {
            this.router.navigate(['interstRateMaster/addInterestRate/addException', { data: JSON.stringify(selectedInterestValue) }]);
        } else {
            console.error('Employee not found');
        }
    }
}
