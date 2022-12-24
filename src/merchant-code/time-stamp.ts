import { TagLengthString } from '../models';

export class TimeStamp extends TagLengthString {
    constructor(tag: string) {
        const milisecondTimeStamp = Math.floor(Date.now());
        const timeStamp = new TimeStampMiliSecond('00', milisecondTimeStamp);
        const value = timeStamp.toString();

        super(tag, value);
    }
}

class TimeStampMiliSecond extends TagLengthString {
    constructor(tag: string, value: number) {
        super(tag, value);
    }
}
