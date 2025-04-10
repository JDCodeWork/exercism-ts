export class SimpleCipher {
  key: string

  constructor(key?: string) {
    this.key = key ?? "random_key"
  }

  encode(_text: string): string {
    throw new Error('Remove this statement and implement this function')
  }

  decode(_text: string): string {
    throw new Error('Remove this statement and implement this function')
  }
}
