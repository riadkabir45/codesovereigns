import formatFileName from "../formatName";

test('FormatFileName: remove extention and word cap file name',() => {
    expect(formatFileName('laptop.json')).toBe('Laptop');
    expect(formatFileName('gaming-chair.json')).toBe('Gaming Chair');
    expect(formatFileName('gaming-Chair.json')).toBe('Gaming Chair');
    expect(formatFileName('Gaming-chair.json')).toBe('Gaming Chair');
})