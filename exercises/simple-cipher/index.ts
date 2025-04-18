export class SimpleCipher {
  private readonly FIRST_CHAR_CODE = 97
  private readonly CHAR_RANGE = 26

  key: string

  constructor(key?: string) {
    this.key = key
      || Array.from({ length: 100 }).reduce((acc: string) => acc + String.fromCharCode(
        Math.floor(Math.random() * this.CHAR_RANGE + this.FIRST_CHAR_CODE)
      ), "")
  }

  encode(plaintext: string): string {
    return this.cipher({ plaintext })
  }

  decode(plaintext: string): string {
    return this.cipher({ plaintext, isReverse: true })
  }

  private cipher({
    plaintext,
    isReverse = false
  }: { plaintext: string, isReverse?: boolean }) {
    return plaintext.split("").reduce((acc, val, idx) => {
      const keyCode = this.key.charCodeAt(idx % this.key.length) - this.FIRST_CHAR_CODE
      const valCode = val.charCodeAt(0) - this.FIRST_CHAR_CODE

      let offset = 0;

      if (isReverse) {
        offset = (valCode - keyCode + this.CHAR_RANGE) % this.CHAR_RANGE
      } else {
        offset = (valCode + keyCode) % this.CHAR_RANGE
      }

      return acc + String.fromCharCode(offset + this.FIRST_CHAR_CODE)
    }, "")
  }
}