# TypeScript KHQR

Bakong KHQR re-implement in TypeScript <br>

Link to the official package [bakong-khqr](https://www.npmjs.com/package/bakong-khqr)

# KHQR (Khmer QRCode)

KHQR is the centralized QRCode for Cambodia, where every mobile banking app in Cambodia can scan and pay. <br>

KHQR ~ Scan.Pay.Done.

## Installation

```sh
npm install ts-khqr
```

## Usage

```js
import { KHQR, CURRENCY, TAG } from 'ts-khqr';
```

### Generate KHQR

```js
import { KHQR, CURRENCY, COUNTRY, TAG } from 'ts-khqr';

const result = KHQR.generate({
    tag: TAG.INDIVIDUAL, // TAG.MERCHANT
    accountID: 'ishinvin@devb',
    merchantName: 'Ishin Vin',
    // optional
    merchantID: '012345678',
    acquiringBank: 'Dev Bank',
    merchantCity: 'Phnom Penh', // default 'Phnom Penh'
    currency: CURRENCY.KHR, // default KHR
    amount: 10000, // default 0
    countryCode: COUNTRY.KH, // default KH
    merchantCategoryCode: '5999', // default "5999"
    expirationTimestamp: Date.now() + 1 * 60 * 1000, // required if amount is not null or zero (eg. expired in 1 minutes)
    additionalData: {
        mobileNumber: '85512345678',
        billNumber: 'INV-2022-12-25',
        storeLabel: 'Ishin Shop',
        terminalLabel: '012345',
        purposeOfTransaction: 'Payment',
    },
    languageData: {
        languagePreference: 'ZH',
        merchantNameAlternateLanguage: '文山',
        merchantCityAlternateLanguage: '金边',
    },
    upiMerchantAccount: '',
});

console.log(result);
```

Output:

```js
{
  status: { code: 0, errorCode: null, message: null },
  data: {
    qr: '00020101021229420013ishinvin@devb01090123456780208Dev Bank5204599953031165405100005802KH5909Ishin Vin6010Phnom Penh62680114INV-2022-12-250211855123456780310Ishin Shop07060123450807Payment64180002ZH0102文山0202金边99340013175507623233601131755076292336630416C4',
    md5: '922a409e0f8784858f644bf912c132b0'
  }
}
```

### Verify KHQR

```js
import { KHQR } from 'ts-khqr';

const khqrString =
    '00020101021229420013ishinvin@devb01090123456780208Dev Bank5204599953031165405100005802KH5909Ishin Vin6010Phnom Penh62680114INV-2022-12-250211855123456780310Ishin Shop07060123450807Payment64180002ZH0102文山0202金边99340013175507623233601131755076292336630416C4';

const isKHQR = KHQR.verify(khqrString).isValid;

console.log(isKHQR);
// true
```

### Parse KHQR

```js
import { KHQR } from 'ts-khqr';

const khqrString =
    '00020101021229420013ishinvin@devb01090123456780208Dev Bank5204599953031165405100005802KH5909Ishin Vin6010Phnom Penh62680114INV-2022-12-250211855123456780310Ishin Shop07060123450807Payment64180002ZH0102文山0202金边99340013175507623233601131755076292336630416C4';

const result = KHQR.parse(khqrString);

console.log(result);
```

Output:

```js
{
  status: { code: 0, errorCode: null, message: null },
  data: {
    merchantType: '29',
    bakongAccountID: 'ishinvin@devb',
    accountInformation: '012345678',
    merchantID: null,
    acquiringBank: 'Dev Bank',
    billNumber: 'INV-2022-12-25',
    mobileNumber: '85512345678',
    storeLabel: 'Ishin Shop',
    terminalLabel: '012345',
    purposeOfTransaction: 'Payment',
    languagePreference: 'ZH',
    merchantNameAlternateLanguage: '文山',
    merchantCityAlternateLanguage: '金边',
    creationTimestamp: '1755076232336',
    expirationTimestamp: '1755076292336',
    payloadFormatIndicator: '01',
    pointofInitiationMethod: '12',
    unionPayMerchant: null,
    merchantCategoryCode: '5999',
    transactionCurrency: '116',
    transactionAmount: '10000',
    countryCode: 'KH',
    merchantName: 'Ishin Vin',
    merchantCity: 'Phnom Penh',
    crc: '16C4'
  }
}
```

<br>

Buy Me a Coffee: [KHQR](https://ishinvin.github.io/img/khqr.jpg)
