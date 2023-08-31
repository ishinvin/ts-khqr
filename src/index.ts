import { KHQRPayload, generateQR } from './generate';
import type { ReturnType, ParserType } from './utils';

export { CURRENCY, TAG } from './constants';
export type { ReturnType, KHQRPayload, ParserType };

export class KHQR {
    static generate(payload: KHQRPayload): ReturnType {
        return generateQR(payload);
    }

    // static verify(KHQRString: string): { isValid: boolean } {
    //     // Check CRC
    //     const crcRegExp = /6304[A-Fa-f0-9]{4}$/;
    //     if (!crcRegExp.test(KHQRString)) {
    //         return { isValid: false };
    //     }

    //     const crc = KHQRString.slice(-4);
    //     const KHQRNoCrc = KHQRString.slice(0, -4);
    //     const validCRC = crc16(KHQRNoCrc) === crc.toUpperCase();

    //     try {
    //         if (!validCRC || KHQRString.length < EMV.INVALID_LENGTH.KHQR) {
    //             throw KHQRResponse(null, ERROR_CODE.KHQR_INVALID);
    //         }
    //         verify(KHQRString);

    //         return { isValid: true };
    //     } catch (error) {
    //         return { isValid: false };
    //     }
    // }

    /**
     * Decode KHQR
     * @param KHQRString
     * @returns
     */
    // static decode(KHQRString: string): KHQRResponseType<KHQRDecodeType | null> {
    //     if (StringUtils.isEmpty(KHQRString)) {
    //         return KHQRResponse(null, ERROR_CODE.KHQR_INVALID);
    //     }
    //     return KHQRResponse(decode(KHQRString));
    // }
}
