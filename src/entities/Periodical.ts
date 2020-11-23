import { Document }from "./Document"
import { Person } from "./Person"


 export class Periodical extends Document{
    iss: Number
    volume: Number
    issue: Number

    constructor(title: String, subtitle: String, publishedAt: Date, author: Person, iss: Number, 
        volume: Number, issue: Number){
        super(title, subtitle, publishedAt, author)
          this.iss = iss
          this.issue = issue
          this.volume = volume
      }
  }
export default Periodical
