import { KHQR } from '../../../index';

const negativeCases = [
    {
        statement: 'Feature MCC: Verify Invalid Merchant Category Code 1',
        data: '00020101021129180014jonhsmith@nbcq52041A2B53031165802KH5910Jonh Smith6010Phnom Penh6304F7FD',
        errorCode: 51,
    },
    {
        statement: 'Feature MCC: Verify Invalid Merchant Category Code 2',
        data: '00020101021129180014jonhsmith@nbcq5204-10053031165802KH5910Jonh Smith6010Phnom Penh6304038A',
        errorCode: 51,
    },
];

negativeCases.forEach((data) => {
    test(data.statement, () => {
        expect(KHQR.verify(data.data).isValid).toBe(false);
    });
});
