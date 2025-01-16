import { randomInt } from 'crypto';

const getRandomValueExcludingKeys = (dict, excludedKeys) => {
    const keys = Object.keys(dict).filter(key => !excludedKeys.includes(key));
  
    if (keys.length === 0) {
      return null;
    }
  
    const randomIndex = randomInt(0, keys.length); 
    const randomKey = keys[randomIndex];
    return randomKey;
}

export default getRandomValueExcludingKeys;