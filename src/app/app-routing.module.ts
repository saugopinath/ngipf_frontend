import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ServerDownComponent } from './shared/components/server-down/server-down.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { StaticLoginComponent } from './features/static-login/static-login.component';
import { HoaComponent } from './shared/components/hoa/hoa.component';
import { AmountDetailsComponent } from './shared/components/amount-details/amount-details.component';
import { SanctionDetailsComponent } from './shared/components/sanction-details/sanction-details.component';
import { EcsNeftComponent } from './shared/components/ecs-neft/ecs-neft.component';
import { BtDetailsComponent } from './shared/components/bt-details/bt-details.component';
import { ChequeDetailsComponent } from './shared/components/cheque-details/cheque-details.component';
import { SmartErrorComponent } from './core/helper/smart-error/smart-error.component';
import { ElectricityServiceProviderComponent } from './shared/components/electricity-service-provider/electricity-service-provider.component';
import { ServiceProviderWarpperComponent } from './shared/components/ServiceProviderWarpper/ServiceProviderWarpper.component';
import { BsnlServiceProviderComponent } from './shared/components/bsnl-service-provider/bsnl-service-provider.component';
import { ViewEmployeeComponent } from './employeeDetails/view-employee/view-employee.component';
import { SerachEmployeeComponent } from './employeeDetails/serach-employee/serach-employee.component';
import { InterestRateMasterComponent } from './interestRateMaster/interest-rate-master/interest-rate-master.component';
import { AddInterestRateComponent } from './interestRateMaster/add-interest-rate/add-interest-rate.component';
import { DelegatedRoleComponent } from './delegated-role/delegated-role.component';
import { TaggingReceiptPaymentComponent } from './tagging-receipt-payment/tagging-receipt-payment.component';
import { EmployeePFBalanceTransferComponent } from './employee-pf-balance-transfer/employee-pf-balance-transfer.component';
import { TransferHistoryComponent } from './employee-pf-balance-transfer/transfer-history/transfer-history.component';
import { CapturePfInterestYearComponent } from './Interest-year-capture/capture-pf-interest-year/capture-pf-interest-year.component';
import { InboxComponent } from './inbox/inbox.component';
import { WorkflowManagementComponent } from './workflow-management/workflow-management.component';
import { OpeningBalanceCaptureComponent } from './opening-balance-capture/opening-balance-capture.component';
import { FinalPaymentComponent } from './final-payment/final-payment.component';
import { FinalPaymentApplicationComponent } from './final-payment/final-payment-application/final-payment-application.component';
import { FinalPaymentEligibilityMasterComponent } from './final-payment/final-payment-eligibility-master/final-payment-eligibility-master.component';
import { InterestCreditBillStatementComponent } from './interest-credit-bill-statement/interest-credit-bill-statement.component';
import { InitiatePfInterestCalculationComponent } from './interest-credit-bill-statement/initiate-pf-interest-calculation/initiate-pf-interest-calculation.component';
import { InterestCreditBillSummaryComponent } from './interest-credit-bill-statement/interest-credit-bill-summary/interest-credit-bill-summary.component';
import { TRForFinalPaymentComponent } from './interest-credit-bill-statement/tr-for-final-payment/tr-for-final-payment.component';
import { InterestCreditGenerationMasterComponent } from './interest-credit-bill-statement/interest-credit-generation-master/interest-credit-generation-master.component';
import { ViewComponent } from './opening-balance-capture/view/view.component';
import { PermissionOfInitiationComponent } from './opening-balance-capture/permission-of-initiation/permission-of-initiation.component';
import { PendingRequestListOfOtherUserComponent } from './opening-balance-capture/pending-request-list-of-other-user/pending-request-list-of-other-user.component';
import { OperatorListHavingVeBalanceBypassedComponent } from './opening-balance-capture/operator-list-having-ve-balance-bypassed/operator-list-having-ve-balance-bypassed.component';
import { ViewAdvanceComponent } from './advance/view-advance/view-advance.component';
import { DppgAdvanceSearchComponent } from './advance/dppg-advance-search/dppg-advance-search.component';
import { MasterMaintanceComponent } from './advance/master-maintance/master-maintance.component';
import { EligibilityMasterComponent } from './advance/eligibility-master/eligibility-master.component';
import { PurposeMasterComponent } from './advance/purpose-master/purpose-master.component';
import { PurposeTAggingMasterComponent } from './advance/purpose-tagging-master/purpose-tagging-master.component';
import { SalaryDetailsComponent } from './salary-details/salary-details.component';
import { EmployeeWisePfRegisterWithInterestComponent } from './opening-balance-capture/employee-wise-pf-register-with-interest/employee-wise-pf-register-with-interest.component';
import { StakeHolderComponent } from './stakeHolder/stake-holder/stake-holder.component';
import { AddStakeholderComponent } from './stakeHolder/stake-holder/add-stakeholder/add-stakeholder.component';
import { EditStakeholderComponent } from './stakeHolder/stake-holder/edit-stakeholder/edit-stakeholder.component';
import { DemoSearchEmployeeComponent } from './employeeDetails/newSearch-Employee/demo-search-employee/demo-search-employee.component';
import { ContactDetailsComponent } from './employeeDetails/newSearch-Employee/contact-details/contact-details.component';
import { BasicDetailsComponent } from './employeeDetails/newSearch-Employee/basic-details/basic-details.component';
import { SalaryComponent } from './employeeDetails/newSearch-Employee/salary/salary.component';
import { BankDetailsModel } from './core/models/BankDetail.model';
import { BankdetailsComponent } from './employeeDetails/newSearch-Employee/bankdetails/bankdetails.component';
import { OfficeComponent } from './employeeDetails/newSearch-Employee/office/office.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                { path: '', redirectTo: 'login', pathMatch: 'full' },
                { path: 'login', component: LoginComponent },
                { path: 'login?token=:token', component: LoginComponent },
                {
                    path: '',
                    component: AppLayoutComponent,
                    canActivate: [AuthGuard],
                    // canActivate: [NgxPermissionsGuard],data: {permissions: {only: 'approver',redirectTo: '/notfound'}},
                    children: [
                        { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule) },
                        { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then((m) => m.UIkitModule) },
                        { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then((m) => m.UtilitiesModule) },
                        { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then((m) => m.DocumentationModule) },
                        { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then((m) => m.PrimeBlocksModule) },
                        { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then((m) => m.PagesModule) },
                        { path: 'employeeDetails/viewEmployee', component: ViewEmployeeComponent },
                        // { path: 'employeeDetails/viewEmployee/entryEmployee', component: EntryEmployeeComponent },
                        {
                            path: 'employeeDetails/viewEmployee/entryEmployee',
                            component: DemoSearchEmployeeComponent,
                            children: [
                                { path: '', redirectTo: 'Basic-details', pathMatch: 'full' },
                                { path: 'Basic-details', component: BasicDetailsComponent },
                                { path: 'Contact-details', component: ContactDetailsComponent },
                                { path: 'Salary', component: SalaryComponent},
                                {path:'office-details',component:OfficeComponent},
                                {path:'Bank-details',component:BankdetailsComponent},
                            ],
                        },
                        { path: 'employeeDetails/viewEmployee/entryEmployee', component: DemoSearchEmployeeComponent },
                        { path: 'employeeDetails/viewEmployee/searchEmployee', component: SerachEmployeeComponent },
            
                        { path: 'stakeHolder', component: StakeHolderComponent },
                        { path: 'interestRateMaster', component: InterestRateMasterComponent },
                        { path: 'interstRateMaster/addInterestRate', component: AddInterestRateComponent },
                        { path: 'delegatedRole', component: DelegatedRoleComponent },
                        { path: 'taggingReceiptPayment', component: TaggingReceiptPaymentComponent },
                        { path: 'Employee-PF-balance-transfer', component: EmployeePFBalanceTransferComponent },
                        { path: 'employee-pf-balance-transfer/transfer-history', component: TransferHistoryComponent },
                        { path: 'Interest-year-capture/capture-pf-interest', component: CapturePfInterestYearComponent },
                        { path: 'Inbox', component: InboxComponent },
                        { path: 'workflow-management', component: WorkflowManagementComponent },
                        { path: 'opening-balance-capture', component: OpeningBalanceCaptureComponent },
                        { path: 'opening-balance-capture/view', component: ViewComponent },
                        { path: 'opening-balance-capture/permission_of_initiation', component: PermissionOfInitiationComponent },
                        { path: 'opening-balance-capture/pending_req_list_of_other_user', component: PendingRequestListOfOtherUserComponent },
                        { path: 'opening-balance-capture/operator_list_having-ve_balance_bypassed', component: OperatorListHavingVeBalanceBypassedComponent },
                        { path: 'opening-balance-capture/employee-wise-pf-register', component: EmployeeWisePfRegisterWithInterestComponent },
                        { path: 'Final-payment', component: FinalPaymentComponent },
                        { path: 'Final-payment/final-payment-application', component: FinalPaymentApplicationComponent },
                        { path: 'Final-payment/final-payment-eligibility-master', component: FinalPaymentEligibilityMasterComponent },
                        { path: 'Interest-credit-bill-statement', component: InterestCreditBillStatementComponent },
                        { path: 'Interest-credit-bill-statement/initiate_pf_interest_calculation', component: InitiatePfInterestCalculationComponent },
                        { path: 'Interest-credit-bill-statement/interest_credit_bil_summary', component: InterestCreditBillSummaryComponent },
                        { path: 'Interest-credit-bill-statement/TR-43-for-final-payment', component: TRForFinalPaymentComponent },
                        { path: 'Interest-credit-bill-statement/interest-credit-generation-master', component: InterestCreditGenerationMasterComponent },
                        { path: 'advance/viewAdvance', component: ViewAdvanceComponent },
                        { path: 'advance/viewAdvance/dppgAdvanceSearch', component: DppgAdvanceSearchComponent },
                        { path: 'advance/viewAdvance/masterMaintanace', component: MasterMaintanceComponent },
                        { path: 'advance/viewAdvance/masterMaintanace/eligibilityMaster', component: EligibilityMasterComponent },
                        { path: 'advance/viewAdvance/masterMaintanace/purposeMaster', component: PurposeMasterComponent },
                        { path: 'advance/viewAdvance/masterMaintanace/purposeTaggingMaster', component: PurposeTAggingMasterComponent },
                        { path: 'salary-details', component: SalaryDetailsComponent },
                        { path: 'stakeHolder', component: StakeHolderComponent },
                        { path: 'stakeHolder/editStakHolder', component: EditStakeholderComponent },
                        { path: 'stakeHolder/addStakHolder', component: AddStakeholderComponent },
                        

                    ],
                },
                { path: 'static-login', component: StaticLoginComponent },
                { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then((m) => m.AuthModule) },
                { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then((m) => m.LandingModule) },
                { path: 'notfound', component: NotFoundComponent },
                { path: 'server-down', component: ServerDownComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
export const appDeclaration = [SmartErrorComponent, HoaComponent, AmountDetailsComponent, SanctionDetailsComponent, EcsNeftComponent, BtDetailsComponent, ChequeDetailsComponent, ElectricityServiceProviderComponent, ServiceProviderWarpperComponent, BsnlServiceProviderComponent];
