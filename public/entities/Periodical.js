import { Document } from "./Document.js";
export class Periodical extends Document {
    constructor(title, subtitle, publishedAt, author, iss, volume, issue) {
        super(title, subtitle, publishedAt, author);
        this.iss = iss;
        this.issue = issue;
        this.volume = volume;
    }
}
export default Periodical;
