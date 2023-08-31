import { EMV, ERROR_CODE } from '../../constants';
import { StringUtils, response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class CountryCode extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw response(null, ERROR_CODE.COUNTRY_CODE_TAG_REQUIRED);
        } else if (String(value).length > EMV.INVALID_LENGTH.COUNTRY_CODE) {
            throw response(null, ERROR_CODE.COUNTRY_CODE_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
