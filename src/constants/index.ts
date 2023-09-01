import {
    AdditionalData,
    CountryCode,
    CRC,
    GlobalUniqueIdentifier,
    MerchantCategoryCode,
    MerchantCity,
    MerchantName,
    PayloadFormatIndicator,
    PointOfInitiationMethod,
    TimeStamp,
    TransactionAmount,
    TransactionCurrency,
    UnionpayMerchantAccount,
    MerchantInformationLanguageTemplate,
} from '../models';

export const EMV = Object.freeze({
    PAYLOAD_FORMAT_INDICATOR: '00',
    POINT_OF_INITIATION_METHOD: '01',
    STATIC_QR: '11',
    DYNAMIC_QR: '12',
    MERCHANT_ACCOUNT_INFORMATION_INDIVIDUAL: '29',
    MERCHANT_ACCOUNT_INFORMATION_MERCHANT: '30',
    BAKONG_ACCOUNT_IDENTIFIER: '00',
    MERCHANT_ACCOUNT_INFORMATION_MERCHANT_ID: '01',
    INDIVIDUAL_ACCOUNT_INFORMATION: '01',
    MERCHANT_ACCOUNT_INFORMATION_ACQUIRING_BANK: '02',
    MERCHANT_CATEGORY_CODE: '52',
    TRANSACTION_CURRENCY: '53',
    TRANSACTION_AMOUNT: '54',
    COUNTRY_CODE: '58',
    MERCHANT_NAME: '59',
    MERCHANT_CITY: '60',
    CRC: '63',
    CRC_LENGTH: '04',
    ADDITIONAL_DATA_TAG: '62',
    BILLNUMBER_TAG: '01',
    ADDITIONAL_DATA_FIELD_MOBILE_NUMBER: '02',
    STORELABEL_TAG: '03',
    TERMINAL_TAG: '07',
    PURPOSE_OF_TRANSACTION: '08',
    TIMESTAMP_TAG: '99',
    MERCHANT_INFORMATION_LANGUAGE_TEMPLATE: '64',
    LANGUAGE_PREFERENCE: '00',
    MERCHANT_NAME_ALTERNATE_LANGUAGE: '01',
    MERCHANT_CITY_ALTERNATE_LANGUAGE: '02',
    UNIONPAY_MERCHANT_ACCOUNT: '15',

    // default value for KHQR
    DEFAULT_PAYLOAD_FORMAT_INDICATOR: '01',
    DEFAULT_MERCHANT_CATEGORY_CODE: '5999',
    DEFAULT_TRANSACTION_AMOUNT: '0',
    DEFAULT_COUNTRY_CODE: 'KH',
    DEFAULT_MERCHANT_CITY: 'Phnom Penh',

    INVALID_LENGTH: {
        KHQR: 12,
        MERCHANT_NAME: 25,
        BAKONG_ACCOUNT: 32,
        AMOUNT: 13,
        COUNTRY_CODE: 3,
        MERCHANT_CATEGORY_CODE: 4,
        MERCHANT_CITY: 15,
        TIMESTAMP: 13,
        TRANSACTION_AMOUNT: 14,
        TRANSACTION_CURRENCY: 3,
        BILL_NUMBER: 25,
        STORE_LABEL: 25,
        TERMINAL_LABEL: 25,
        PURPOSE_OF_TRANSACTION: 25,
        MERCHANT_ID: 32,
        ACQUIRING_BANK: 32,
        MOBILE_NUMBER: 25,
        ACCOUNT_INFORMATION: 32,
        MERCHANT_INFORMATION_LANGUAGE_TEMPLATE: 99,
        UPI_MERCHANT: 99,
        LANGUAGE_PREFERENCE: 2,
        MERCHANT_NAME_ALTERNATE_LANGUAGE: 25,
        MERCHANT_CITY_ALTERNATE_LANGUAGE: 15,
    },
});

