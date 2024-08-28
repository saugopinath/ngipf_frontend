import { ValidatorFn, Validators } from "@angular/forms";
export interface ValidationRule {
    controlName: string,
    validations: ValidatorFn | ValidatorFn[]
}

export const trConfigObj = {
    bt_PresentsInTR: ['26', '31A', '50', '73', '33', '69'],
    gstTds_PresentsInTR: ['26', '31'],
    GemNonGem_PresentsInTR: ['26', '27', '31', '70', '70B'],
    uploadFilePresentInTR: ['26', '27', '31', '28'],
    IOSMS_PresentsInTR: [],
    claimFor_PresentsInTR: ['34', '68B', '68C', '35', '37', '73', '50', '70C', '70B', '44'],
    GISS_PresentsInTR: ['60', '61'],
    Project_Code: ['70', '70B'],
    sanction_Details: ['36', '36A', '42'],
    service_provider: ['26'],
    iFile_location: ['26'],
    specialValidations: {
        '50': [
            {
                controlName: 'claimFor',
                validations: [Validators.required]
            }
        ]
    }
};
