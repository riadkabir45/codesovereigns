import { randomInt } from 'crypto';

const getRandomValueExcludingKeys = (dict, excludedKeys) => {
    const keys = Object.keys(dict).filter(key => !excludedKeys.includes(key));
  
    if (keys.length === 0) {
      throw new Error("No valid keys found in the dictionary.");
    }
  
    const randomIndex = randomInt(0, keys.length); 
    const randomKey = keys[randomIndex];
    return randomKey;
}

export default getRandomValueExcludingKeys;