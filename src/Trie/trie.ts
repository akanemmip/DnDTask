export class Trie {
  count = 0;
  map: { [key: string]: Trie } = {};
  isWord = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public insert(word: string): void {
    this.add(word, 0, this);
  }

  public search(word: string): boolean {
    return this.find(word, 0, this);
  }

  private add(word: string, index: number, letterMap: Trie): void {
    if (index == word.length) {
      letterMap.isWord = true;
      return;
    }
    if (!letterMap.map[word.charAt(index)]) {
      letterMap.map[word.charAt(index)] = new Trie();
      this.count++;
    }
    return this.add(word, index + 1, letterMap.map[word.charAt(index)]);
  }

  private find(word: string, index: number, letterMap: Trie): boolean {
    if (index == word.length) {
      if (letterMap.isWord) {
        return true;
      }
      return false;
    }
    if (letterMap.map[word[index]]) {
      return this.find(word, index + 1, letterMap.map[word.charAt(index)]);
    }
    return false;
  }
}
