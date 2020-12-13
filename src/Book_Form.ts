import Book from "./entities/Book.js"
import Document from "./entities/Document.js"
import Person from "./entities/Person.js"
import {capitalize, slugify, trimAll} from "./Functions.js"
import Gender from "./entities/Gender.js"


const tipo = document.querySelector<HTMLSelectElement>('#tipo')!
const formulario = document.querySelector<HTMLFormElement>('form')!
const titleD = document.querySelector<HTMLInputElement>('#titleDocument')!
const subTituloD = document.querySelector<HTMLInputElement>('#subtitleDocument')!
const publicD = document.querySelector<HTMLInputElement>('#publicDocument')!
const author = document.querySelector<HTMLSelectElement>('#author')!
const titleB = document.querySelector<HTMLInputElement>('#titleBook')!
const subTituloB = document.querySelector<HTMLInputElement>('#subtitleBook')!
const publicB = document.querySelector<HTMLInputElement>('#publicBook')!
const isbn = document.querySelector<HTMLInputElement>('#isbnBook')!
const editionB = document.querySelector<HTMLInputElement>('#editionBook')!
const volumB = document.querySelector<HTMLInputElement>('#volumeBook')!
const divDocument = document.querySelector<HTMLDivElement>('#documents')!
const divBook = document.querySelector<HTMLDivElement>('#books')!
const resposta = document.querySelector<HTMLDivElement>('#resposta')!

const documentsInstance: Document[] = []
const booksInstance: Book[] = []


function limpar() {
    resposta.innerText = ''
    showBooks()

}

tipo.addEventListener('change', (e: Event) => {
    e.preventDefault()
    limpar()
    tipo.focus()
    
    if (tipo.value == 'l') {
        divBook.hidden = false
        divDocument.hidden = true
        author.hidden = false

    } else if (tipo.value == 'p') {
        divDocument.hidden = false
        divBook.hidden = true
        author.hidden = false
        
    } else {
        divDocument.hidden = true
        divBook.hidden = true
        author.hidden = true
        limpar()
    }
})

formulario.addEventListener('submit', (e2: Event) => {
    e2.preventDefault()

    if (tipo.value == 'l') {
        let valorTitleB = titleB.value.trim()
        if (!valorTitleB) {
            resposta.innerText = 'O campo titulo é obrigatório'
            resposta.className = 'negative'
            titleB.focus()
            return
        }

        if (!subTituloB.value) {
            resposta.innerText = 'Nessario informar o subtitulo'
            resposta.className = 'negative'
            subTituloB.focus()
            return
        }

        if (!publicB.value) {
            resposta.innerText = 'Por favor, informe a data de publicação'
            resposta.className = 'negative'
            publicB.focus()
            return
        }

        if (!isbn.value) {
            resposta.innerText = 'Numero de registro obrigatório'
            resposta.className = 'negative'
            isbn.focus()
            return
        }

        if (!editionB.value) {
            resposta.innerText = 'Informe a edição do livro'
            resposta.className = 'negative'
            editionB.focus()
            return
        }

        if (!volumB.value) {
            resposta.innerText = 'Qual o volume do livro ?'
            resposta.className = 'negative'
            volumB.focus()
            return
        }

        if (!author.value) {
            resposta.innerText = 'Selecione o Autor'
            resposta.className = 'negative'
            author.focus()
            return
        }

        try {
            const person = persons[parseInt(author.value, 10)]
            let book = new Book(slugify(capitalize(trimAll(titleB.value))), slugify(capitalize(trimAll(subTituloB.value))), publicB.valueAsDate!, person, isbn.valueAsNumber, editionB.valueAsNumber, volumB.valueAsNumber)

            booksInstance.push(book)

            localStorage.setItem('Book', JSON.stringify(booksInstance))

            showBooks()

        } catch (error: any) {
            console.error(error)
            resposta.innerText = "Opa, tivemos um problema. :("
        }        


    } else {

        if (!titleD.value) {
            resposta.innerText = 'Informe o titulo do documento !'
            resposta.className = 'negative'
            titleD.focus()
            return
        }

        if (!subTituloD.value) {
            resposta.innerText = 'O Sub-titulo deve ser informado'
            resposta.className = 'negative'
            subTituloD.focus()
            return
        }

        if (!publicD.value) {
            resposta.innerText = 'Informe o ano de publicação do Documento'
            resposta.className = 'negative'
            publicD.focus()
            return
        }

        if (!author.value) {
            resposta.innerText = 'Selecione o Autor'
            resposta.className = 'negative'
            author.focus()
            return
        }

        try {
            const person = persons[parseInt(author.value, 10)]
            let periodic = new Document(capitalize(trimAll(titleD.value)), capitalize(trimAll(subTituloD.value)), publicD.valueAsDate!, person)

            documentsInstance.push(periodic)

            localStorage.setItem('Document', JSON.stringify(documentsInstance))

            showDocuments()

        } catch (error: any) {
            console.error(error)
            resposta.innerText = "Opa, tivemos um problema. :("
        }
    }

    resposta.innerText = 'Cadastro realizado com sucesso !!'
    resposta.className = 'positive'
})

