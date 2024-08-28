import { baseModel } from '../baseModel';

export class BillDetailsOftr43_Model extends baseModel {
    fromDate!: string;
    toDate!: string;
    purpose!: string;
    referenceNo!: string;
    plTransferRecipientDetailObject: PlTransferRecipt_Model[] = [];
}
export class PlTransferRecipt_Model extends baseModel {
    treasuryCode!: string;
    operatorName!: string;
    operatorCode!: string;
    hoa!: string;
    schemeID!: string;
    schemeDesc!: string;
    nameOfGranteeInstitution!: string;
    amount!: number;
}
