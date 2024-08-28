export class UpdateDetailsModel {
    billId: number;
    paymentMode: number;
    grossAmount: number;
    netAmount: number;
    btAmount: number;
    sanctionNo: number;
    sanctionAmt: number;
    sanctionDate: string;
    sanctionBy: string;
    remarks: string;
    isGem: boolean;
    // updatedByUserid: number;
    getBillSubdetailInfos: BillSubdetailInfo[] = [];
}

export class BillSubdetailInfo {
    subDetailHead: string;
    amount: number;
}
