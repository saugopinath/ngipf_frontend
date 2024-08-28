export class baseModel {
    private _blankKeys: string[] = [];
    get isNull(): boolean {
        var notBlank: boolean = true;
        for (const [key, value] of Object.entries(this)) {
            notBlank = notBlank && value !== null && value != '';
            if (!notBlank) this._blankKeys.push(key);
        }
        return !notBlank;
    }
    get blankKeys(): string[] {
        return this._blankKeys.filter((val: string) => val != '_blankKeys');
    }
    // every() {
    //     return Object.values(this).every((x) => {
    //         console.log(x);
    //     });
    // }
}
