import { EMV, ERROR_CODE } from '../../constants';
import { StringUtils, response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class MerchantCity extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw response(null, ERROR_CODE.MERCHANT_CITY_TAG_REQUIRED);
        } else if (String(value).length > EMV.INVALID_LENGTH.MERCHANT_CITY) {
            throw response(null, ERROR_CODE.MERCHANT_CITY_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