export const ERROR_CODE = Object.freeze({
    BAKONG_ACCOUNT_ID_REQUIRED: {
        code: 1,
        message: 'Bakong Account ID cannot be null or empty',
    },
    MERCHANT_NAME_REQUIRED: {
        code: 2,
        message: 'Merchant name cannot be null or empty',
    },
    BAKONG_ACCOUNT_ID_INVALID: {
        code: 3,
        message: 'Bakong Account ID is invalid',
    },
    TRANSACTION_AMOUNT_INVALID: {
        code: 4,
        message: 'Amount is invalid',
    },
    MERCHANT_TYPE_REQUIRED: {
        code: 5,
        message: 'Merchant type cannot be null or empty',
    },
    BAKONG_ACCOUNT_ID_LENGTH_INVALID: {
        code: 6,
        message: 'Bakong Account ID Length is Invalid',
    },
    MERCHANT_NAME_LENGTH_INVALID: {
        code: 7,
        message: 'Merchant Name Length is invalid',
    },
    KHQR_INVALID: {
        code: 8,
        message: 'KHQR provided is invalid',
    },
    CURRENCY_TYPE_REQUIRED: {
        code: 9,
        message: 'Currency type cannot be null or empty',
    },
    BILL_NUMBER_LENGTH_INVALID: {
        code: 10,
        message: 'Bill Name Length is invalid',
    },
    STORE_LABEL_LENGTH_INVALID: {
        code: 11,
        message: 'Store Label Length is invalid',
    },
    TERMINAL_LABEL_LENGTH_INVALID: {
        code: 12,
        message: 'Terminal Label Length is invalid',
    },
    CONNECTION_TIMEOUT: {
        code: 13,
        message: 'Cannot reach Bakong Open API service. Please check internet connection',
    },
    INVALID_DEEP_LINK_SOURCE_INFO: {
        code: 14,
        message: 'Source Info for Deep Link is invalid',
    },
    INTERNAL_SREVER: {
        code: 15,
        message: 'Internal server error',
    },
    PAYLOAD_FORMAT_INDICATOR_LENGTH_INVALID: {
        code: 16,
        message: 'Payload Format indicator Length is invalid',
    },
    POINT_INITIATION_LENGTH_INVALID: {
        code: 17,
        message: 'Point of initiation Length is invalid',
    },
    MERCHANT_CODE_LENGTH_INVALID: {
        code: 18,
        message: 'Merchant code Length is invalid',
    },
    TRANSACTION_CURRENCY_LENGTH_INVALID: {
        code: 19,
        message: 'Transaction currency Length is invalid',
    },
    COUNTRY_CODE_LENGTH_INVALID: {
        code: 20,
        message: 'Country code Length is invalid',
    },
    MERCHANT_CITY_LENGTH_INVALID: {
        code: 21,
        message: 'Merchant city Length is invalid',
    },
    CRC_LENGTH_INVALID: {
        code: 22,
        message: 'CRC Length is invalid',
    },
    PAYLOAD_FORMAT_INDICATOR_TAG_REQUIRED: {
        code: 23,
        message: 'Payload format indicator tag required',
    },
    CRC_TAG_REQUIRED: {
        code: 24,
        message: 'CRC tag required',
    },
    MERCHANT_CATEGORY_TAG_REQUIRED: {
        code: 25,
        message: 'Merchant category tag required',
    },
    COUNTRY_CODE_TAG_REQUIRED: {
        code: 26,
        message: 'Country Code cannot be null or empty',
    },
    MERCHANT_CITY_TAG_REQUIRED: {
        code: 27,
        message: 'Merchant City cannot be null or empty',
    },
    UNSUPPORTED_CURRENCY: {
        code: 28,
        message: 'Unsupported currency',
    },
    INVALID_DEEP_LINK_URL: {
        code: 29,
        message: 'Deep Link URL is not valid',
    },
    MERCHANT_ID_REQUIRED: {
        code: 30,
        message: 'Merchant ID cannot be null or empty',
    },
    ACQUIRING_BANK_REQUIRED: {
        code: 31,
        message: 'Acquiring Bank cannot be null or empty',
    },
    MERCHANT_ID_LENGTH_INVALID: {
        code: 32,
        message: 'Merchant ID Length is invalid',
    },
    ACQUIRING_BANK_LENGTH_INVALID: {
        code: 33,
        message: 'Acquiring Bank Length is invalid',
    },
    MOBILE_NUMBER_LENGTH_INVALID: {
        code: 34,
        message: 'Mobile Number Length is invalid',
    },
    ACCOUNT_INFORMATION_LENGTH_INVALID: {
        code: 35,
        message: 'Account Information Length is invalid',
    },
    TAG_NOT_IN_ORDER: {
        code: 36,
        message: 'Tag is not in order',
    },
    LANGUAGE_PREFERENCE_REQUIRED: {
        code: 37,
        message: 'Language Preference cannot be null or empty',
    },
    LANGUAGE_PREFERENCE_LENGTH_INVALID: {
        code: 38,
        message: 'Language Preference Length is invalid',
    },
    MERCHANT_NAME_ALTERNATE_LANGUAGE_REQUIRED: {
        code: 39,
        message: 'Merchant Name Alternate Language cannot be null or empty',
    },
    MERCHANT_NAME_ALTERNATE_LANGUAGE_LENGTH_INVALID: {
        code: 40,
        message: 'Merchant Name Alternate Language Length is invalid',
    },
    MERCHANT_CITY_ALTERNATE_LANGUAGE_LENGTH_INVALID: {
        code: 41,
        message: 'Merchant City Alternate Language Length is invalid',
    },
    PURPOSE_OF_TRANSACTION_LENGTH_INVALID: {
        code: 42,
        message: 'Purpose of Transaction Length is invalid',
    },
    UPI_ACCOUNT_INFORMATION_LENGTH_INVALID: {
        code: 43,
        message: 'Upi Account Information Length is invalid',
    },
});

