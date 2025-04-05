// * The lowercase letters of the alphabet follow the ASCII sequence from 97 to 127

export const encode = (text: string): string => {
  const encodedText = toCipherAscii(text).reduce(
    (text, ascii, i) => text += i > 0 && i % 5 == 0
      ? " " + String.fromCharCode(ascii)
      : String.fromCharCode(ascii)
    , "")

  return encodedText
}

export const decode = (text: string): string => {
  const decodedText = toCipherAscii(text)
    .reduce((text, ascii) => text += String.fromCharCode(ascii), "")

  return decodedText
}

const toCipherAscii = (text: string): number[] => {
  const asciiValues = Array.from(text.toLowerCase()).map(char => char.charCodeAt(0))

  return asciiValues
    .filter(ascii =>
      ascii != 32 // " "
      && ascii != 44 // ","
      && ascii != 46 // "."
    )
    .map(ascii =>
      ascii >= 97 && ascii <= 122
        ? 122 - (ascii % 97)
        : ascii
    )
}