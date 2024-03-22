function convertTextToUnicode(text: string): string {
  return text.split('').map(value => `\\u${value.charCodeAt(0).toString(16).padStart(4, '0')}`).join('');
}

function convertUnicodeToText(unicodeStr: string): string {
  return unicodeStr.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(Number.parseInt(match.replace(/\\u/g, ''), 16));
  });
}

export { convertTextToUnicode, convertUnicodeToText };
