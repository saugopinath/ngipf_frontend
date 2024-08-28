import { baseModel } from '../baseModel';

export class BillDetailsOftr37_Model extends baseModel {
    hrmsType!: number;
    employeeeDetailObject:EmployeeDEtailObject_Model[]=[];
    referenceNo!: string;
}

export class EmployeeDEtailObject_Model extends baseModel {
    sanctionOrderNo!: string;
    employeeName!: string;
    employeeId!: string;
    designation!: string;
    sanctioningAuthority!: string;
    sanctionDate!: string;
    amount!: number;
    remarks!: string;
}
