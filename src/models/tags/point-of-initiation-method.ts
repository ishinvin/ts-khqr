import { EMV, ERROR_CODE } from '../../constants';
import { StringUtils, response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class PointOfInitiationMethod extends TagLengthString {
    constructor(tag: string, value: string) {
        if (StringUtils.isEmpty(value) || String(value).length > 2) {
            throw response(null, ERROR_CODE.POINT_INITIATION_LENGTH_INVALID);
        }
        if (value !== EMV.STATIC_QR && value !== EMV.DYNAMIC_QR) {
            throw response(null, ERROR_CODE.POINT_OF_INITIATION_METHOD_INVALID);
        }

        super(tag, String(value));
    }
}