let persons: Array<Person> = JSON.parse(localStorage.getItem('Persons')!)


const sortAutores = (a:{name: string, birth: Date, gender: Gender}, b:{name: string, birth: Date, gender: Gender}) => a.name.localeCompare(b.name)

    let newArray1 = persons.sort(sortAutores)
    let i = 0

for (const person of newArray1){
    const option = document.createElement('option')
    option.value = i.toString()
    option.innerText = person.name
    author.append(option)
    i++
}


function showBooks() {
    
    let table = document.querySelector('table')

    if (!table) {
        table = document.createElement('table')
        document.body.append(table)
    }

    let lines = ''
    const sortBooks = (a:Book, b:Book) => a.title.localeCompare(b.title)

    let newArray2 = [...booksInstance].sort(sortBooks)
    console.log(`Array original: ${booksInstance}`)
    console.log(`Array ordenado R${newArray2}`)
 
    for (const books of newArray2){
        lines += `
        <tr>
            <td>${ books.title }</td>
            <td>${ books.subtitle }</td>
            <td>${ books.publishedAt }</td>
            <td>${ books.author.name }</td>
            <td>${ books.edition }</td>
            <td>${ books.volume }</td>
        </tr>
        `
    }

    table.innerHTML = `
    <thead>
        <tr>
            <th>Titulo</th>
            <th>SubTitulo</th>
            <th>Ano_publicação</th>
            <th>Autor</th>
            <th>Edição</th>
            <th>Volume</th>
        </tr>
    </thead>
    <tbody>
        ${lines}
    </tbody>
    `
}


function showDocuments() {
    
    let table2 = document.querySelector('table')

    if (!table2) {
        table2 = document.createElement('table')
        document.body.append(table2)
    }

    let lines2 = ''
    const sortDocuments = (a:Document, b:Document) => a.title.localeCompare(b.title)

    let newArray3 = [...documentsInstance].sort(sortDocuments)
    console.log(`Array original: ${documentsInstance}`)
    console.log(`Array ordenado R${newArray3}`)
 
    for (const docs of newArray3){
        lines2 += `
        <tr>
            <td>${ docs.title }</td>
            <td>${ docs.subtitle }</td>
            <td>${ docs.publishedAt }</td>
            <td>${ docs.author.name }</td>
        </tr>
        `
    }

    table2.innerHTML = `
    <thead>
        <tr>
            <th>Titulo</th>
            <th>SubTitulo</th>
            <th>Ano_publicação</th>
            <th>Autor</th>
        </tr>
    </thead>
    <tbody>
        ${lines2}
    </tbody>
    `
}