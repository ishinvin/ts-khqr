import { EMV, ERROR_CODE, KHQRData } from './constants';
import {
    IndividualInfo,
    MerchantInfo,
    KHQRResponse,
    type KHQRResponseType,
    type KHQRDataType,
    type OptionalDataType,
    type KHQRDecodeType,
} from './models';
import { crc16, StringUtils } from './utils';
import { decode, verify } from './decode';
import { generateKHQR } from './generate';
import md5 from 'md5';

export { IndividualInfo, MerchantInfo, KHQRData };
export type { KHQRResponseType, KHQRDataType, KHQRDecodeType, OptionalDataType };

export class BakongKHQR {
    /**
     * Generate Individual KHQR
     * @param info
     * @returns
     */
    generateIndividual(info: IndividualInfo): KHQRResponseType<KHQRDataType | null> {
        try {
            const khqr = generateKHQR(info as MerchantInfo, KHQRData.merchantType.individual);
            return KHQRResponse({
                qr: khqr,
                md5: md5(khqr),
            });
        } catch (error) {
            return error as KHQRResponseType<null>;
        }
    }

    /**
     * Generate Merchant KHQR
     * @param info
     * @returns
     */
    generateMerchant(info: MerchantInfo): KHQRResponseType<KHQRDataType | null> {
        try {
            const khqr = generateKHQR(info as MerchantInfo, KHQRData.merchantType.merchant);
            return KHQRResponse({
                qr: khqr,
                md5: md5(khqr),
            });
        } catch (error) {
            return error as KHQRResponseType<null>;
        }
    }

    /**
     * Verify KHQR
     * @param KHQRString
     * @returns
     */
    static verify(KHQRString: string): { isValid: boolean } {
        // Check CRC
        const crcRegExp = /6304[A-Fa-f0-9]{4}$/;
        if (!crcRegExp.test(KHQRString)) {
            return { isValid: false };
        }

        const crc = KHQRString.slice(-4);
        const KHQRNoCrc = KHQRString.slice(0, -4);
        const validCRC = crc16(KHQRNoCrc) === crc.toUpperCase();

        try {
            if (!validCRC || KHQRString.length < EMV.INVALID_LENGTH.KHQR) {
                throw KHQRResponse(null, ERROR_CODE.KHQR_INVALID);
            }
            verify(KHQRString);

            return { isValid: true };
        } catch (error) {
            return { isValid: false };
        }
    }

    /**
     * Decode KHQR
     * @param KHQRString
     * @returns
     */
    static decode(KHQRString: string): KHQRResponseType<KHQRDecodeType | null> {
        if (StringUtils.isEmpty(KHQRString)) {
            return KHQRResponse(null, ERROR_CODE.KHQR_INVALID);
        }
        return KHQRResponse(decode(KHQRString));
    }
}
