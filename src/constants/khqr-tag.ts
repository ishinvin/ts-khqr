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
} from '../merchant-code';

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
        sub: true,
        tag: '29',
        type: 'globalUniqueIdentifier',
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
        tag: '99',
        sub: true,
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
