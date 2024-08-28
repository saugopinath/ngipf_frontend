import { baseModel } from '../baseModel';

export class BillDetailsOftr35_Model extends baseModel {
    challanDetailObject: ChallanObject_Model[] = [];

    referenceNo!: string;
}
export class ChallanObject_Model extends baseModel {
    treasuryCode!: string;
    challanDate!: string;
    challanNo!: string;
    grossAmount!: number;
    hoa!: string;
    openingBalance!: number;
    nameCredited!: string;
    purpose!: string;
}
