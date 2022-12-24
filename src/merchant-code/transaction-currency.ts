import { ERROR_CODE, KHQRData } from '../constants';
import { KHQRResponse, TagLengthString } from '../models';

export class TransactionCurrency extends TagLengthString {
    constructor(tag: string, value?: number) {
        if (value === undefined || value === null) {
            throw KHQRResponse(null, ERROR_CODE.CURRENCY_TYPE_REQUIRED);
        } else if (![KHQRData.currency.khr, KHQRData.currency.usd].includes(Number(value))) {
            throw KHQRResponse(null, ERROR_CODE.UNSUPPORTED_CURRENCY);
        }

        super(tag, value);
    }
}
