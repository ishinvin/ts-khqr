export class TagLengthString {
    private tag: string;
    private value: string | number;
    private length: string;

    constructor(tag: string, value: string | number) {
        this.tag = tag;
        this.value = value;

        const length = String(value).length;
        this.length = length < 10 ? `0${length}` : String(length);
    }

    toString() {
        return `${this.tag}${this.length}${this.value}`;
    }
}
