import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export function getRandomValueExcludingKeys(dict, excludedKeys) {
    const keys = Object.keys(dict).filter(key => !excludedKeys.includes(key));
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    return randomKey;
}

export const root = resolve(dirname(fileURLToPath(import.meta.url)),'..');