export type KHQRTagType = {
    tag: string;
    sub?: boolean;
    type: string;
    required: boolean;
    instance: any;
};

export const KHQR_TAG: KHQRTagType[] = [
    {
        tag: '00',
        type: 'payloadFormatIndicator',
        required: true,
        instance: PayloadFormatIndicator,
    },
    {
        tag: '01',
        type: 'pointofInitiationMethod',
        required: false,
        instance: PointOfInitiationMethod,
    },
    {
        tag: '15',
        type: 'unionPayMerchant',
        required: false,
        instance: UnionpayMerchantAccount,
    },
    {
        sub: true,
        tag: '29',
        type: 'globalUnqiueIdentifier',
        required: true,
        instance: GlobalUniqueIdentifier,
    },
    {
        tag: '52',
        type: 'merchantCategoryCode',
        required: true,
        instance: MerchantCategoryCode,
    },
    {
        tag: '53',
        type: 'transactionCurrency',
        required: true,
        instance: TransactionCurrency,
    },
    {
        tag: '54',
        type: 'transactionAmount',
        required: false,
        instance: TransactionAmount,
    },
    {
        tag: '58',
        type: 'countryCode',
        required: true,
        instance: CountryCode,
    },
    {
        tag: '59',
        type: 'merchantName',
        required: true,
        instance: MerchantName,
    },
    {
        tag: '60',
        type: 'merchantCity',
        required: true,
        instance: MerchantCity,
    },
    {
        tag: '62',
        sub: true,
        type: 'additionalData',
        required: false,
        instance: AdditionalData,
    },
    {
        tag: '64',
        sub: true,
        type: 'merchantInformationLanguageTemplate',
        required: false,
        instance: MerchantInformationLanguageTemplate,
    },
    {
        tag: '99',
        type: 'timestamp',
        required: false,
        instance: TimeStamp,
    },
    {
        tag: '63',
        type: 'crc',
        required: true,
        instance: CRC,
    },
];

