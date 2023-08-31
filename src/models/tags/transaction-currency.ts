import { ERROR_CODE, CURRENCY } from '../../constants';
import { response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export class TransactionCurrency extends TagLengthString {
    constructor(tag: string, value?: string) {
        if (value === undefined || value === null) {
            throw response(null, ERROR_CODE.CURRENCY_TYPE_REQUIRED);
        } else if (!Object.keys(CURRENCY).includes(String(value))) {
            throw response(null, ERROR_CODE.UNSUPPORTED_CURRENCY);
        }

        super(tag, value);
    }
}
