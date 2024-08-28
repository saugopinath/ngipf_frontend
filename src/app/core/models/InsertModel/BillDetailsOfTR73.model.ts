import { baseModel } from '../baseModel';

export class BillDetailsOftr73_Model extends baseModel {
    hrmsType!: number;
    employeeDetailsObject: EmployeeDetailsObject_Model[] = [];
    referenceNo!: string;
}
export class EmployeeDetailsObject_Model extends baseModel {
    sanctionId!: number;
    employeeName!: string;
    employeeId!: string;
    sanctionNo!: string;
    sanctionDate!: string;
    sanctioningAuthority!: string;
    sanctionAmount!: number;
    netAmount!: number;
    deductedAmount!: number;
    grossAmount!: number;
}
