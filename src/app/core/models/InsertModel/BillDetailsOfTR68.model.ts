import { baseModel } from '../baseModel';

export class BillDetailsOftr68_Model extends baseModel {
    claimType!: string;
    employeeDetailsObject!: EmployeeDetailObj_Model;
    advanceVoucherDetailsObject: AdvanceVoucherDetailsObj_Model[] = [];
    treatmentType!: string;
    dateOfAdmission!: string;
    dateOfDischarge!: string;
    opdFirstDate!: string;
    opdLastDate!: string;
    diseaseDetailsObject: DieaseDetailObj_Model[] = [];
    medicalChargesRefundedObject!: MedicalChargesRefundedObj_Model;
    hospitalizationDetailObject: HospitalizationDetailObj_Model[] = [];
    cashlessTreatmentSchemeAmount!: number;
    cashlessTreatmentSchemeNetAmount!: number;
    medicalInsurancePolicyAmount!: number;
    nonEmpanelledHcoAmount!: number;
    deductionPercentageNonEmpanelledHco!: number;
    checkDeductionCashlessTreatment!: number;
    checkClaimMedicalInsurancePolicy!: number;
    checkDeductionNonEmpanelledHco!: number;
    refundChallanDetailsObject: RefundChallanDetailObj_Model[] = [];
    advanceDetailsObject!: AdvanceDetailObj_Model;
    referenceNo!: string;
}
export class EmployeeDetailObj_Model extends baseModel {
    employeeName!: string;
    employeeId!: string;
    employeeType!: string;
    wbhsIDOfEmployee!: string;
    treatmentFor!: string;
    wbhsIDOfBeneficiary!: string;
    beneficiaryName!: string;
}
export class AdvanceVoucherDetailsObj_Model extends baseModel {
    treasuryCode!: string;
    ddoCode!: string;
    voucherDate!: string;
    voucherNumber!: number;
    voucherAmount!: number;
}
export class DieaseDetailObj_Model extends baseModel {
    diseaseCode!: string;
    diseaseName!: string;
    maxAppliesRate!: number;
    totalAdmissibleAmount!: number;
}
export class MedicalChargesRefundedObj_Model extends baseModel {
    establishmentSection!: string;
    incubmentName!: string;
    designation!: string;
    period!: string;
    amount!: number;
}
export class HospitalizationDetailObj_Model extends baseModel {
    hospitalCenterCode!: string;
    hospitalCenterName!: string;
    hospitalCenterAddress!: string;
    type!: string;
    amount!: number;
}
export class RefundChallanDetailObj_Model extends baseModel {
    treasuryCode!: string;
    refundChallanDate!: string;
    refundChallanNo!: string;
    amount!: number;
}
export class AdvanceDetailObj_Model extends baseModel {
    estimatedMedicalCost!: number;
    estimateAdvance!: number;
    admissableAmtt!: number;
    sanctionedAmt!: number;
}
