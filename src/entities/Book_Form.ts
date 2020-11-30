import Book from "./Book.js"
import Document from "./Document.js"
import Person from "./Person.js"

const tipo = document.querySelector<HTMLSelectElement>('#tipo')!
const formulario = document.querySelector<HTMLFormElement>('form')!
const titleD = document.querySelector<HTMLInputElement>('#titleDocument')!
const subTituloD = document.querySelector<HTMLInputElement>('#subtitleDocument')!
const publicD = document.querySelector<HTMLInputElement>('#publicDocument')!
const authorD = document.querySelector<HTMLInputElement>('#authorDocument')!
const titleB = document.querySelector<HTMLInputElement>('#titleBook')!
const subTituloB = document.querySelector<HTMLInputElement>('#subtitleBook')!
const publicB = document.querySelector<HTMLDataElement>('#publicBook')!
const authorB = document.querySelector<HTMLInputElement>('#authorBook')!
const isbn = document.querySelector<HTMLInputElement>('#isbnBook')!
const editionB = document.querySelector<HTMLInputElement>('#editionBook')!
const volumB = document.querySelector<HTMLInputElement>('#volumeBook')!
const labelDocument = document.querySelector<HTMLLabelElement>('#documents')!
const labelBook = document.querySelector<HTMLLabelElement>('#books')!
const resposta = document.querySelector<HTMLDivElement>('#resposta')!

const documentsInstance: Document[] = []
const booksInstance: Book[] = []


function limpar() {
    resposta.innerText = ''
}

tipo.addEventListener('change', (e: Event) => {
    e.preventDefault()
    limpar()
    tipo.focus()

    if (tipo.value == 'l') {
        labelBook.hidden = false
        labelDocument.hidden = true
        // pullNames()

    } else if (tipo.value == 'p') {
        labelDocument.hidden = false
        labelBook.hidden = true
        // pullNames()
    } else {
        labelDocument.hidden = true
        labelBook.hidden = true
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

        if (!authorB.value) {
            resposta.innerText = 'Informe o nome do Autor'
            resposta.className = 'negative'
            authorB.focus()
            return
        }

        const regexAuthorB = /\w+\s\w+/g
        if (!regexAuthorB.test(authorB.value)) {
            resposta.innerText = 'Informe seu nome completo !'
            resposta.className = 'negative'
            authorB.focus()
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

        try {
            let book = new Book(titleB.value, subTituloB.value, publicB.value, authorB.value, isbn.value, editionB.value, volumB.value)

            booksInstance.push(book)

            localStorage.setItem('Book', JSON.stringify(booksInstance))

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

        if (!authorD.value) {
            resposta.innerText = 'Por gentileza informar o nome do autor ?'
            resposta.className = 'negative'
            authorD.focus()
            return
        }

        try {
            let periodic = new Document(titleD.value, subTituloD.value, publicD.value, authorD.value)

            documentsInstance.push(periodic)

            localStorage.setItem('Document', JSON.stringify(documentsInstance))

        } catch (error: any) {
            console.error(error)
            resposta.innerText = "Opa, tivemos um problema. :("
        }
    }

    resposta.innerText = 'Cadastro realizado com sucesso !!'
    resposta.className = 'positive'
})

// let personLocalStorage: Array<Person> = JSON.parse(localStorage.getItem('Persons')!)
// let name = personLocalStorage.map (p => p.name)

// function pullNames() {
//     for (let i = 0; i < name.length;i++) {
//         authorD.add(new Option(name[i].toString(), i.toString()))
//     }
//    return authorD
// }