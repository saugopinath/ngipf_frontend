// import { baseModel } from './baseModel';

// export class BillDetailsOftr24_Model extends baseModel {
//     claimType!: number;
//     employeeDetailsObject!: EmployeeDetail_Model;
//     medicalChargeObject!: medicalChargesRefunded_Model;
//     challanDetailsObject:Challandetail_Model[]=[];
//     recoveryAdvanceObject:RecoveryAdvance_Model[]=[];
//     referenceNo!: string;
// }
// export class EmployeeDetail_Model extends baseModel {
//     employeeName!: string;
//     employeeId!: number;
//     designation!: string;
//     grossClaim!: number;
//     recoveryOfAdvance!: string;
//     refund!: number;
//     netClaim!: number;
//     remarks!: string;
// }
// export class medicalChargesRefunded_Model extends baseModel {
//     establishmentSection!: string;
//     incumbentName!: string;
//     designation!: string;
//     period!: number;
//     amount!: number;
// }
// export class Challandetail_Model extends baseModel {
//     treasuryCode!: string;
//     refundChallanDate!: string;
//     refundChallanNo!: string;
//     amount!: number;
// }
// export class RecoveryAdvance_Model extends baseModel{
//     treasuryCode!: string;
//     ddoCode!: string;
//     tvDate!: string;
//     tokenNumber!: string;
//     tokenDate!: string;
//     tvNumber!: string;
//     billNumber!: string;
//     billDate!: string;
//     amount!: number;
// }

export class BillDetailsOftr24_Model {
    BillId: number;
    BillMode: number | null;
    TrMasterId: number;
    Status: number | null;
    IsDeleted: number | null;
    ClaimType: number;
    MedicalChargeObject: string | null;
    RecoveryAdvanceObject: string | null;
    ChallanDetailsObject: string | null;
    EmployeeDetailsObject: string | null;
}
