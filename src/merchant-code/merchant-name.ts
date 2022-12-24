import { EMV, ERROR_CODE } from '../constants';
import { KHQRResponse, TagLengthString } from '../models';
import { StringUtils } from '../utils';

export class MerchantName extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw KHQRResponse(null, ERROR_CODE.MERCHANT_NAME_REQUIRED);
        } else if (String(value).length > EMV.INVALID_LENGTH.MERCHANT_NAME) {
            throw KHQRResponse(null, ERROR_CODE.MERCHANT_NAME_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
