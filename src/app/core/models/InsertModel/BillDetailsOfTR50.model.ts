import { baseModel } from '../baseModel';

export class BillDetailsOftr50_Model extends baseModel {
    claimFor!: string;
    employeeDetailObject: EmployeeDetailObject_Model[] = [];
    salaryHoaObject!: SalaryHoaObject_Model;
    referenceNo!: string;
}
export class EmployeeDetailObject_Model extends baseModel {
    // sanctionId: number;
    // employeeName: string;
    // employeeId: string;
    // designation: string;
    // basicPayWithGradePay: number;
    // typeOfCessation: string;
    // dateOfCessation: string;
    // gpfAccountNo: number;
    // grossAmount: number;
    // netAmount: number;
    // sanctionMemoNo: number;
    // sanctionAuthority: number;
    // sanctionDate: string;
    sanctionId!: number;
    employeeName!: string;
    employeeId!: number;
    designation!: string;
    basicPayWithGradePay!: number;
    treasuryCode!: string;
    dateOfCessation!: '2023-09-26T06:14:46.747Z';
    gpfAccountNo!: number;
    grossAmount!: number;
    netAmount!: number;
    sanctionMemoNo!: number;
    sanctionAuthority!: string;
    sanctionDate!: '2023-09-26T06:14:46.747Z';
}
export class SalaryHoaObject_Model extends baseModel {
    demandNo!: string;
    majorHead!: string;
    subMajorHead!: string;
    minorHead!: string;
    subHead!: string;
    detailHead!: string;
}
