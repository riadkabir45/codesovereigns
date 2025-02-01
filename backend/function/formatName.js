function formatFileName(str) {
  let formattedStr = str.replace('.json', '');

  formattedStr = formattedStr.replace(/-/g, ' '); // g flag for global replacement

  formattedStr = formattedStr.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');

  return formattedStr;
}

export default formatFileName;