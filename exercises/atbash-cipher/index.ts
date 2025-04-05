// * The lowercase letters of the alphabet follow the ASCII sequence from 97 to 127

export const encode = (text: string): string => {
  let encodedText = ""

  const asciiValues = Array.from(text.toLowerCase()).map(char => char.charCodeAt(0))

  const encodedAscii = asciiValues
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

  for (let i = 0; i < encodedAscii.length; i++) {
    if (i % 5 == 0 && i > 0) {
      encodedText += " "
    }

    encodedText += String.fromCharCode(encodedAscii[i])
  }

  return encodedText
}

export const decode = (text: string): string => {
  let decodedText = ""

  const asciiValues = Array.from(text).map(char => char.charCodeAt(0))

  const decodedAscii = asciiValues
    .filter(ascii => ascii != 32)
    .map(ascii =>
      ascii >= 97 && ascii <= 122
        ? 122 - (ascii % 97)
        : ascii
    )

  for (let i = 0; i < decodedAscii.length; i++) {
    decodedText += String.fromCharCode(decodedAscii[i])
  }

  return decodedText
}