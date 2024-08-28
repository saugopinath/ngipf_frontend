import { baseModel } from '../baseModel';

export class BillDetailsOftr31_Model extends baseModel {
    periodFromDate!: string;
    periodToDate!: string;
    purpose!: string;
    plTransferObject: PlTransferObj_Model[] = [];
    netTransferObject: NetTransferObj_Model[] = [];
    referenceNo!: string;
}
export class PlTransferObj_Model extends baseModel {
    treasuryCode!: string;
    operatorCode!: string;
    operatorName!: string;
    schemeId!: string;
    schemeDescription!: string;
    receivedAmount!: number;
}

export class NetTransferObj_Model extends baseModel {
    recepientofGrant!: string;
    receivedAmount!: number;
}
