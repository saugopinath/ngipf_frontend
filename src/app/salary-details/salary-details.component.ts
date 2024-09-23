import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonthlysalaryService } from '../core/services/employeeMonthlySalary/monthlysalary.service';
import { ToastService } from '../core/services/toast.service';

interface Year {
    Year: string;
    code: string;
}

@Component({
    selector: 'app-salary-details',
    templateUrl: './salary-details.component.html',
    styleUrls: ['./salary-details.component.scss'],
})
export class SalaryDetailsComponent implements OnInit {
    dropdownItemYearType: Year[];
    SalaryDetailsForm!: FormGroup;
    showTable: boolean = false;
    SalaryDetails: any[] = [];
    year: any;
    constructor(private fb: FormBuilder, private monthlysalaryService: MonthlysalaryService, private toastService: ToastService) {
        this.dropdownItemYearType = [
            { Year: '2022-2023', code: '2022-2023' },
            { Year: '2023-2024', code: '2023-2024' },
            { Year: '2024-2025', code: '2024-2025' },
        ];
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.SalaryDetailsForm = this.fb.group({
            Financial_year: ['', Validators.required],
        });
    }

    // Method to check if a form control is invalid and touched
    isInvalidAndTouched(controlName: string): boolean {
        const control = this.SalaryDetailsForm.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    onSearch() {
        if (this.SalaryDetailsForm.valid) {
            this.showTable = true;
        } else {
            this.showTable = false;
            Object.keys(this.SalaryDetailsForm.controls).forEach((field) => {
                const control = this.SalaryDetailsForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }
        this.getMonthlySalary(this.year);
    }
    getMonthlySalary(year: any) {
        this.monthlysalaryService.getMonthlySalary(year.code).subscribe((response) => {
            console.log({ response });
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                console.log(response);

                this.SalaryDetails = response.result;
            } else {
                this.toastService.showAlert(response.message, response.apiResponseStatus);
            }
        });
    }

    selectedYear($event) {
        this.year = $event.value;
        console.log(this.year);
    }
}
