import {Person} from "./entities/Person"
import { Book } from "./entities/Book"
import { Periodical} from "./entities/Periodical"
import {Gender} from "./entities/Gender"

let personOne = new Person("Alessandro", new Date(1992, 10, 9), Gender.Male)
let persontwo = new Person("Genisvaldo", new Date(1870, 2, 10), Gender.Male)
let persontree = new Person("Calypso", new Date(1500, 3, 11), Gender.Female)

let bookOne = new Book("A volta dos que não foram !", "Catcher in the Rye", new Date(1, 1, 2000), personOne, 1, 1, 1)
let bookTwo = new Book("As longas tranças de um careca !", "Cabeleleiros", new Date(2, 2, 1900), persontwo, 2, 2, 2)
let bookTree = new Book("A caminhada do perneta.", "Só para mancos", new Date(3, 3, 1800), persontree, 3, 3, 3)

let periodicalOne = new Periodical(bookOne.title, bookOne.subtitle, new Date(1, 1, 1910), personOne, 1, 1, 1)
let periodicalTwo = new Periodical(bookTwo.title, bookTwo.subtitle, new Date(1, 2, 1920), personOne, 2, 2, 2)
let periodicalTree = new Periodical(bookTree.title, bookTree.subtitle, new Date(1, 3, 1920), personOne, 3, 3, 3);

console.log(personOne)
console.log(persontwo)
console.log(persontree)

console.log(bookOne)
console.log(bookTwo)
console.log(bookTree)

console.log(periodicalOne)
console.log(periodicalTwo)
console.log(periodicalTree)


