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
        code: 35,
        message: 'Tag is not in order',
    },
});
