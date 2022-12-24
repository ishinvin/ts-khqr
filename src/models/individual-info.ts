import { KHQRData } from '../constants';

type CurrencyType = typeof KHQRData.currency['usd'];
export type OptionalDataType = {
    accountInformation?: string;
    acquiringBank?: string;
    currency?: CurrencyType;
    amount?: number;
    billNumber?: string;
    storeLabel?: string;
    terminalLabel?: string;
    mobileNumber?: string;
};

export class IndividualInfo {
    bakongAccountID: string;
    merchantName: string;
    /** Account number or phone number. */
    accountInformation?: string;
    /** Acquiring Bank name. */
    acquiringBank?: string;
    /** Default: KHR */
    currency?: CurrencyType;
    amount?: number;
    merchantCity?: string;
    billNumber?: string;
    storeLabel?: string;
    terminalLabel?: string;
    mobileNumber?: string;

    /**
     * Individual information
     * @param bakongAccountID
     * @param merchantName
     * @param merchantCity
     * @param optional
     */
    constructor(bakongAccountID: string, merchantName: string, merchantCity?: string, optional: OptionalDataType = {}) {
        const {
            accountInformation,
            acquiringBank,
            currency,
            amount,
            billNumber,
            storeLabel,
            terminalLabel,
            mobileNumber,
        } = optional;

        this.bakongAccountID = bakongAccountID;
        this.accountInformation = accountInformation;
        this.acquiringBank = acquiringBank;
        this.currency = currency || KHQRData.currency.khr;
        this.amount = amount;
        this.merchantName = merchantName;
        this.merchantCity = merchantCity || 'Phnom Penh';
        this.billNumber = billNumber;
        this.storeLabel = storeLabel;
        this.terminalLabel = terminalLabel;
        this.mobileNumber = mobileNumber;
    }
}
