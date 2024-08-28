export enum UserType {
    Department,
    HOD,
    SAO,
    DDO,
}
export enum UserLevel {
    Department,
    HoD,
    RO,
    DO,
    SDO,
}
export enum EnumTransStatus {
    New,
    Reverted,
    Approved,
    DraftSanctioned,
    Sanctioned,
    Deleted,
}
export enum EnumSanctionType {
    Allotment,
    GrantInHead,
    Sanction,
    Withdrawl,
}
export enum EnumTransactionType {
    Release,
    Revoke,
}
export enum EnumReleaseMapType {
    HOD_to_SAO,
    HOD_to_DDO,
    SAO_to_DDO,
    SAO_to_SAO,
}
export enum EnumRevokeMapType {
    SAO_to_HOD = 4,
    DDO_to_HOD,
    SAO_to_SAO,
    DDO_to_SAO,
}
export enum BillStatus {
    Initiated_by_Approver,
    New_Bill,                                   // Bill Prepared                                        @DDO
    New_Bill_Submitted,                         // Bill ready                                           @DDO
    Review_By_Treasury,                         // Bill Review & Token Generation                       @CTS
    Bill_At_Accountant,                         // DA Checked and Forward to Accountant                 @CTS
    Bill_At_TO_or_ATO,                          // Acccounttant checked and forward to TO               @CTS
    Bill_Processed_By_TO_and_Objected,          // bill processed by to                                 @cts
    Bill_Processed_By_TO_and_Passed,            // bill processed by to                                 @cts
    Return_Memo_Sanctioned_and_Objected_Bill,   // bill avail at ddo                                    @DDO
    Nill_Bill_Statement_Generated               // not avial                                            @unknown
}

export enum PaymentModeOptions {
    Cheque,
    'ECS/NEFT',
    Both,
    NIL
}

export enum BillModeOptions {
    Individual,
    Consolidated
}

export enum gemNonGemOptions {
    'Non-Gem',
    Gem
}

export enum claimType {
    Advance,
    Reimbursement
}

export enum APIResponseStatus {
    Success = 1,
    Warning = 2,
    Error = 3
}

export enum EnumBillStatus {
    Draft = 1,
    'Draft Approver' = 2,
    'Pending For Approval' = 3,
    'Reverted By Approver' = 4,
    'Pulled Back' = 5,
    'Objected By Treasury TO_ATO' = 6,
    'Forwarded To Treasury' = 99,
    Closed = 100,
    'Initiated By Operator' = 9
}