export const KHQR_SUBTAG = Object.freeze({
    input: [
        {
            tag: '29',
            data: {
                bakongAccountID: null,
                accountInformation: null,
            },
        },
        {
            tag: '30',
            data: {
                bakongAccountID: null,
                merchantID: null,
                acquiringBank: null,
            },
        },
        {
            tag: '62',
            data: {
                billNumber: null,
                mobileNumber: null,
                storeLabel: null,
                terminalLabel: null,
                purposeOfTransaction: null,
            },
        },
        {
            tag: '64',
            data: {
                languagePreference: null,
                merchantNameAlternateLanguage: null,
                merchantCityAlternateLanguage: null,
            },
        },
    ],
    compare: [
        {
            tag: '29',
            subTag: EMV.BAKONG_ACCOUNT_IDENTIFIER,
            name: 'bakongAccountID',
        },
        {
            tag: '29',
            subTag: EMV.MERCHANT_ACCOUNT_INFORMATION_MERCHANT_ID,
            name: 'accountInformation',
        },
        {
            tag: '29',
            subTag: EMV.MERCHANT_ACCOUNT_INFORMATION_ACQUIRING_BANK,
            name: 'acquiringBank',
        },
        {
            tag: '62',
            subTag: EMV.BILLNUMBER_TAG,
            name: 'billNumber',
        },
        {
            tag: '62',
            subTag: EMV.ADDITIONAL_DATA_FIELD_MOBILE_NUMBER,
            name: 'mobileNumber',
        },
        {
            tag: '62',
            subTag: EMV.STORELABEL_TAG,
            name: 'storeLabel',
        },
        {
            tag: '62',
            subTag: EMV.PURPOSE_OF_TRANSACTION,
            name: 'purposeOfTransaction',
        },
        {
            tag: '62',
            subTag: EMV.TERMINAL_TAG,
            name: 'terminalLabel',
        },
        {
            tag: '64',
            subTag: EMV.LANGUAGE_PREFERENCE,
            name: 'languagePreference',
        },
        {
            tag: '64',
            subTag: EMV.MERCHANT_NAME_ALTERNATE_LANGUAGE,
            name: 'merchantNameAlternateLanguage',
        },
        {
            tag: '64',
            subTag: EMV.MERCHANT_CITY_ALTERNATE_LANGUAGE,
            name: 'merchantCityAlternateLanguage',
        },
    ],
});

type CurrencyKey =
    | 'USD'
    | 'KHR'
    | 'THB'
    | 'LAK'
    | 'VND'
    | 'MYR'
    | 'MMK'
    | 'BND'
    | 'PHP'
    | 'SGD'
    | 'IDR'
    | 'INR'
    | 'CNY';
export const CURRENCY: { [K in CurrencyKey]: string } = Object.freeze({
    USD: '840',
    KHR: '116',
    THB: '764',
    LAK: '418',
    VND: '704',
    MYR: '458',
    MMK: '104',
    BND: '096',
    PHP: '608',
    SGD: '702',
    IDR: '360',
    INR: '356',
    CNY: '156',
});

export const COUNTRY: {
    [K in 'KH' | 'TH' | 'LA' | 'VN' | 'MY' | 'MM' | 'BN' | 'PH' | 'SG' | 'ID' | 'IN' | 'CN']: string;
} = Object.freeze({
    KH: 'KH',
    TH: 'TH',
    LA: 'LA',
    VN: 'VN',
    MY: 'MY',
    MM: 'MM',
    BN: 'BN',
    PH: 'PH',
    SG: 'SG',
    ID: 'ID',
    IN: 'IN',
    CN: 'CN',
});

type TagKey =
    | 'MERCHANT'
    | 'INDIVIDUAL'
    | 'TAG_26'
    | 'TAG_27'
    | 'TAG_28'
    | 'TAG_29'
    | 'TAG_30'
    | 'TAG_31'
    | 'TAG_32'
    | 'TAG_33'
    | 'TAG_34'
    | 'TAG_35'
    | 'TAG_36'
    | 'TAG_37'
    | 'TAG_38'
    | 'TAG_39'
    | 'TAG_40'
    | 'TAG_41'
    | 'TAG_42'
    | 'TAG_43'
    | 'TAG_44'
    | 'TAG_45'
    | 'TAG_46'
    | 'TAG_47'
    | 'TAG_48'
    | 'TAG_49'
    | 'TAG_50'
    | 'TAG_51';
export const TAG: { [K in TagKey]: string } = Object.freeze({
    MERCHANT: '30',
    INDIVIDUAL: '29',
    TAG_26: '26',
    TAG_27: '27',
    TAG_28: '28',
    TAG_29: '29',
    TAG_30: '30',
    TAG_31: '31',
    TAG_32: '32',
    TAG_33: '33',
    TAG_34: '34',
    TAG_35: '35',
    TAG_36: '36',
    TAG_37: '37',
    TAG_38: '38',
    TAG_39: '39',
    TAG_40: '40',
    TAG_41: '41',
    TAG_42: '42',
    TAG_43: '43',
    TAG_44: '44',
    TAG_45: '45',
    TAG_46: '46',
    TAG_47: '47',
    TAG_48: '48',
    TAG_49: '49',
    TAG_50: '50',
    TAG_51: '51',
});
