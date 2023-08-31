import { ERROR_CODE } from '../../constants';
import { StringUtils, response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class PayloadFormatIndicator extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw response(null, ERROR_CODE.PAYLOAD_FORMAT_INDICATOR_TAG_REQUIRED);
        } else if (String(value).length > 2) {
            throw response(null, ERROR_CODE.PAYLOAD_FORMAT_INDICATOR_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
