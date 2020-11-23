import { Document } from "./Document";
export class Book extends Document {
    constructor(title, subtitle, publishedAt, author, isbn, edition, volume) {
        super(title, subtitle, publishedAt, author);
        this.isbn = isbn;
        this.edition = edition;
        this.volume = volume;
    }
}
export default Book;
