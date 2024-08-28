import { capChar, numChar } from '../utils/types';
import { baseModel } from './baseModel';

export class hoa extends baseModel {
    demandNo!: string;
    majorHead!: string;
    submajorHead!: string;
    minorHead!: string;
    planStatus!: string;
    schemeHead!: string;
    detailHead!: string;
    subdetailHead!: string;
    votedCharged!: string;
}
