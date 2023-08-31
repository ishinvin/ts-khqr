import { ERROR_CODE } from '../../constants';
import { KHQRResponse } from '../khqr-response';
import { StringUtils } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class PayloadFormatIndicator extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw KHQRResponse(null, ERROR_CODE.PAYLOAD_FORMAT_INDICATOR_TAG_REQUIRED);
        } else if (String(value).length > 2) {
            throw KHQRResponse(null, ERROR_CODE.PAYLOAD_FORMAT_INDICATOR_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
