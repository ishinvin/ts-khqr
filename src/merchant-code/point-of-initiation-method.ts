import { ERROR_CODE } from '../constants';
import { KHQRResponse, TagLengthString } from '../models';
import { StringUtils } from '../utils';

export class PointOfInitiationMethod extends TagLengthString {
    constructor(tag: string, value: string) {
        if (StringUtils.isEmpty(value) || String(value).length > 2) {
            throw KHQRResponse(null, ERROR_CODE.POINT_INITIATION_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
