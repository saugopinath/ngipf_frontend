import { Component, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { MenuItem, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDetailsService } from 'src/app/core/services/employeeDetails/employee-details.service';
@Component({
    selector: 'app-demo-search-employee',
    templateUrl: './demo-search-employee.component.html',
    styleUrls: ['./demo-search-employee.component.scss'],
})
export class DemoSearchEmployeeComponent implements OnInit {
    items: MenuItem[];
    ticketService: any;
    subscription: any;
    personalInformation: any;
    activeIndex: number = 1;

    submitted: boolean = false;

    maxDateValue: Date = new Date(Date.now());

    activeState: boolean[] = [false, false];
    toggle(index: number) {
        this.activeState[index] = !this.activeState[index];
    }
    addPersonal!: FormGroup;
    constructor(public messageService: MessageService, private fb: FormBuilder, private router: Router,private employeeDataService:EmployeeDetailsService ) {}

    ngOnInit(): void {
        this.items = [
            {
                label: 'Basic',
                routerLink: 'Basic-details',
                command: (event: any) => {
                    this.activeIndex = 1;
                },
            },
            {
                label: 'Contact',
                routerLink: 'Contact-details',
                command: (event: any) => {
                    this.activeIndex = 2;
                },
            },
            {
                label: 'Salary',
                routerLink: 'Salary',
                command: (event: any) => {
                    this.activeIndex = 3;
                },
            },
            {
                label: 'Office',
                routerLink: 'office-details',
                command: (event: any) => {
                    this.activeIndex = 4;
                },
            },
            {
                label: 'Bank',
                routerLink: 'Bank-details',
                command: (event: any) => {
                    this.activeIndex = 5;
                },
            },
        ];
        if (history.state.data) {
            const selectedEmployee=this.employeeDataService.setData(history.state.data);
            console.log(selectedEmployee);
            
            this.activeIndex = 1; // or the appropriate step index
        }
        if (history.state.data) {
            const selectedEmployee=this.employeeDataService.setData(history.state.data);
            console.log(selectedEmployee);
            
            this.activeIndex = 2; // or the appropriate step index
        }
        // this.initializeForm();
        // this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) =>{
        //   this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
        // });
        // this.personalInformation = this.ticketService.getTicketInformation().personalInformation;
    }
    // ngOnDestroy() {
    //   if (this.subscription) {
    //       this.subscription.unsubscribe();
    //   }
    // }

    // initializeForm(): void {
    //     this.addPersonal = this.fb.group({
    //         empID: ['', Validators.required],
    //         pfAcc: ['', Validators.required],
    //         name: ['', Validators.required],
    //         gender: ['', Validators.required],
    //         religion: ['', Validators.required],
    //         selectedDOB: [null, Validators.required],
    //         pan: ['', Validators.required],
    //         adhaar: ['', Validators.required],
    //         maritalStatus: ['', Validators.required],
    //         selectedEffectFormDate: [null, Validators.required],
    //     });
    // }
    // isInvalidAndTouched(controlName: string): boolean {
    //     const control = this.addPersonal.get(controlName);
    //     return control && control.invalid && (control.dirty || control.touched);
    // }
    nextPage() {
        this.submitted = true;
    }
}
