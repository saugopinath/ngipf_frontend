import { baseModel } from '../baseModel';

export class BillDetailsOftr70C_Model extends baseModel {
    beforeAfterdate!: number;
    referenceNo!: string;
    projectName!: string;
    contractorDetailsObject:ContractorDetailsObj_Model[] = [];
    detailsBeforeObject!: DetailBeforeObj_Model;
    chalanDetailsObject:ChallanDetailObj_Model[] = [];
}
export class ContractorDetailsObj_Model extends baseModel {
    contractorName!: string;
}
export class DetailBeforeObj_Model extends baseModel {
    operatorCode!: string;
    totalDepositedAmount!: number;
    hoa!: string;
    amountDeductedInclThisBill!: number;
    balance!: number;
}
export class ChallanDetailObj_Model extends baseModel {
    treasuryCode!: string;
    challanDate!: string;
    challanNo!: string;
    challanAmount!: number;
    hoa!: string;
    nameOfDepositor!: string;
    amountDeductedInclBill!: number;
    challanBalance!: number;
    netPayable!: number;
}
