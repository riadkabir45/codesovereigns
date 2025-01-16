import getRandomValueExcludingKeys from "./getRandomValueExcludingKeys";

test('RandomKey: get random dictionary key excluding keys',() => {
    const testDict = {'line1':'Hi','line2':'I am Luna','line3':'Nice to meet you'}
    for(let i=0;i<10;i++){
        let key = getRandomValueExcludingKeys(testDict,['line1']);
        expect(key).not.toBe('line1');
        expect(Object.keys(testDict)).toContain('line1');
        key = getRandomValueExcludingKeys(testDict,['line2']);
        expect(key).not.toBe('line2');
        expect(Object.keys(testDict)).toContain('line2');
        key = getRandomValueExcludingKeys(testDict,['line3']);
        expect(key).not.toBe('line3');
        expect(Object.keys(testDict)).toContain('line3');
    }
})