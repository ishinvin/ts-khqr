import { EMV, ERROR_CODE } from '../../constants';
import { StringUtils, response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class UnionpayMerchantAccount extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.UPI_MERCHANT) {
            throw response(null, ERROR_CODE.UPI_ACCOUNT_INFORMATION_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
