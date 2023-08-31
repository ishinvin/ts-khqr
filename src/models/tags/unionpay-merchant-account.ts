import { EMV, ERROR_CODE } from '../../constants';
import { KHQRResponse } from '../khqr-response';
import { StringUtils } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class UnionpayMerchantAccount extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value) || String(value).length > EMV.INVALID_LENGTH.UPI_MERCHANT)
            throw KHQRResponse(null, ERROR_CODE.UPI_ACCOUNT_INFORMATION_LENGTH_INVALID);

        super(tag, String(value));
    }
}
