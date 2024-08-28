import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { baseModel } from '../models/baseModel';
import { hoa } from '../models/hoa.model';
import { BillDetailsModel } from '../models/billDetails.model';
import { ChequeBill_Model } from '../models/ChequeBill.model';
import { Validators } from '@angular/forms';
import { BankDetailsModel } from '../models/BankDetail.model';
import { BillDetailsOfTR21_Model } from '../models/InsertModel/BillDetailsOfTR21.model';
import { BillDetailsOftr24_Model } from '../models/InsertModel/BillDetailsOfTR24.model';
import { BillDetailsOftr26_Model } from '../models/InsertModel/BillDetailsOfTR26.model';
import { BillDetailsOftr27_Model } from '../models/InsertModel/BillDetailsOfTR27.model ';
import { BillDetailsOftr28_Model } from '../models/InsertModel/BillDetailsOfTR28.model';
import { BillDetailsOftr31_Model } from '../models/InsertModel/BillDetailsOfTR31.model';
import { BillDetailsOftr31A_Model } from '../models/InsertModel/BillDetailsOfTR31A.model';
import { BillDetailsOftr33_Model } from '../models/InsertModel/BillDetailsOfTR33.model';
import { BillDetailsOftr34_Model } from '../models/InsertModel/BillDetailsOfTR34.model';
import { BillDetailsOftr35_Model } from '../models/InsertModel/BillDetailsOfTR35.model';
import { BillDetailsOftr36_Model } from '../models/InsertModel/BillDetailsOfTR36.model';
import { BillDetailsOftr36A_Model } from '../models/InsertModel/BillDetailsOfTR36A.model';
import { BillDetailsOftr37_Model } from '../models/InsertModel/BillDetailsOfTR37.model';
import { BillDetailsOftr42_Model } from '../models/InsertModel/BillDetailsOfTR42.model ';
import { BillDetailsOftr43_Model } from '../models/InsertModel/BillDetailsOfTR43.model';
import { BillDetailsOftr50_Model } from '../models/InsertModel/BillDetailsOfTR50.model';
import { BillDetailsOftr51_Model } from '../models/InsertModel/BillDetailsOfTR51.model';
import { BillDetailsOftr60_Model } from '../models/InsertModel/BillDetailsOfTR60.model';
import { BillDetailsOftr61_Model } from '../models/InsertModel/BillDetailsOfTR61.model';
import { BillDetailsOftr68_Model } from '../models/InsertModel/BillDetailsOfTR68.model';
import { BillDetailsOftr68B_Model } from '../models/InsertModel/BillDetailsOfTR68B.model';
import { BillDetailsOftr68C_Model } from '../models/InsertModel/BillDetailsOfTR68C.model';
import { BillDetailsOftr70C_Model } from '../models/InsertModel/BillDetailsOfTR70C.model';
import { BillDetailsOftr73_Model } from '../models/InsertModel/BillDetailsOfTR73.model';
import { CPIN_Model } from '../models/CPIN.model';
import { CertificateDescObject_Model } from '../models/CertificateDescObject_Model';
import { GissClaimForModel } from '../models/GissClaimFor.Model';
import { DynamicTrModel } from '../models/dynamicTrModel';
import { UpdateDetailsModel } from '../models/UpdateDetailsModel';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    eBillUrl = `${environment.BaseURL}api/`;
    ePradanUrl = `${environment.ePradanBaseURL}api/`;
    saoCode: string;
    deptCode: string;
    constructor(private http: HttpClient) {

    }

    postApi(payload: any, url: string): Observable<any> {
        return this.http.post<any>(this.eBillUrl + url, payload).pipe(catchError(this.handleError));
    }

    // *****Post  service *****
    postCoreApi(payload: any, url: string): Observable<any> {
        return this.http.post<any>(this.eBillUrl + url, payload).pipe(catchError(this.handleError));
    }

    public handleError(errorResponse: HttpErrorResponse): any {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }
        return throwError(() => 'Unable to connect to server');
    }

    getMonth(): any {
        let currrentMonth = 0;
        const date = new Date().getDate();
        let getMonth = new Date().getMonth();
        if (+getMonth === 0) {
            date < 23 ? (getMonth = 12) : (getMonth = getMonth);
        }
        if (date < 23) {
            currrentMonth = getMonth;
        } else {
            currrentMonth = getMonth + 1;
        }
        return currrentMonth;
    }

    post<Type>(payload: baseModel, url: string): Observable<any> {
        if (!payload.isNull) {
            return this.http.post<Type>(this.eBillUrl + url, payload);
        } else {
            return throwError(() => `All keys of the payload are not set. [${payload.blankKeys.join(',')}]`);
        }
    }

    put<Type>(payload: any, url: string): Observable<any> {
        return this.http.put<Type>(this.eBillUrl + url, payload);
    }

    get<Type>(url: string): Observable<any> {
        return this.http.get<Type>(this.eBillUrl + url).pipe(catchError(this.handleError));
    }

    TrMasterList() {
        return this.http.get(this.eBillUrl + 'TrMasterDetails/GetAllTrMasterDetail');
    }

    postsubDetailhead(payload: hoa): Observable<any> {
        return this.http.post<any>(this.eBillUrl + 'DdoAllotmentTransaction/AllotmentData', payload);
    }

    postBillDetails(payload: BillDetailsModel): Observable<any> {
        return this.http.post<any>(this.eBillUrl + 'Bill/InsertBill', payload);
    }

    modifyBillDetails(payload: UpdateDetailsModel): Observable<any> {
        return this.http.put<any>(this.eBillUrl + 'Bill/UpdateBill', payload);
    }









    // *****************get Common Parts of Form********************************//
    getDemandData() {
        return this.http.get<any>(this.eBillUrl + 'Department/DepartmentsCode');
    }

    getMajorHeadByDemandId(demandId: string) {
        return this.http.get<any>(this.eBillUrl + 'Department/MajorHeadByDemand/' + demandId);
    }

    getSubMajorHeadByMajorHeadId(majorHeadId: number) {
        return this.http.get<any>(this.eBillUrl + 'Department/SubMajorHeadByMajorHeadId/' + majorHeadId);
    }
    // getclaim type in hoa
    getClaim(formCode: number) {
        return this.http.get<any>(this.eBillUrl + 'ClaimForHoaMapping/ClaimForHoaByFormCode/?formCode=' + formCode);
    }

    getMinorHead(subMajorHeadId: number) {
        return this.http.get<any>(this.eBillUrl + 'Department/MinorHeadBySubMajorHead/' + subMajorHeadId);
    }

    getSchemeHead(minorHeadId: number, demandCode: string) {
        return this.http.get<any>(this.eBillUrl + 'Department/SchemeHeadByMinorHeadId/' + minorHeadId + '/' + demandCode);
    }

    getDetailHead() {
        return this.http.get<any>(this.eBillUrl + 'Department/DetailHead/');
    }









    // Post Api for Save Cheque Bill
    submitCheque_Bill(payload: ChequeBill_Model[]) {
        return this.http.post<any>(this.eBillUrl + 'ChequeDetails/InsertChequeDetails?billId=' + payload[0].billId, payload);
    }
    // *****************get Common Parts of Form********************************//



    // *****************get Common Parts of Form end********************************//

    // getHodWalletData() {
    //     return this.http.get<any>(this.bantanUrlwV + '/WalletInformation/' + 'getHodWallet');
    // }

    getSaoHeirarchy() {
        return this.http.get<any>(this.eBillUrl + 'SaoLevel/' + 'GetHierarchylevelsBySaoCode/' + this.saoCode);
    }

    getAllSao() {
        return this.http.get<any>(this.eBillUrl + 'sao');
    }

    getSaoByHeirarchy(saoLevel: number) {
        return this.http.get<any>(this.eBillUrl + 'Sao/' + 'GetSaosByHierarchyAndDeptCode/' + saoLevel + '/' + this.deptCode);
    }

    getAllTreasury() {
        return this.http.get<any>(this.eBillUrl + 'Treasury');
    }

    getDdoByTreasury(treasuryCode: any) {
        return this.http.get<any>(this.eBillUrl + 'Ddo/' + 'DdoByTreasury/' + treasuryCode);
    }
    // for inside Voucher detail the tv no and tv date
    getTvNoTvDt() {
        return this.http.get<any>(this.eBillUrl + 'v1/VoucherDetail/GetAllVouchersDetail');
    }
    getVoucherDetailsByTrCode(trCode: string, VoucherNo: number, date: string) {
        const url = `${this.eBillUrl}v1/VoucherDetail/VoucherDetailsByTrCode`;
        const params = new HttpParams().set('trCode', trCode).set('VoucherNo', VoucherNo.toString()).set('date', date);
        return this.http.get<any>(url, { params });
    }

    // submitBudgetRelease(url: string, payload: any) {
    //     return this.http.post<any>(this.bantanUrlwV + '/' + url, payload);
    // }

    // getFreshAllotment(url: string) {
    //     return this.http.get<any>(this.eBillUrl + url);
    // }

    // approveTransaction(url: string, payload: any) {
    //     return this.http.post<any>(this.eBillUrl + url, payload);
    // }

    // getApprovedData(url: string) {
    //     return this.http.get<any>(this.eBillUrl + url);
    // }

    // sanctionTransaction(url: string, payload: any) {
    //     return this.http.post<any>(this.eBillUrl + url, payload);
    // }

    // modifyAllotments(url: string, payload: any) {
    //     return this.http.put<any>(this.eBillUrl + url, payload);
    // }

    // deleteTransactionsAfterApproval(url: string, payload: any) {
    //     return this.http.post<any>(this.eBillUrl + url, payload);
    // }

    getMyAllotments() {
        return this.http.get<any>(this.eBillUrl + 'Allotment' + '/MyAllotments');
    }

    getNewAllotments() {
        return this.http.get<any>(this.eBillUrl + 'Allotment' + '/New');
    }

    submitRelease(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'Allotment', payload);
    }

    approveAllotments(payload: any) {
        return this.http.put<any>(this.eBillUrl + 'Allotment' + '/Approve', payload);
    }

    getApprovedAllotments() {
        return this.http.get<any>(this.eBillUrl + 'Allotment' + '/Approved');
    }

    sanctionAllotments(payload: string) {
        return this.http.put<any>(this.eBillUrl + 'Allotment' + '/Sanction', payload);
    }

    revertAllotments(payload: any) {
        return this.http.put<any>(this.eBillUrl + 'Allotment' + '/Revert', payload);
    }

    modifyAllotment(payload: any) {
        return this.http.put<any>(this.eBillUrl + 'Allotment', payload);
    }

    getAllotmentsForRevoke() {
        return this.http.get<any>(this.eBillUrl + 'Allotment' + '/Sanctioned');
    }

    submitBudgetRevoke(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'Allotment/WithdrawlTransaction', payload);
    }

    getWithdrawalAllotments() {
        return this.http.get<any>(this.eBillUrl + 'Allotment/GetApprovedFromRevokedTransactions');
    }

    draftSanctionAllotments(payload: any) {
        return this.http.put<any>(this.eBillUrl + 'Allotment' + '/DraftSanction', payload);
    }

    sanctionWithdrawalledAllotments(payload: any) {
        return this.http.put<any>(this.eBillUrl + 'Allotment/SanctionWithdrawal', payload);
    }

    getAllDraftedData() {
        return this.http.get<any>(this.eBillUrl + 'Allotment/getMemoForSanction');
    }

    deleteAllotments(payload: any) {
        return this.http.request('delete', this.eBillUrl + 'Allotment', { body: payload });
    }
    deleteListingData() {
        return this.http.request('delete', this.eBillUrl + 'Allotment');
    }
    getAllSanctionedData() {
        return this.http.get<any>(this.eBillUrl + 'Allotment/getAllSanctionData');
    }

    getFromHoaReAppropriateData() {
        return this.http.get<any>(this.eBillUrl + 'Allotment/fromHoaReappropriation');
    }

    getToHoaReAppropriateData(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'Allotment/toHoaReappropriation', payload);
    }

    submitReAppropriationData(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'Allotment/ReappropriationTransactionDraft', payload);
    }

    getReAppropriationDataForModify() {
        return this.http.get<any>(this.eBillUrl + 'Allotment/getReappropriationForModifyData');
    }

    submitReAppropriationDataForModify(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'Allotment/ReappropriationModify', payload);
    }

    approveReAppropriation(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'Allotment/ReappropriationTransaction', payload);
    }

    getSurrenderData() {
        return this.http.get<any>(this.eBillUrl + 'Allotment/getSurrenderAllotmentData');
    }

    saveSurrender(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'Allotment/SurrenderTransaction', payload);
    }

    // E-Pradan API

    create(url: string, payload: any): Observable<any> {
        return this.http.post<{ msg: string }>(url, payload);
    }

    getById(url: string): Observable<any> {
        return this.http.get<{ msg: string }>(url);
    }

    getAll(url: string, payload: any): Observable<any> {
        return this.http.post<{ msg: string }>(url, payload);
    }

    getBankName(url: string): Observable<any> {
        return this.http.get<{ msg: string }>(url);
    }

    Approved(url: string, payload: any): Observable<any> {
        return this.http.post<{ msg: string }>(url, payload);
    }

    Inactive(url: string, payload: any): Observable<any> {
        return this.http.post<{ msg: string }>(url, payload);
    }

    // public exportToExcel(data: any, fileName: any): void {
    //     this.exportAsExcelFile(data, fileName + '-' + Date().valueOf() + '.xlsx');
    // }

    // public exportAsExcelFile(json: any[], excelFileName: string): void {
    //     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    //     const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    //     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //     this.saveAsExcelFile(excelBuffer, excelFileName);
    // }

    // private saveAsExcelFile(buffer: any, fileName: string): void {
    //     const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    //     const url = window.URL.createObjectURL(data);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = fileName;
    //     link.click();
    // }

    validation(pattern, min, max, optional, option): any {
        const index = pattern;

        switch (index) {
            case 'Required':
                return ['', Validators.required];

            case 'Not Required':
                return ['', Validators.compose([Validators.minLength(min), Validators.maxLength(max)])];

            case 'Email':
                return ['', Validators.compose([Validators.required, Validators.email])];

            case 'null':
                return [null];

            case 'Not Required with Pattern':
                return ['', Validators.compose([Validators.pattern(optional), Validators.minLength(min), Validators.maxLength(max)])];

            case 'Not Required with zero':
                return [0, Validators.compose([Validators.pattern(optional), Validators.minLength(min), Validators.maxLength(max)])];

            case 'Required Digit':
                return ['', [Validators.required, Validators.pattern(/^\d{10}$/)]];

            case 'Not Required Digit':
                return ['', [Validators.pattern(/^[0-9]*$/)]];
            case 'No Special Character Allowed':
                return ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])];

            case 'Disable':
                return [{ value: '', disabled: true }, [Validators.required]];

            default:
                // tslint:disable-next-line:max-line-length
                return ['', Validators.compose([Validators.required, Validators.pattern(pattern), Validators.minLength(min), Validators.maxLength(max)])];
        }
    }

    // post api for tr21 extended form tr button form//
    saveTR21Extendform(payload: BillDetailsOfTR21_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR21/BillDetailsOfTR21', payload);
    }
    // post api for tr35 extended form tr button form//
    saveTR35Extendform(payload: BillDetailsOftr35_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR35/BillDetailsOfTR35', payload);
    }
    // post api for for giss and claimfor external++++++++++++++++++
    saveGissorClaimfor(payload: GissClaimForModel) {
        return this.http.post<any>(this.eBillUrl + 'BillDetails/EmployeeDetailsWithClaimFor', payload);
    }
    // post api for tr37 extended form tr button form//
    saveTR37Extendform(payload: BillDetailsOftr37_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR37/BillDetailsOfTR37', payload);
    }
    // post api for tr50 extended form tr button form//
    saveTR50Extendform(payload: BillDetailsOftr50_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR50/BillDetailsOfTR50', payload);
    }
    // post api for tr60 extended form tr button form//
    saveTR60Extendform(payload: BillDetailsOftr60_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR60/BillDetailsOfTR60', payload);
    }
    // post api for tr61 extended form tr button form//
    saveTR61Extendform(payload: BillDetailsOftr61_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR61/BillDetailsOfTR61', payload);
    }
    // post api for tr73 extended form tr button form//
    saveTR73Extendform(payload: BillDetailsOftr73_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR73/BillDetailTR73', payload);
    }
    // post api for tr26 extended form tr button form//
    saveTR26Extendform(payload: DynamicTrModel) {
        return this.http.post<any>(this.eBillUrl + 'Tr/SaveTRDetail', payload);
    }
    // post api for tr31 extended form tr button form//
    saveTR31Extendform(payload: BillDetailsOftr31_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR31/BillDetailsOfTR31', payload);
    }
    // post api for tr33 extended form tr button form//
    saveTR33Extendform(payload: BillDetailsOftr33_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR26/BillDetailTR26', payload);
    }
    // post api for tr31A extended form tr button form//
    saveTR31AExtendform(payload: BillDetailsOftr31A_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR31a/BillDetailsOfTR31a', payload);
    }
    saveTR43Extendform(payload: BillDetailsOftr43_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR43/BillDetailTR43', payload);
    }
    // post api for tr51 extended form tr button form//
    saveTR51Extendform(payload: BillDetailsOftr51_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR51/BillDetailsOfTR51', payload);
    }
    // post api for tr68B extended form tr button form//
    saveTR68BExtendform(payload: BillDetailsOftr68B_Model) {
        return this.http.post<any>(this.eBillUrl + 'Tr68b/BillDetailsOfTR68b', payload);
    }
    // post api for tr36extended form tr button form//
    saveTR34Extendform(payload: BillDetailsOftr34_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR34/BillDetailsOfTR34', payload);
    }
    // post api for tr34extended form tr button form//
    saveTR36Extendform(payload: BillDetailsOftr36_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR36/BillDetailsOfTR36', payload);
    }
    // post api for tr36Aextended form tr button form//
    saveTR36AExtendform(payload: BillDetailsOftr36A_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR36a/BillDetailsOfTR36a', payload);
    }
    // post api for tr68extended form tr button form//
    saveTR68Extendform(payload: BillDetailsOftr68_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR68/BillDetailsOfTR68', payload);
    }
    // post api for tr68C extended form tr button form//
    saveTR68CExtendform(payload: BillDetailsOftr68C_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR68c/BillDetailsOfTR68c', payload);
    }
    // post api for tr70C extended form tr button form//
    saveTR70CExtendform(payload: BillDetailsOftr70C_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR70c/BillDetailsOfTR70c', payload);
    }

    //post api for addCertificate form tr button form//
    postAddCertificate(payload: CertificateDescObject_Model[]) {
        return this.http.post<any>(this.eBillUrl + 'AddCertificate/CertificateDetails', payload);
    }
    //post api for bankDetails form tr button form//
    postEcsNeft(payload: BankDetailsModel[]) {
        return this.http.post<any>(this.eBillUrl + 'Ecs/NeftDetails?billid=' + payload[0].billId, payload);
    }
    //Get api for beneficaryname of searching bankdetails in (ECs/neft)
    getECSneft(userName: string) {
        return this.http.get(this.ePradanUrl + 'BeneficiaryMaster/GetAllBeneficiaryDetailsByName?beneficiaryName=' + userName).pipe(catchError(this.handleError));
    }
    get42TrDetails(billId: string) {
        return this.http.get<any>(this.eBillUrl + 'TR42/TR42BillDetailByBillId?billId=' + billId);
    }
    get35TrDetails(billId: string) {
        return this.http.get<any>(this.eBillUrl + 'TR35/TR35BillDetailByBillId?billId=' + billId);
    }

    // e-Paradan APIs

    getBenificiaryList(payload: any) {
        return this.http.post<any>(this.ePradanUrl + 'Eps/BeneficiarySearch', payload);
    }

    // getBankNameList(){
    //     return this.http.get<any>(this.ePradanUrl+'Eps/BankNames')            **************** This API is not used anymore. ****************
    // }

    getIfscByIfscPrefix(prefix: string) {
        return this.http.get<any>(this.ePradanUrl + 'Eps/Ifscs?input=' + prefix);
    }

    getBankByIfsc(ifsc: string) {
        return this.http.get<any>(this.ePradanUrl + 'Eps/BankByIfsc?ifsc=' + ifsc);
    }

    insertBenificiary(payload: any) {
        return this.http.post<any>(this.ePradanUrl + 'Eps/BeneficiaryEntry', payload);
    }
    // post api for tr24 extended form tr button form//
    saveTR24Extendform(payload: BillDetailsOftr24_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR24/BillDetailsOfTR24', payload);
    }
    // post api for tr27 extended form tr button form//
    saveTR27Extendform(payload: DynamicTrModel) {
        return this.http.post<any>(this.eBillUrl + 'Tr/SaveTRDetail', payload);
    }
    // post api for CPIN ENTRY submit form//
    submitCPINentry(payload: CPIN_Model) {
        return this.http.post<any>(this.eBillUrl + 'Cpin/Cpin', payload);
    }
    saveTr42ExtendForm(payload: BillDetailsOftr42_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR42/BillDetailsOfTR42', payload);
    }
    saveTr28ExtendForm(payload: BillDetailsOftr28_Model) {
        return this.http.post<any>(this.eBillUrl + 'TR28/BillDetailTR28', payload);
    }
    // Post Api for Save Cheque Bill
    // submitCheque_Bill(payload: ChequeBill_Model[]) {
    //     return this.http.post<any>(this.eBillUrl + 'ChequeDetails/ChequeDetails', payload);
    // }
    getFailedBenList() {
        return this.http.get<any>(this.ePradanUrl + 'Eps/BeneficiaryFailedList');
    }

    insertBenificiaryInBulk(fileNmae: any, payload: any) {
        return this.http.post<any>(this.ePradanUrl + 'Eps/BulkBeneficiaryEntry?filename=' + fileNmae, payload);
    }
    // Voucher Details+++++++++++++++++++++++++++++++++++++++++++++++++

    approveBenificiary(approvePayload: any) {
        return this.http.put(this.ePradanUrl + 'Eps/BeneficiaryId', approvePayload);
    }

    toogleActivation(activationPayload: any) {
        return this.http.put<any>(this.ePradanUrl + 'Eps/ActiveInactive', activationPayload);
    }

    modifyBenificiary(modifyPayload: any) {
        return this.http.put<any>(this.ePradanUrl + 'Eps/ModifyBeneficiary', modifyPayload);
    }

    saveBtDetails(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'BillBt/InsertUpdateBillBtDetail?billid=' + payload[0].billId, payload);
    }
    getVendorName() {
        return this.http.get<any>(this.eBillUrl + 'Cpin/EpVendorByPayeeType');
    }
    //For Every extended part Treasury Code
    getTeasuryCode() {
        return this.http.get<any>(this.eBillUrl + 'Department/Treasury');
    }
    //For Every extended part DDO Code
    getDDOcode(treasuryCODE: string) {
        return this.http.get<any>(this.eBillUrl + 'Ddo/DdoCodeList?treasurycode=' + treasuryCODE);
    }

    getEmployeeList(input: string) {
        return this.http.get<any>(this.eBillUrl + 'EmployeeList/EmployeeListByEmployeeName/?input=' + input);
    }

    // For Modify of Forms++++++++++++++++++++++++++++++++++++
    getAddCertificate(refeNo: string) {
        return this.http.get<any>(this.eBillUrl + 'AddCertificate/CertificateDetailsList' + refeNo);
    }

    // Delete Draft/Submitted Bills
    deleteBills(billId: string) {
        return this.http.get<any>(this.eBillUrl + 'BillDetails/DeleteBills?billId=' + billId)
    }

    getTR43billdetails(billId: string) {
        return this.http.get<any>(this.eBillUrl + 'TR43/TR43BillDetailByBillId?billId=' + billId)
    }

    get34ExtendedBill(billId: string) {
        return this.http.get<any>(this.eBillUrl + 'TR34BillDetailByBillId?billId' + billId)
    }
    get24ExtendedBill(billId: string) {
        return this.http.get<any>(this.eBillUrl + 'TR24BillDetailByBillId?billId' + billId)
    }
    get73ExtendedBill(billId: string) {
        return this.http.get<any>(this.eBillUrl + 'TR73BillDetailByBillId?billId' + billId)
    }
    get51ExtendedBill(billId: string) {
        return this.http.get<any>(this.eBillUrl + 'TR51/TR51BillDetailByBillId?billId=' + billId)
    }
    getSanctionNoById(sanctionId: string) {
        return this.http.get<any>(this.eBillUrl + 'v1/Sanction/SanctionDetailsById?sanctionId=' + sanctionId);
    }


    get27ExtendedBilDetails(billId: any) {
        return '';
    }

    saveTR(payload: DynamicTrModel) {
        return this.http.post<any>(this.eBillUrl + 'Tr/SaveTRDetail', payload);
    }

    getAllBills(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'Bill/GetBills', payload);
    }

    getTrDetailByBilldId(billId: number) {
        return this.http.get<any>(this.eBillUrl + 'Tr/GetTrDetailById?billId=' + billId);
    }

    updateTR(payload: any) {
        return this.http.post<any>(this.eBillUrl + 'Tr/UpdateTRDetail', payload);
    }

    saveServiceProviderData(billId: number, payload: any[]) {
        return this.http.post<any>(`${this.eBillUrl}v1/AddUpdateEbServiceProviders?billId=${billId}`, payload)
    }

    getECSbillingData(billId: number) {
        return this.http.get<any>(`${this.eBillUrl}Ecs/NeftDetailsList?billId=${billId}`)
    }

    getBtBillingData(billId: number) {
        return this.http.get<any>(`${this.eBillUrl}BillBt/BtDetails?billId=${billId}`)
    }

    getActiveHoaData(payload: any) {
        return this.http.post<any>(`${this.eBillUrl}ActiveHoa`, payload)
    }
}
