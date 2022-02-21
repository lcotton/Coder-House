export default class Mensaje {
    #id
    #author;
    #text;
    #timestamp;

    constructor({ id, author, text, timestamp }) {
        this.id = id;
        this.author = author;
        this.text = text;
        this.timestamp = timestamp;
    }

    get id() { return this.#id }

    set id(id) {
        if (!id) throw new Error('"id" es un campo requerido');
        this.#id = id;
    }

    get author() { return this.#author }

    set author(author) {
        if (!author) throw new Error('"author" es un campo requerido');
        this.#author = author;
    }

    get text() { return this.#text }

    set text(text) {
        if (!text) throw new Error('"text" es un campo requerido');
        this.#text = text;
    }

    get timestamp() { return this.#timestamp }

    set timestamp(timestamp) {
        if (!timestamp) throw new Error('"timestamp" es un campo requerido');
        this.#timestamp = timestamp;
    }
}