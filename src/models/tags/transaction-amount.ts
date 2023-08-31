import { EMV, ERROR_CODE } from '../../constants';
import { KHQRResponse } from '../khqr-response';
import { StringUtils } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class TransactionAmount extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (
            StringUtils.isEmpty(value) ||
            String(value).length > EMV.INVALID_LENGTH.AMOUNT ||
            String(value).includes('-')
        ) {
            throw KHQRResponse(null, ERROR_CODE.TRANSACTION_AMOUNT_INVALID);
        }

        super(tag, String(value));
    }
}
