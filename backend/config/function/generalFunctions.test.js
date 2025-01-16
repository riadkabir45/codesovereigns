import getRandomValueExcludingKeys from "./getRandomValueExcludingKeys";


test('RandomKey: get random dictionary key excluding keys',() => {
    const testDict = {'line1':'Hi','line2':'I am Luna','line3':'Nice to meet you'}
    const key = getRandomValueExcludingKeys(testDict,['line1']);
    expect(key).not.toBe('line1');
    expect(Object.keys(testDict)).toContain('line1');
})