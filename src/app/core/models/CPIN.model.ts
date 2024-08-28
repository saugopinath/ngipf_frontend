import { baseModel } from './baseModel';

export class CPIN_Model extends baseModel {

  cpinId!: string;
  cpinAmount!: number;
  cpinDate!: string;
  cpinType!: number;
  cpinSubType!: number;
  epsId!: number;
  vendorData:VendorData_Model[] = [];
}
export class VendorData_Model extends baseModel {
    vendorName!: string;
    vendorGstIn!: string;
    invoiceNo!: string;
    invoiceDate!: string;
    invoiceValue!: number;
    amountPart1!: number;
    amountPart2!: number;
    total!: number;
}
