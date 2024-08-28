import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-basic-details',
    templateUrl: './basic-details.component.html',
    styleUrls: ['./basic-details.component.scss'],
})
export class BasicDetailsComponent implements OnInit {
    maxDateValue: Date = new Date(Date.now());
    submitted: boolean = false;

    activeState: boolean[] = [true, false];
    toggle(index: number) {
        this.activeState[index] = !this.activeState[index];
    }
    addPersonal!: FormGroup;
    addService!: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.addPersonal = this.fb.group({
            empID: ['', Validators.required],
            pfAcc: ['', Validators.required],
            name: ['', Validators.required],
            gender: ['', Validators.required],
            religion: ['', Validators.required],
            selectedDOB: [null, Validators.required],
            pan: ['', Validators.required],
            adhaar: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            selectedEffectFormDate: [null, Validators.required],
        });

        this.addService = this.fb.group({
            GPFNo: [''],
            pfAccStatus: ['', Validators.required],
            selectedDOJ: [null, Validators.required],
            approvalNo: ['', Validators.required],
            selectedApprovalDate: [null, Validators.required],
            selectedEffecteDate: [null, Validators.required],
            type: ['', Validators.required],
            selectedEffectFormDate: [null, Validators.required],
            designation: ['', Validators.required],
            gpfcpf: ['', Validators.required],
            selectedDOR: [null, Validators.required],
            tot: ['', Validators.required],
            selectedDOT: [null, Validators.required],
        });
    }
    isInvalidAndTouched(controlName: string): boolean {
        const control = this.addPersonal.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }
    prevPage(){
        this.router.navigate(['']);
  }
    nextPage() {
        this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/Contact-details']);
        this.submitted = true;
    }
}
