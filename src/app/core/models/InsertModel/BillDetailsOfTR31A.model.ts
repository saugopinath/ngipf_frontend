import { baseModel } from '../baseModel';

export class BillDetailsOftr31A_Model extends baseModel {
    claimId!: number;
    sanctionNo!: string;
    sanctionDate!: string;
    sanctionAuthority!: string;
    employeePensionerName!: string;
    treatmentNature!: string;
    hcoAddress!: string;
    hcoName!: string;
    grossAmount!: number;
    deduction!: number;
    netAmount!: number;
    beneficiaryName!: string;
    referenceNo!: string;
}

