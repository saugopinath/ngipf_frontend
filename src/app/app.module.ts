import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule, appDeclaration } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { LoadingIndeterminateService } from './layout/service/loading-indeterminate.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { StepsModule } from 'primeng/steps';
import { ServerDownComponent } from './shared/components/server-down/server-down.component';
import { LoginComponent } from './features/login/login.component';
import { HasRoleDirective } from './core/directive/has-role.directive';
import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { AuthTokenService } from './core/services/auth/auth-token.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FirstLetterPipe } from './core/pipe/first-letter.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StaticLoginComponent } from './features/static-login/static-login.component';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { MenuModule } from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { MhPrimeDynamicTableModule } from 'mh-prime-dynamic-table';
import { DynamicTableModule } from './shared/modules/dynamic-table/dynamic-table.module';
import { CheckboxModule } from 'primeng/checkbox';
import { TestComponent } from './features/test/test.component';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ViewEmployeeComponent } from './employeeDetails/view-employee/view-employee.component';
import { SerachEmployeeComponent } from './employeeDetails/serach-employee/serach-employee.component';
import { StakeHolderComponent } from './stakeHolder/stake-holder/stake-holder.component';
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
import { DialogModule } from 'primeng/dialog';
import { SalaryDetailsComponent } from './salary-details/salary-details.component';
import { EmployeeWisePfRegisterWithInterestComponent } from './opening-balance-capture/employee-wise-pf-register-with-interest/employee-wise-pf-register-with-interest.component';
import { AddStakeholderComponent } from './stakeHolder/stake-holder/add-stakeholder/add-stakeholder.component';
import { EditStakeholderComponent } from './stakeHolder/stake-holder/edit-stakeholder/edit-stakeholder.component';
import { DemoSearchEmployeeComponent } from './employeeDetails/newSearch-Employee/demo-search-employee/demo-search-employee.component';
import { ContactDetailsComponent } from './employeeDetails/newSearch-Employee/contact-details/contact-details.component';
import { BasicDetailsComponent } from './employeeDetails/newSearch-Employee/basic-details/basic-details.component';
import { SalaryComponent } from './employeeDetails/newSearch-Employee/salary/salary.component';
import { BankdetailsComponent } from './employeeDetails/newSearch-Employee/bankdetails/bankdetails.component';
import { OfficeComponent } from './employeeDetails/newSearch-Employee/office/office.component';
import { SelfRegistrationComponent } from './selfRegistration/self-registration/self-registration.component';
import { ViewDepositeTresuryBankComponent } from './depositeTresuryBank/view-deposite-tresury-bank/view-deposite-tresury-bank.component';
import { BankChallanComponent } from './depositeTresuryBank/bank-challan/bank-challan.component';
import { AddExceptionComponent } from './interestRateMaster/add-exception/add-exception.component';
import { ViewPFSubsciptionComponent } from './changePFSubscription/view-pfsubsciption/view-pfsubsciption.component';
import { MinMaxMasterComponent } from './changePFSubscription/min-max-master/min-max-master.component';
import { ChangeSubsComponent } from './changePFSubscription/change-subs/change-subs.component';
import { FetchSubscriberComponent } from './opening-balance-capture/fetch-subscriber/fetch-subscriber.component';
import { InitialCaptureBalanceComponent } from './opening-balance-capture/initial-capture-balance/initial-capture-balance.component';
import { InitialBalanceCaptureForPFDAdminComponent } from './opening-balance-capture/initial-balance-capture-for-pfdadmin/initial-balance-capture-for-pfdadmin.component';
import { BalanceStatusComponent } from './opening-balance-capture/balance-status/balance-status.component';
import { OpeningBalanceStatusForSanctioningAuthorityComponent } from './opening-balance-capture/balance-status/opening-balance-status-for-sanctioning-authority/opening-balance-status-for-sanctioning-authority.component';
import { CapturedEmployeeBalanceComponent } from './opening-balance-capture/balance-status/opening-balance-status-for-sanctioning-authority/captured-employee-balance/captured-employee-balance.component';
import { BalanceAcceptanceComponent } from './opening-balance-capture/balance-status/opening-balance-status-for-sanctioning-authority/captured-employee-balance/balance-acceptance/balance-acceptance.component';
import { PdfGenerationComponent } from './pdf-generation/pdf-generation.component';
import { SanctionAdminWiseOpeningBalanceComponent } from './opening-balance-capture/view/sanction-admin-wise-opening-balance/sanction-admin-wise-opening-balance.component';
import { PfRegisterYearComponent } from './opening-balance-capture/view/sanction-admin-wise-opening-balance/pf-register-year/pf-register-year.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
@NgModule({
    declarations: [AppComponent, NotfoundComponent, ServerDownComponent, LoginComponent, NotFoundComponent, StaticLoginComponent, appDeclaration, TestComponent, ViewEmployeeComponent, SerachEmployeeComponent, StakeHolderComponent, InterestRateMasterComponent, AddInterestRateComponent, DelegatedRoleComponent, TaggingReceiptPaymentComponent, EmployeeWisePfRegisterWithInterestComponent, EmployeePFBalanceTransferComponent, TransferHistoryComponent, CapturePfInterestYearComponent, InboxComponent, WorkflowManagementComponent, OpeningBalanceCaptureComponent, FinalPaymentComponent, FinalPaymentApplicationComponent, FinalPaymentEligibilityMasterComponent, InterestCreditBillStatementComponent, InitiatePfInterestCalculationComponent, InterestCreditBillSummaryComponent, TRForFinalPaymentComponent, InterestCreditGenerationMasterComponent, ViewComponent, PermissionOfInitiationComponent, PendingRequestListOfOtherUserComponent, OperatorListHavingVeBalanceBypassedComponent, ViewAdvanceComponent, DppgAdvanceSearchComponent, MasterMaintanceComponent, EligibilityMasterComponent, PurposeMasterComponent, PurposeTAggingMasterComponent, SalaryDetailsComponent, AddStakeholderComponent, EditStakeholderComponent, DemoSearchEmployeeComponent, ContactDetailsComponent, BasicDetailsComponent, SalaryComponent, BankdetailsComponent, OfficeComponent, SelfRegistrationComponent, ViewDepositeTresuryBankComponent, BankChallanComponent, AddExceptionComponent, ViewPFSubsciptionComponent, MinMaxMasterComponent, ChangeSubsComponent, FetchSubscriberComponent, InitialCaptureBalanceComponent, InitialBalanceCaptureForPFDAdminComponent, BalanceStatusComponent, OpeningBalanceStatusForSanctioningAuthorityComponent, CapturedEmployeeBalanceComponent, BalanceAcceptanceComponent, PdfGenerationComponent, SanctionAdminWiseOpeningBalanceComponent, PfRegisterYearComponent],
    imports: [ProgressSpinnerModule,MultiSelectModule,PanelModule, CommonModule, AppRoutingModule, AppLayoutModule, DialogModule, ToastModule, NgxPermissionsModule.forRoot(), NgxSpinnerModule, ButtonModule, RadioButtonModule, DataViewModule, FormsModule, InputTextModule, DropdownModule, SelectButtonModule, FormsModule, ReactiveFormsModule, InputMaskModule, MenuModule, StepsModule, AutoCompleteModule, TooltipModule, CalendarModule, InputNumberModule, DividerModule, InputTextareaModule, TableModule, BadgeModule, MhPrimeDynamicTableModule, DynamicTableModule, CheckboxModule, ToggleButtonModule, CardModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: (authTokenService: AuthTokenService, rolesService: NgxRolesService) =>
        //         function () {
        //             return authTokenService.loadRolesAndPermissions().subscribe((roles) => {
        //                 if (roles != null) {
        //                     roles.forEach((role) => {
        //                         rolesService.addRoleWithPermissions(role.Name, role.Permissions);
        //                     });
        //                 }
        //             });
        //         },
        //     deps: [AuthTokenService, NgxRolesService],
        //     multi: true,
        // },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MessageService,
        LoadingIndeterminateService,
        DatePipe,
        DividerModule,
        StepsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
})
export class AppModule {}
