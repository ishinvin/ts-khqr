import { EMV, ERROR_CODE } from '../constants';
import { KHQRResponse, TagLengthString } from '../models';
import { StringUtils } from '../utils';

export class CountryCode extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw KHQRResponse(null, ERROR_CODE.COUNTRY_CODE_TAG_REQUIRED);
        } else if (String(value).length > EMV.INVALID_LENGTH.COUNTRY_CODE) {
            throw KHQRResponse(null, ERROR_CODE.COUNTRY_CODE_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
