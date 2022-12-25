import { EMV, ERROR_CODE, KHQRData } from './constants';
import {
    PayloadFormatIndicator,
    PointOfInitiationMethod,
    GlobalUniqueIdentifier,
    MerchantCategoryCode,
    TransactionCurrency,
    TransactionAmount,
    CountryCode,
    MerchantName,
    MerchantCity,
    AdditionalData,
    TimeStamp,
    type AdditionalDataParamType,
    type GlobalUniqueIdObjectType,
} from './merchant-code';
import { KHQRResponse, MerchantInfo } from './models';
import { crc16, StringUtils } from './utils';

/**
 * Generate KHQR helper Function
 * 1. create object of subtags elements
 * 2. create the string by passing tag and value to the instances
 * 3. calculate CRC
 * 4. return the value
 * @param information
 * @param types
 * @returns
 */
export function generateKHQR(information: MerchantInfo, types: string): string {
    let merchantInfo: GlobalUniqueIdObjectType;

    if (types === KHQRData.merchantType.merchant) {
        merchantInfo = {
            bakongAccountID: information.bakongAccountID,
            merchantID: information.merchantID,
            acquiringBank: information.acquiringBank,
            isMerchant: true,
        };
    } else {
        merchantInfo = {
            bakongAccountID: information.bakongAccountID,
            accountInformation: information.accountInformation,
            acquiringBank: information.acquiringBank,
            isMerchant: false,
        };
    }

    try {
        // Creating each tag
        const payloadFormatIndicator = new PayloadFormatIndicator(
            EMV.PAYLOAD_FORMAT_INDICATOR,
            EMV.DEFAULT_PAYLOAD_FORMAT_INDICATOR,
        );

        // Static QR is when QR Code has no amount tag
        // in this case the amount is 0
        let QRType: string = EMV.DYNAMIC_QR;
        if (!information.amount) {
            QRType = EMV.STATIC_QR;
        }
        const pointOfInitiationMethod = new PointOfInitiationMethod(EMV.POINT_OF_INITIATION_METHOD, QRType);

        // Setting tag for merchant account type
        let KHQRType: string = EMV.MERCHANT_ACCOUNT_INFORMATION_INDIVIDUAL;
        if (types === KHQRData.merchantType.merchant) {
            KHQRType = EMV.MERCHANT_ACCOUNT_INFORMATION_MERCHANT;
        }
        const globalUniqueIdentifier = new GlobalUniqueIdentifier(KHQRType, merchantInfo);

        const merchantCategoryCode = new MerchantCategoryCode(
            EMV.MERCHANT_CATEGORY_CODE,
            EMV.DEFAULT_MERCHANT_CATEGORY_CODE,
        );

        const currency = new TransactionCurrency(EMV.TRANSACTION_CURRENCY, information.currency);

        // Array of KHQR tags to loop and get the string of tags
        const KHQRInstances = [
            payloadFormatIndicator,
            pointOfInitiationMethod,
            globalUniqueIdentifier,
            merchantCategoryCode,
            currency,
        ];

        if (information.amount) {
            let amountInput = String(information.amount);

            if (Number(information.currency) === KHQRData.currency.khr) {
                if (information.amount % 1 === 0) {
                    amountInput = String(Math.round(information.amount));
                } else {
                    throw KHQRResponse(null, ERROR_CODE.TRANSACTION_AMOUNT_INVALID);
                }
            } else {
                const amountSplit = String(information.amount).split('.');
                const precision = amountSplit[1];
                if (precision !== undefined && precision.length > 2) {
                    throw KHQRResponse(null, ERROR_CODE.TRANSACTION_AMOUNT_INVALID);
                }
                if (precision !== undefined) {
                    amountInput = parseFloat(amountInput).toFixed(2);
                }
            }

            const amount = new TransactionAmount(EMV.TRANSACTION_AMOUNT, amountInput);
            KHQRInstances.push(amount);
        }

        const countryCode = new CountryCode(EMV.COUNTRY_CODE, EMV.DEFAULT_COUNTRY_CODE);
        KHQRInstances.push(countryCode);

        const merchantName = new MerchantName(EMV.MERCHANT_NAME, information.merchantName);
        KHQRInstances.push(merchantName);

        const merchantCity = new MerchantCity(EMV.MERCHANT_CITY, information.merchantCity);
        KHQRInstances.push(merchantCity);

        const additionalDataInformation: AdditionalDataParamType = {
            billNumber: information.billNumber,
            mobileNumber: information.mobileNumber,
            storeLabel: information.storeLabel,
            terminalLabel: information.terminalLabel,
        };

        const isBillNumber = !StringUtils.isEmpty(information.billNumber);
        const isMobileNumber = !StringUtils.isEmpty(information.mobileNumber);
        const isStoreLabel = !StringUtils.isEmpty(information.storeLabel);
        const isTerminalLabel = !StringUtils.isEmpty(information.terminalLabel);

        if (isBillNumber || isMobileNumber || isStoreLabel || isTerminalLabel) {
            const additionalData = new AdditionalData(EMV.ADDITIONAL_DATA_TAG, additionalDataInformation);
            KHQRInstances.push(additionalData);
        }

        const timeStamp = new TimeStamp(EMV.TIMESTAMP_TAG);
        KHQRInstances.push(timeStamp);

        let khqrNoCrc = '';
        KHQRInstances.forEach((item) => {
            khqrNoCrc += item.toString();
        });

        let khqr = khqrNoCrc + EMV.CRC + EMV.CRC_LENGTH;
        khqr += crc16(khqr);

        return khqr;
    } catch (error) {
        throw error;
    }
}
