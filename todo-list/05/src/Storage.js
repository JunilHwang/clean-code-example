export default class Storage {
  #key;
  #storage;

  constructor(key, storage = sessionStorage) {
    this.#key = key;
    this.#storage = storage;
  }

  getData() {
    return JSON.parse(this.#storage.getItem(this.#key));
  }

  setData(newData) {
    return this.#storage.setItem(this.#key, JSON.stringify(newData));
  }

  clear() {
    this.#storage.clear();
  }
}
