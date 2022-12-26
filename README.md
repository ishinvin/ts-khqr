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
import { BakongKHQR, IndividualInfo, MerchantInfo, KHQRData  } from 'ts-khqr'
```

### Generate Individual KHQR

```js
import { BakongKHQR, IndividualInfo, KHQRData } from 'ts-khqr'

const optionalData = {
    currency: KHQRData.currency.khr,
    amount: 10000,
    acquiringBank: "Dev Bank",
    mobileNumber: "85512345678",
    billNumber: "INV-2022-12-25",
    storeLabel: "Ishin Shop",
    terminalLabel: "012345",
    accountInformation: "012345678",
};

const individualInfo = new IndividualInfo(
    "ishinvin@devb",
    "Ishin Vin",
    "Siem Reap",
    optionalData
);

const khqr = new BakongKHQR();
const result = khqr.generateIndividual(individualInfo);
console.log(result);
```

Output:
```js
{
  status: { code: 0, errorCode: null, message: null },
  data: {
    qr: '00020101021229420013ishinvin@devb01090123456780208Dev Bank5204599953031165405100005802KH5909Ishin Vin6009Siem Reap62570114INV-2022-12-250211855123456780310Ishin Shop07060123459917001316720224515776304542B',
    md5: 'eedc27421c44f5701438ad46a60922f0'
  }
}
```

### Generate Merchant KHQR

```js
import { BakongKHQR, MerchantInfo, KHQRData } from 'ts-khqr'

const optionalData = {
    currency: KHQRData.currency.khr,
    amount: 10000,
    mobileNumber: "85512345678",
    billNumber: "INV-2022-12-25",
    storeLabel: "Ishin Shop",
    terminalLabel: "012345",
    accountInformation: "012345678",
};

const merchantInfo = new MerchantInfo(
    'ishinvin@devb',
    "Ishin VIN",
    "Phnom Penh",
    'MID12345',
    'Dev Bank',
    optionalData
);

const khqr = new BakongKHQR();
const result = khqr.generateMerchant(merchantInfo);
console.log(result);
```

Output:
```js
{
  status: { code: 0, errorCode: null, message: null },
  data: {
    qr: '00020101021230410013ishinvin@devb0108MID123450208Dev Bank5204599953031165405100005802KH5909Ishin VIN6010Phnom Penh62570114INV-2022-12-250211855123456780310Ishin Shop070601234599170013167202283048363042335',
    md5: '5e518ea961f1f85117b26aa587a2a4ad'
  }
}
```

### Verify KHQR
```js
import { BakongKHQR } from "ts-khqr";

const khqrString = '00020101021229420013ishinvin@devb01090123456780208Dev Bank5204599953031165405100005802KH5909Ishin Vin6009Siem Reap62570114INV-2022-12-250211855123456780310Ishin Shop07060123459917001316720224515776304542B';
const isKHQR = BakongKHQR.verify(khqrString).isValid;

console.log(isKHQR);
// true
```

### Decode
```js
import { BakongKHQR } from "ts-khqr";

const khqrString = '00020101021229420013ishinvin@devb01090123456780208Dev Bank5204599953031165405100005802KH5909Ishin Vin6009Siem Reap62570114INV-2022-12-250211855123456780310Ishin Shop07060123459917001316720224515776304542B';
const result = BakongKHQR.decode(khqrString);

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
    timestamp: '1672022451577',
    payloadFormatIndicator: '01',
    pointofInitiationMethod: '12',
    merchantCategoryCode: '5999',
    transactionCurrency: '116',
    transactionAmount: '10000',
    countryCode: 'KH',
    merchantName: 'Ishin Vin',
    merchantCity: 'Siem Reap',
    crc: '542B'
  }
}
```