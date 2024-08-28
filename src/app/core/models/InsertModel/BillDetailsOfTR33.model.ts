import { baseModel } from '../baseModel';

export class BillDetailsOftr33_Model {
    id: number;
    billId: number;
    billMode: number | null;
    trMasterId: number;
    status: number | null;
    isDeleted: number | null;
    createdByUserid: number | null;
    createdAt: Date | null;
    updatedByUserid: number | null;
    updatedAt: Date | null;
    stipendHolderClass: string;
    institutionName: string;
    stipendHolderMonth: string;
    stipendHolderYear: number;
    stipendDetailObject: string | null;
    previousBillCopy: string;
    public constructor(init?: Partial<BillDetailsOftr33_Model>) {
        Object.assign(this, init);
    }
}
