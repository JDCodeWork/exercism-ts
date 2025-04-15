export class SimpleCipher {
  private readonly FIRST_CHAR_CODE = 97
  private readonly LAST_CHAR_CODE = 122

  key: string

  constructor(key?: string) {
    if (key) {
      this.key = key
    } else {
      // Generate random integers between 97 and 123 (excluding 123)
      const randCodes = Array.from({ length: 100 }).map(() =>
        Math.floor(Math.random() * (
          this.LAST_CHAR_CODE + 1 - this.FIRST_CHAR_CODE
        ) + this.FIRST_CHAR_CODE)
      )

      // Transforms random integers into chars and joins them into a single string
      const randKey = randCodes.map(code => String.fromCharCode(code)).join("")

      this.key = randKey
    }
  }

  encode(text: string): string {
    const charCodes = this.transformTextToCodes(text)
    const positionsToMove = this.calculatePositionsToMove(charCodes)

    const encodedCodes = charCodes.map((code, idx) => {
      const encodedCode = code + positionsToMove[idx]

      if (encodedCode > this.LAST_CHAR_CODE) {
        return encodedCode % (this.LAST_CHAR_CODE + 1) + this.FIRST_CHAR_CODE
      }

      return encodedCode
    })

    return encodedCodes.map(code => String.fromCharCode(code)).join("")
  }

  decode(text: string): string {
    const charCodes = this.transformTextToCodes(text)
    const positionsToMove = this.calculatePositionsToMove(charCodes)

    const encodedCodes = charCodes.map((code, idx) => {
      const encodedCode = code - positionsToMove[idx]

      if (encodedCode < this.FIRST_CHAR_CODE) {
        return this.LAST_CHAR_CODE - (this.FIRST_CHAR_CODE - encodedCode) + 1
      }

      return encodedCode
    })

    return encodedCodes.map(code => String.fromCharCode(code)).join("")
  }

  private transformTextToCodes(text: string) {
    return Array.from(text.toLocaleLowerCase())
      .map(char => char.charCodeAt(0))
      .filter(char => char != 32)
  }

  private calculatePositionsToMove(charCodes: Array<number>) {
    return Array.from({ length: charCodes.length }).map((_, idx) => {
      let tempKey = this.key

      if (this.key.length < charCodes.length) {
        const diff = charCodes.length - this.key.length

        tempKey = this.key.repeat(diff)
      }

      const posToMove = tempKey.charCodeAt(idx) - this.FIRST_CHAR_CODE

      return posToMove
    })
  }
}