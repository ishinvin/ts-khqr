import { EMV, ERROR_CODE } from '../../constants';
import { KHQRResponse } from '../khqr-response';
import { StringUtils } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class MerchantCategoryCode extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (StringUtils.isEmpty(value)) {
            throw KHQRResponse(null, ERROR_CODE.MERCHANT_CATEGORY_TAG_REQUIRED);
        } else if (String(value).length > EMV.INVALID_LENGTH.MERCHANT_CATEGORY_CODE) {
            throw KHQRResponse(null, ERROR_CODE.MERCHANT_CODE_LENGTH_INVALID);
        }

        super(tag, String(value));
    }
}
