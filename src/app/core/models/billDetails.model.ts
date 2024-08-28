import { capChar, numChar } from '../utils/types';
import { baseModel } from './baseModel';

export class BillDetailsModel extends baseModel {
    billId!: number;
    paymentMode!: number;
    trMasterId!: number;
    billNo!: string;
    billDate!: string;
    billMode!: number;
    demand!: `${numChar}${numChar}`;
    majorHead!: `${numChar}${numChar}${numChar}${numChar}`;
    subMajorHead!: `${numChar}${numChar}`;
    minorHead!: `${numChar}${numChar}${numChar}`;
    planStatus!: `${numChar}${numChar}`;
    schemeHead!: `${numChar}${numChar}${numChar}`;
    detailHead!: `${numChar}${numChar}`;
    votedCharged!: 'V' | 'C';
    grossAmount!: number;
    netAmount!: number;
    btAmount!: number;
    deptCode!: `${capChar}${capChar}`;
    sanctionNo!: number;
    sanctionAmt!: number;
    sanctionDate!: string;
    sanctionBy!: string;
    gemNonGem!: boolean;
    status!: number;
    createdByUserid!: number;
    updatedByUserid!: number;
    updatedAt!: string;
    pendingWithUser!: string;
    remarks!: string;
    referenceNo!: string;
    getBillSubdetailInfos: billSubdetailInfosModel[] = [];
    actionType!: number;
    actionTakenUserId!: number;
    actionTakenAuthorityCode!: string;
    actionTakenAt!: string;
}

export class billSubdetailInfosModel extends baseModel {
    subDetailHead!: string;
    amount!: number;
}
