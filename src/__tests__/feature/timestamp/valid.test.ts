import { KHQR } from '../../../index';

const testDataFromFailedDecode = [
    {
        statement: 'Point of Initiation Method is invalid',
        data: '00020101021329180014vandoeurn@devb52045999530384054031015802KH5909Vandoeurn6010Phnom Penh993400131727249364974011317272494849746304DCEF',
        errorCode: 48,
    },
    {
        statement: 'Invalid Dynamic KHQR',
        data: '00020101021229180014vandoeurn@devb5204599953038405802KH5909Vandoeurn6010Phnom Penh993400131727249364974011317272494849746304B6F4',
        errorCode: 47,
    },
    {
        statement: 'KHQR was expired',
        data: '00020101021229180014vandoeurn@devb52045999530384054031015802KH5909Vandoeurn6010Phnom Penh9934001317272493649740113172724948497463047BD0',
        errorCode: 46,
    },
    {
        statement: 'Expiration timestamp is required',
        data: '00020101021215311974011600520446ACLB1000231208129200016chantha_dev@ftcc520459995303116540410005802KH5911Chantha Dev6010Phnom Penh63046011',
        errorCode: 45,
    },
    {
        statement: 'Expiration timestamp is required 1',
        data: '00020101021215311974011600520446ACLB1000231208129200016chantha_dev@ftcc52045999530311654034005802KH5911Chantha Dev6010Phnom Penh99170013172974008531463046EEC',
        errorCode: 45,
    },
    {
        statement: 'Expiration timestamp length is invalid',
        data: '00020101021229220018sopheak_leng2@ftcc520459995303116540410005802KH5912sopheak leng6010Phnom Penh9936001411732270085311011417323270145310630445D7',
        errorCode: 49,
    },
];

testDataFromFailedDecode.forEach((data) => {
    test(data.statement, () => {
        const decodeResponse = KHQR.verify(data.data);
        expect(decodeResponse.isValid).toBe(false);
    });
});
