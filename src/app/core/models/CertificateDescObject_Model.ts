import { capChar, numChar } from '../utils/types';
import { baseModel } from './baseModel';

export class CertificateDescObject_Model extends baseModel {
    TrMasterId!: number;
    BillId!: number;
    certificateDesc!: string;
    isActiveflag!: number;
    referenceNo!: string;
}
