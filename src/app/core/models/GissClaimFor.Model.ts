import { capChar, numChar } from '../utils/types';
import { baseModel } from './baseModel';

export class GissClaimForModel extends baseModel {
    empDetailsByClaimForObject: EmpDetilByClaimForObj_Model[] = [];

}

export class EmpDetilByClaimForObj_Model extends baseModel {
    empId!: string;
    empName!: string;
    sanctionOrderNo!: string;
    empDesignation!: string;
    sanctioningAuthority!: string;
    sanctionDate!: string;
    remarks!: string;
    claimForType!: number;
    netAmount!: number;
    grossAmount!: number;
    sanctionId!: number;
    basicPay!: number;
    treasuryCode!: string;
    gpfAccountNo!: number;
    sanctionMemoNo!: number;
    cessationDate!: string;
    cessationType!: string;
    savingInterest!: number;
    gissGroup!: string;
    insuranceFund!: number;
    deductionAmt!: number;
    trMasterId!: number;
    referenceNo!: string;
}
