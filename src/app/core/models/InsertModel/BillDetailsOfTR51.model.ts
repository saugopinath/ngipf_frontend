import { baseModel } from '../baseModel';

export class BillDetailsOftr51_Model extends baseModel {
    employeeName!: string;
    uniqueId!: number;
    designation!: string;
    cadre!: string;
    cessationType!: string;
    cessationDate!: string;
    joiningGroup!: string;
    joiningYear!: string;
    groupMembershipObject: GroupMembershipObj_Model[] = [];
    operatorCode!: string;
    treasuryCode!: string;
    referenceNo!: string;

}
export class GroupMembershipObj_Model extends baseModel {
    group!: string;
    year!: string;
    isDeleted!: 0;
}
