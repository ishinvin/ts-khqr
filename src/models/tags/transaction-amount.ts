import { EMV, ERROR_CODE } from '../../constants';
import { StringUtils, response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class TransactionAmount extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (
            StringUtils.isEmpty(value) ||
            String(value).length > EMV.INVALID_LENGTH.AMOUNT ||
            String(value).includes('-')
        ) {
            throw response(null, ERROR_CODE.TRANSACTION_AMOUNT_INVALID);
        }

        super(tag, String(value));
    }
}
