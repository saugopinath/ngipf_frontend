import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    panelMenuItems: MenuItem[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.panelMenuItems = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }],
            },

            {
                label: 'Employee Details',
                items: [
                    {
                        label: 'Entry New Employee',
                        icon: 'pi pi-plus-circle',
                        routerLink: ['employeeDetails/viewEmployee/entryEmployee'],
                    },
                    {
                        label: 'View & Modify',
                        icon: 'pi pi-search-plus',
                        routerLink: ['employeeDetails/viewEmployee/searchEmployee'],
                    },
                ],
            },
            {
                label: 'StakeHolder Mapping',
                items: [
                    {
                        label: 'StakeHolder Mapping',
                        icon: 'pi pi-table',
                        routerLink: ['stakeHolder'],
                    },
                ],
            },
            {
                label: 'Interest Year Capture',
                items: [
                    {
                        label: 'Interest Year Capture',
                        icon: 'pi pi-table',
                        routerLink: ['Interest-year-capture/capture-pf-interest'],
                    },
                ],
            },
            {
                label: 'Report',
                items: [
                    {
                        label: 'Report',
                        icon: 'pi pi-table',
                        routerLink: [],
                    },
                ],
            },
            {
                label: 'Opening Balance Capture & PF Register Submission',
                items: [
                    {
                        label: 'View',
                        icon: 'pi pi-table',
                        routerLink: ['opening-balance-capture/view'],
                    },
                    {
                        label: 'Permission of Initiation',
                        icon: 'pi pi-table',
                        routerLink: ['opening-balance-capture/permission_of_initiation'],
                    },
                    {
                        label: 'Pending Request List of Other User',
                        icon: 'pi pi-table',
                        routerLink: ['opening-balance-capture/pending_req_list_of_other_user'],
                    },
                    {
                        label: 'Operator List Having -Ve Balance ByPass',
                        icon: 'pi pi-table',
                        routerLink: ['opening-balance-capture/operator_list_having-ve_balance_bypassed'],
                    },
                ],
            },
            {
                label: 'Interest Rate Master',
                items: [
                    {
                        label: 'Add New',
                        icon: 'pi pi-plus-circle',
                        routerLink: ['interstRateMaster/addInterestRate'],
                    },
                ],
            },
            {
                label: 'Inbox',
                items: [
                    {
                        label: 'Inbox',
                        icon: 'pi pi-table',
                        routerLink: ['Inbox'],
                    },
                ],
            },
            {
                label: 'Tagging of Recipt & Payment',
                items: [
                    {
                        label: 'Tagging of Recipt & Payment',
                        icon: 'pi pi-table',
                        routerLink: ['taggingReceiptPayment'],
                    },
                ],
            },
            {
                label: 'Employee PF Balance Transfer',
                items: [
                    {
                        label: 'History',
                        icon: 'pi pi-history',
                        routerLink: ['employee-pf-balance-transfer/transfer-history'],
                    },
                ],
            },
            {
                label: 'Advance',
                items: [
                    {
                        label: 'Master Maintance',
                        icon: 'pi pi-wrench',
                        routerLink: ['advance/viewAdvance/masterMaintanace'],

                    },
                    {
                        label: 'DPPG Advance Search',
                        icon: 'pi pi-search-plus',
                        routerLink: ['advance/viewAdvance/dppgAdvanceSearch'],
                    },
                ],
            },
            {
                label: 'WorkFlow',
                items: [
                    {
                        label: 'WorkFlow',
                        icon: 'pi pi-chart-line',
                        routerLink: ['workflow-management'],
                    },
                ],
            },
            {
                label: 'Interest Credit Bill/Statement',
                items: [
                    {
                        label: 'Initiate',
                        icon: 'pi pi-plus-circle',
                        routerLink: ['Interest-credit-bill-statement/initiate_pf_interest_calculation'],
                    },
                    {
                        label: 'Interest Generation master ',
                        icon: 'pi pi-search-plus',
                        routerLink: ['Interest-credit-bill-statement/interest-credit-generation-master'],
                    },
                    {
                        label: 'Final Payment',
                        icon: 'pi pi-search-plus',
                        routerLink: ['Interest-credit-bill-statement/TR-43-for-final-payment'],
                    },
                    {
                        label: 'Bill/Statement Summary',
                        icon: 'pi pi-search-plus',
                        routerLink: ['Interest-credit-bill-statement/interest_credit_bil_summary'],
                    },
                    {
                        label: 'Final Payment Interest Statement',
                        icon: 'pi pi-search-plus',
                        routerLink: ['Interest-credit-bill-statement/TR-43-for-final-payment'],
                    },
                ],
            },
            {
                label: 'Final Payment',
                items: [
                    {
                        label: 'Final Payment Application',
                        icon: 'pi pi-money-bill',
                        routerLink: ['Final-payment/final-payment-application'],
                    },
                    {
                        label: 'Final Payment Eligibility Master',
                        icon: 'pi pi-users',
                        routerLink: ['Final-payment/final-payment-eligibility-master'],
                    },
                ],
            },
        ];
    }
}
