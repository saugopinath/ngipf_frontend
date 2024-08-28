import { capChar, numChar } from '../../utils/types';
import { baseModel } from '../baseModel';

export class BillDetailsOfTR21_Model extends baseModel {
    applicationClaimNumber!: number;
    hrmsType!: number;
    billMode!: number;
    claimType!: string;
    actualExpenditure!: number;
    netClaim!: number;
    transferGrant!: string;
    packageAllowance!: number;
    referenceNo!: string;
    employeeDetailsObject!: EmployeedetailObject_Model;
    headquarterDetailsObject!: HeadQuaterObject_Model;
    detailOfJourneyObject: DetailOfJourney_Model[] = [];
    recoveryOfAdvanceDetailObject: RecoveryOfAdvDetailObj_Model[] = [];
    familyMemberObject: FamilyMemberObj_Model[] = [];
    privateConveyanceObject: privateConveyanceObject[] = [];
    dailyAllowanceObject: DailyAllowanceObject_Model[] = [];
    refundDetailObject: RefundDetailObject_Model[] = [];
}
export class EmployeedetailObject_Model extends baseModel {
    employeeName!: string;
    employeeId!: number;
    designation!: string;
    basicPay!: number;
}
export class HeadQuaterObject_Model extends baseModel {
    oldHeadquater!: string;
    newHeadquater!: string;
    headquaterDistance!: number;
    oldResidentialAddress!: string;
    newResidentialAddress!: string;
    residentialDistance!: number;

}
export class DetailOfJourney_Model extends baseModel {
    departureDatetime!: string;
    departureFrom!: string;
    arivalDatetime!: string;
    araivalFrom!: string;
    roadDistance!: number;
    travelMode!: string;
    accomodationClass!: string;
    fareNumber!: number;
    ticketNumber!: number;
    farePaid!: number;
    fareAllowedclaim!: number;
    entitledClass!: string;
    entitledClassFare!: number;
}
export class RecoveryOfAdvDetailObj_Model extends baseModel {
    treasuryCode!: string;
    ddoCode!: string;
    tvDate!: string;
    tvNo!: string;
    amount!: number;
    ownContribution!: string;
}
export class FamilyMemberObj_Model extends baseModel {
    name!: string;
    age!: number;
    relationship!: string;
}
export class privateConveyanceObject extends baseModel {
    description!: string;
    stationFrom!: string;
    stationTo!: string;
    distance!: number;
    entitledRate!: string;
    entitledAmount!: number;
    actualPaidAmount!: number;
    approvedAmount!: number;
}
export class DailyAllowanceObject_Model extends baseModel {
    days!: number;
    rate!: number;
    percentage!: number;
    noOfPerson!: number;
    amount!: number;
}
export class RefundDetailObject_Model extends baseModel {
    treasuryCode!: string;
    refundDate!: string;
    challanNumber!: number;
    refundAmount!: number;
}

