import { baseModel } from '../baseModel';

export class BillDetailsOftr34_Model extends baseModel {
    challanDetailsObject: challanDetail_Model[] = [];
    referenceNo!: string;
}
export class challanDetail_Model extends baseModel {
    treasuryCode!: string;
    challanDate!: string;
    challanNo!: string;
    grnNo!: string;
    financialYear!: string;
    grossAmount!: number;
    hoa!: string;
    openingBalance!: number;
    nameCredited!: string;
    purpose!: string;
}
