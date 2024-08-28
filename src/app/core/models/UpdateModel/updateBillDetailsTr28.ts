export class UpdateBillDetailsTr28 {
    id: number;
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
