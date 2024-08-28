import { baseModel } from '../baseModel';

export class BillDetailsOftr60_Model extends baseModel {
    employeeDetailsObject: EmployeeDetailObjectt_Model[] = [];
    referenceNo!: string;
}
export class EmployeeDetailObjectt_Model extends baseModel {
    employeeName!: string;
    employeeId!: string;
    designation!: string;
    typeOfCess!: string;
    dateOfCess!: string;
    sanctionId!: number;
    sanctionAuthority!: string;
    sanctionOrderNo!: string;
    sanctionDate!: string;
    savingFundIncludingInterest!: number;
}
