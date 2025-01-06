function getRandomValueExcludingKeys(dict, excludedKeys) {
    const keys = Object.keys(dict).filter(key => !excludedKeys.includes(key));
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    return randomKey;
}

export default getRandomValueExcludingKeys;