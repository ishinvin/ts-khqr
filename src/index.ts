import { EMV, ERROR_CODE } from './constants';
import { QRPayload, generateQR } from './generate';
import { parseQR } from './parser';
import { type ReturnType, type ParserType, type ResponseResult, crc16, response, StringUtils } from './utils';
import { verifyQR } from './verify';

export { CURRENCY, TAG, COUNTRY } from './constants';
export type { ReturnType, QRPayload, ParserType, ResponseResult };
export class KHQR {
    static generate(payload: QRPayload): ReturnType<ResponseResult | null> {
        return generateQR(payload);
    }

    static verify(qrString: string): { isValid: boolean } {
        return { isValid: KHQR.verifyDetail(qrString).status.code === 0 };
    }

    static verifyDetail(qrString: string): ReturnType<{ isValid: boolean }> {
        const crcRegExp = /6304[A-Fa-f0-9]{4}$/;
        if (!crcRegExp.test(qrString)) {
            return response({ isValid: false }, ERROR_CODE.KHQR_INVALID);
        }

        const crc = qrString.slice(-4);
        const KHQRNoCrc = qrString.slice(0, -4);
        const validCRC = crc16(KHQRNoCrc) === crc.toUpperCase();

        try {
            if (!validCRC || qrString.length < EMV.INVALID_LENGTH.KHQR) {
                throw response(null, ERROR_CODE.KHQR_INVALID);
            }
            verifyQR(qrString);
            return response({ isValid: true });
        } catch (error) {
            const status = (error as ReturnType<null> | undefined)?.status;
            if (status?.errorCode != null && status.message != null) {
                return response({ isValid: false }, { code: status.errorCode, message: status.message });
            }
            return response({ isValid: false }, ERROR_CODE.KHQR_INVALID);
        }
    }

    static parse(qrString: string): ReturnType<ParserType | null> {
        if (StringUtils.isEmpty(qrString)) {
            return response(null, ERROR_CODE.KHQR_INVALID);
        }
        return response(parseQR(qrString));
    }
}
