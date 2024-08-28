import { baseModel } from '../baseModel';

export class BillDetailsOftr36A_Model extends baseModel {
    periodFromDate!: string;
    periodToDate!: string;
    purpose!: string;
    recipientPltransferObject: RecipientPLtransferObj_Model[] = [];
    recipientNetamountObject: RecipientNetAmountObj_Model[] = [];
    referenceNo!: string;
}

export class RecipientPLtransferObj_Model extends baseModel {
    treasuryCode!: string;
    operatorCode!: string;
    operatorName!: string;
    schemeID!: string;
    schemeDesc!: string;
    receivedAmount!: number;
}
export class RecipientNetAmountObj_Model extends baseModel {
    granteeName!: string;
    receivedAmount!: number;
}
