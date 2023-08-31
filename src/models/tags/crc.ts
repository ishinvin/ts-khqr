import { ERROR_CODE } from '../../constants';
import { StringUtils, response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class CRC extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw response(null, ERROR_CODE.CRC_TAG_REQUIRED);
        } else if (String(value).length > 4) {
            throw response(null, ERROR_CODE.CRC_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
