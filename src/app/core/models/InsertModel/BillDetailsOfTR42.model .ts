import { baseModel } from '../baseModel';

export class BillDetailsOftr42_Model extends baseModel {
    challanDetailsObject: ChallanDetailObj_Model[] = [];
    referenceNo!: string;
}
export class ChallanDetailObj_Model extends baseModel {
    treasuryCode!: string;
    challanDate!: string;
    challanNumber!: string;
    hoa!: string;
    grossAmount!: number;
    openingBalance!: number;
}
