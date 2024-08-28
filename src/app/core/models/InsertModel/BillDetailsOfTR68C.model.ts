import { baseModel } from '../baseModel';

export class BillDetailsOftr68C_Model extends baseModel {
    claimId!: string;
    sanctionNo!: string;
    sanctionDate!: string;
    sanctionAuthority!: string;
    employeePensionerName!: string;
    beneficiaryName!: string;
    treatmentNature!: string;
    hcoName!: string;
    hcoAddress!: string;
    grossAmount!: number;
    deduction!: number;
    netAmount!: number;
    referenceNo!: string;
}
