import { KHQR } from '../../../index';

const testData = [
    {
        statement: 'Decode Test 1',
        data: '00020101021229460015john_smith@devb0111855122334550208Dev Bank52045999530384054031005802KH5910John Smith6010PHNOM PENH62670106#123450211855122334550311Coffee Shop0709Cashier_10810Buy coffee64280002km0108ចន ស្មីន0206ភ្នំពញ993400131726821915797011317268220357976304B73E',
        result: ['merchantID', 'unionPayMerchant'],
    },
    {
        statement: 'Decode Test 2',
        data: '00020101021230350009khqr@devb01061234560208Dev Bank52045999530384054031005802KH5910John Smith6010PHNOM PENH62670106#123450211855122334550311Coffee Shop0709Cashier_10810Buy coffee64280002km0108ចន ស្មីន0206ភ្នំពញ993400131726822962612011317268230826126304A560',
        result: ['accountInformation', 'unionPayMerchant'],
    },
];

testData.forEach((data) => {
    test(data.statement, () => {
        const { data: decodeData }: any = KHQR.parse(data.data);
        const nullFilteredResult = Object.keys(decodeData).filter((key) => decodeData[key] == null);
        expect(nullFilteredResult).toEqual(data.result);
    });
});
