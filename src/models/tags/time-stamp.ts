import { EMV, ERROR_CODE } from '../../constants';
import { response } from '../../utils';
import { TagLengthString } from './base/tag-length-string';

export type TimeStampParams = {
    creationTimestamp: number;
    expirationTimestamp: number;
};

export class TimeStamp extends TagLengthString {
    constructor(tag: string, timestamp: TimeStampParams, poi?: String) {
        const creationTimestamp = Number(timestamp?.creationTimestamp);
        const expirationTimestamp = Number(timestamp?.expirationTimestamp);

        if (poi === EMV.DYNAMIC_QR) {
            if (!timestamp || !expirationTimestamp) {
                throw response(null, ERROR_CODE.EXPIRATION_TIMESTAMP_REQUIRED);
            }

            if (String(expirationTimestamp).length !== EMV.INVALID_LENGTH.TIMESTAMP) {
                throw response(null, ERROR_CODE.EXPIRATION_TIMESTAMP_LENGTH_INVALID);
            }

            if (isNaN(new Date(expirationTimestamp).getTime())) {
                throw response(null, ERROR_CODE.INVALID_DYNAMIC_KHQR);
            }

            if (expirationTimestamp < creationTimestamp) {
                throw response(null, ERROR_CODE.EXPIRATION_TIMESTAMP_IN_THE_PAST);
            }

            if (expirationTimestamp < Date.now()) {
                throw response(null, ERROR_CODE.KHQR_EXPIRED);
            }
        }

        let timestampString = '';
        const createdTimestamp = new TimeStampMiliSecond(EMV.CREATION_TIMESTAMP, creationTimestamp);
        timestampString += createdTimestamp.toString();

        const expiredTimestamp = new TimeStampMiliSecond(EMV.EXPIRATION_TIMESTAMP, expirationTimestamp);
        timestampString += expiredTimestamp.toString();

        super(tag, timestampString);
    }
}

class TimeStampMiliSecond extends TagLengthString {
    constructor(tag: string, value: number) {
        super(tag, value);
    }
}
