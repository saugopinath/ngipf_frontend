import { baseModel } from '../baseModel';

export class BillDetailsOftr61_Model extends baseModel {
    employeeDetailsObject: EmployeeDetailOBJECT_Model[] = [];
    referenceNo!: string;
}
export class EmployeeDetailOBJECT_Model extends baseModel {
    employeeName!: string;
    employeeId!: number;
    designation!: string;
    typeOfCess!: string;
    dateOfCess!: string;
    sanctionId!: number;
    sanctionAuthority!: string;
    sanctionOrderNo!: string;
    sanctionDate!: string;
    gissGroup!: string;
    insuranceAmount!: number;
}
