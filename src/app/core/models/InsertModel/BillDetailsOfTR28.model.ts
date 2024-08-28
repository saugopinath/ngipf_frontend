// import { baseModel } from '../baseModel';

// export class BillDetailsOftr28_Model extends baseModel {
//     billId!: number;
//     treasuryCode!: string;
//     challanDate!: string;
//     challanNo!: string;
//     amount!: number;
//     advanceDetailObject: AdvanceDetailsObj_Model[] = [];
//     adjustmentDetailObject: AdjustmentDetailObj_Model[] = [];
//     refundChallanDetailObject: RefundChallanDetailObj[] = [];
//     disallowanceRefundDetails!: DisAllowanceRefundDetailObj_Model;
//     referenceNo!: string;
// }
// export class AdvanceDetailsObj_Model extends baseModel {
//     treasuryCode!: string;
//     ddoCode!: string;
//     tvDate!: string;
//     tvNo!: number;
//     tokenNo!: string;
//     tokenDate!: string;//not need
//     trFormNo!: number;//not need
//     amount!: number;
//     projectCode!: string;//not needed
//     projectName!: string;//notneeded
// }

// export class AdjustmentDetailObj_Model extends baseModel {
//     subVoucherNo!: string;
//     subVoucherDate!: string;
//     description!: string;
//     amount!: number;
// }
// export class RefundChallanDetailObj extends baseModel {
//     treasuryCode!: string;
//     refundChallanDate!: string;
//     refundChallanNo!: string;
//     amount!: number;
// }
// export class DisAllowanceRefundDetailObj_Model extends baseModel {
//     treasuryCode!: string;
//     challanDate!: string;
//     challanNumber!: string;
//     amount!: number;
// }

export class BillDetailsOftr28_Model {
    billId: number;
    billMode?: number | null;
    trMasterId: number;
    status?: number | null;
    isDeleted?: number | null;
    advanceDetailObject?: string | null;
    adjustmentDetailObject?: string | null;
    treasuryCode: string;
    challanDate?: string | null;
    challanNo?: string | null;
    amount: number;
    refundChallanDetailObject?: string | null;
    disallowanceRefundDetails?: string | null;
}
