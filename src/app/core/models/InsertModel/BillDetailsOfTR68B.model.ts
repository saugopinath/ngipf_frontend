import { baseModel } from '../baseModel';

export class BillDetailsOftr68B_Model extends baseModel {
    sanctionId!: string;
    sanctionNo!: string;
    sanctionAuthority!: string;
    sanctionDate!: string;
    hcoName!: string;
    hcoCode!: string;
    hcoAddress!: string;
    beneficiaryNo!: number;
    grossAmount!: number;
    deduction!: number;
    netAmount!: number;
    referenceNo!: string;
}
