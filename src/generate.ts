import { EMV, ERROR_CODE, TAG, CURRENCY } from './constants';
import {
    AdditionalDataParamType,
    MerchantInformationLanguageTemplateParams,
    type GlobalUniqueIdObjectType,
    PayloadFormatIndicator,
    PointOfInitiationMethod,
    UnionpayMerchantAccount,
    GlobalUniqueIdentifier,
    MerchantCategoryCode,
    TransactionCurrency,
    TransactionAmount,
    CountryCode,
    MerchantName,
    MerchantCity,
    AdditionalData,
    MerchantInformationLanguageTemplate,
    TimeStamp,
} from './models';
import { type ReturnType, type ResponseResult, StringUtils, crc16, response } from './utils';
import md5 from 'md5';

export type QRPayload = {
    // required
    tag: string;
    accountID: string;
    merchantName: string;
    merchantID?: string;
    // optional
    acquiringBank?: string;
    merchantCity?: string;
    currency?: string;
    amount?: number;
    upiMerchantAccount?: string;
    countryCode?: string;
    additionalData?: AdditionalDataParamType;
    languageData?: MerchantInformationLanguageTemplateParams;
};

export function generateQR(payload: QRPayload): ReturnType<ResponseResult | null> {
    let merchantInfo: GlobalUniqueIdObjectType;

    if (payload.tag === TAG.MERCHANT) {
        merchantInfo = {
            bakongAccountID: payload.accountID,
            merchantID: payload.merchantID,
            acquiringBank: payload.acquiringBank,
            isMerchant: true,
        };
    } else {
        merchantInfo = {
            bakongAccountID: payload.accountID,
            accountInformation: payload.merchantID,
            acquiringBank: payload.acquiringBank,
            isMerchant: false,
        };
    }

    try {
        // tag 00
        const payloadFormatIndicator = new PayloadFormatIndicator(
            EMV.PAYLOAD_FORMAT_INDICATOR,
            EMV.DEFAULT_PAYLOAD_FORMAT_INDICATOR,
        );

        // Static QR is when QR Code has no amount tag
        // in this case the amount is 0
        let QRType: string = EMV.DYNAMIC_QR;
        if (!payload.amount) {
            QRType = EMV.STATIC_QR;
        }
        // tag 01
        const pointOfInitiationMethod = new PointOfInitiationMethod(EMV.POINT_OF_INITIATION_METHOD, QRType);

        let upi;
        if (payload.upiMerchantAccount) {
            // tag 15
            upi = new UnionpayMerchantAccount(EMV.UNIONPAY_MERCHANT_ACCOUNT, payload.upiMerchantAccount);
        }
        // tag MID 26-51
        const globalUniqueIdentifier = new GlobalUniqueIdentifier(payload.tag, merchantInfo);
        // tag 52
        const merchantCategoryCode = new MerchantCategoryCode(
            EMV.MERCHANT_CATEGORY_CODE,
            EMV.DEFAULT_MERCHANT_CATEGORY_CODE,
        );

        const {
            countryCode = EMV.DEFAULT_COUNTRY_CODE,
            merchantCity = EMV.DEFAULT_MERCHANT_CITY,
            currency = CURRENCY.KHR,
            additionalData,
            languageData,
        } = payload;

        // tag 53
        const trxnCurrency = new TransactionCurrency(EMV.TRANSACTION_CURRENCY, currency);

        // Array of KHQR tags to loop and get the string of tags
        const KHQRInstances = [
            payloadFormatIndicator,
            pointOfInitiationMethod,
            upi || '',
            globalUniqueIdentifier,
            merchantCategoryCode,
            trxnCurrency,
        ];

        if (payload.amount) {
            let amountInput = String(payload.amount);

            if (currency === CURRENCY.KHR) {
                if (payload.amount % 1 === 0) {
                    amountInput = String(Math.round(payload.amount));
                } else {
                    throw response(null, ERROR_CODE.TRANSACTION_AMOUNT_INVALID);
                }
            } else {
                const amountSplit = String(payload.amount).split('.');
                const precision = amountSplit[1];
                if (precision !== undefined && precision.length > 2) {
                    throw response(null, ERROR_CODE.TRANSACTION_AMOUNT_INVALID);
                }
                if (precision !== undefined) {
                    amountInput = parseFloat(amountInput).toFixed(2);
                }
            }

            // tag 54
            KHQRInstances.push(new TransactionAmount(EMV.TRANSACTION_AMOUNT, amountInput));
        }

        // tag 58
        KHQRInstances.push(new CountryCode(EMV.COUNTRY_CODE, countryCode));
        // tag 59
        KHQRInstances.push(new MerchantName(EMV.MERCHANT_NAME, payload.merchantName));
        // tag 60
        KHQRInstances.push(new MerchantCity(EMV.MERCHANT_CITY, merchantCity));

        if (additionalData) {
            const isEmpty = Object.values(additionalData).every((el) => StringUtils.isEmpty(el));
            if (!isEmpty) {
                // tag 62
                KHQRInstances.push(new AdditionalData(EMV.ADDITIONAL_DATA_TAG, additionalData));
            }
        }

        if (languageData) {
            const isEmpty = Object.values(languageData).every((el) => StringUtils.isEmpty(el));
            if (!isEmpty) {
                // tag 64
                KHQRInstances.push(
                    new MerchantInformationLanguageTemplate(EMV.MERCHANT_INFORMATION_LANGUAGE_TEMPLATE, languageData),
                );
            }
        }

        // tag 99
        KHQRInstances.push(new TimeStamp(EMV.TIMESTAMP_TAG));

        let khqrNoCrc = '';
        KHQRInstances.forEach((item) => {
            khqrNoCrc += item.toString();
        });

        let khqr = khqrNoCrc + EMV.CRC + EMV.CRC_LENGTH;
        khqr += crc16(khqr);

        return response({
            qr: khqr,
            md5: md5(khqr),
        });
    } catch (error) {
        return error as ReturnType<null>;
    }
}
