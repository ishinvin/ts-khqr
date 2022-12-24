import { IndividualInfo, OptionalDataType } from './individual-info';

export class MerchantInfo extends IndividualInfo {
    merchantID: string;

    /**
     * Merchant information
     * @param bakongAccountID
     * @param merchantName
     * @param merchantCity
     * @param merchantID
     * @param acquiringBank
     * @param optional
     */
    constructor(
        bakongAccountID: string,
        merchantName: string,
        merchantCity: string,
        merchantID: string,
        acquiringBank: string,
        optional: OptionalDataType = {},
    ) {
        super(bakongAccountID, merchantName, merchantCity, optional);

        this.merchantID = merchantID;
        this.acquiringBank = acquiringBank;
    }
}
