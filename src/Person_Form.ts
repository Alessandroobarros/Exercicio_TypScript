//importando as classes.
import Gender from "./entities/Gender.js"
import Person from "./entities/Person.js"
import { capitalize, trimAll, slugify } from "./Functions.js"

//Obtendo valores dos campos
const nome = document.querySelector<HTMLInputElement>('#name')!
const nascimento = document.querySelector<HTMLInputElement>('#birth')!
const sexo = document.querySelector<HTMLSelectElement>('#sexo')!
const resposta = document.querySelector<HTMLDivElement>('#resposta')!
const formulario = document.querySelector<HTMLFormElement>('#form1')!

const nomeFiltro = document.querySelector<HTMLInputElement>('#filter')!
const formulario2 = document.querySelector<HTMLFormElement>('#form2')!


const persons: Person[] = []

showPersons()


// formulario2.addEventListener('submit', (e: Event) =>{
//     e.preventDefault()

//      let newFilter = []
//     // for(const names of persons){
//     //     if (Person.name.toLowerCase().includes(nomeFiltro.value.toLowerCase())){
//     //         newFilter.push(names)
//     //     }
//     // }
//     let filtro  = (Object: Person) => Object.name === nomeFiltro.value

//     newFilter = persons.filter(filtro)
//     console.log(newFilter)

//     let table = document.querySelector('table')

//     if (!table) {
//         table = document.createElement('table')
//         document.body.append(table)
//     }

//     let lines = ''

//     for (const person of newFilter) {

//         lines += `
//         <tr>
//             <td>${person.name}</td>
//         </tr>
//         `
//     }
// table.innerHTML = `
// <thead>
//     <tr>
//         <th>Nome</th>
//     </tr>
// </thead>
// <tbody>
//     ${lines}
// </tbody>
// `
// })

//Formulario que executa no clique ou no enter.
formulario.addEventListener('submit', (e: Event) => {
    e.preventDefault()

    let valorNome = nome.value.trim()

    //Varificando se o campo não esta vazio
    if (!valorNome) {
        resposta.innerText = 'O campo nome é obrigatório'
        resposta.className = 'negative'
        nome.focus()
        return
    }

    const regexNome = /\w+\s\w+/g

    //validação do nome e sobrenome
    if (!regexNome.test(valorNome)) {
        resposta.innerText = 'Informe seu nome completo !'
        resposta.className = 'negative'
        nome.focus()
        return
    }

    //Varificando se o campo não esta vazio
    if (!nascimento.value) {
        resposta.innerText = 'O campo nascimento é obrigatório'
        resposta.className = 'negative'
        nascimento.focus()
        return
    }

    //formatação da data
    const dataNascimento = new Date(`${nascimento.value}T00:00:00`)

    //Validando se a data esta no passado
    if (Date.now() - +dataNascimento <= 0) {
        resposta.innerText = 'O nascimento devera ter ocorrido no passado'
        resposta.className = 'negative'
        nascimento.focus()
        return
    }

    //Varificando se o campo não esta vazio
    if (!sexo.value) {
        resposta.innerText = `Por favor informe o sexo !`
        resposta.className = `negative`
        sexo.focus()
        return
    }

    try {
        let person = new Person(slugify(capitalize(trimAll(nome.value))), dataNascimento, sexo.value === "f" ? Gender.Female : Gender.Male)

        persons.push(person)

        //Necessidade de serealização
        localStorage.setItem('Persons', JSON.stringify(persons))

        resposta.innerText = 'Cadastro Realizado com sucesso!!'
        resposta.className = 'positive'

        showPersons()

    } catch (error: any) {
        console.error(error)
        resposta.innerText = "Opa, tivemos um problema. :("
    }

})

function showPersons() {

    let table = document.querySelector('table')

    if (!table) {
        table = document.createElement('table')
        document.body.append(table)
    }

    let lines = ''
    const sortPersons = (a: { name: string, birth: Date, gender: Gender },
        b: { name: string, birth: Date, gender: Gender }) => a.name.localeCompare(b.name)

    let newArray = [...persons].sort(sortPersons)
    console.log(newArray)


    for (const person of newArray) {

        lines += `
        <tr>
            <td>${person.name}</td>
            <td>(${person.birth}</td>
            <td>${person.gender}</td>
        </tr>
        `
    }

    table.innerHTML = `
    <thead>
        <tr>
            <th>Nome</th>
            <th>Data Nascimento</th>
            <th>Sexo</th>
        </tr>
    </thead>
    <tbody>
        ${lines}
    </tbody>
    `

}

formulario2.addEventListener('submit', (e: Event) =>{
    e.preventDefault()
    
    let filtro  = (Object: Person) => Object.name.toLowerCase() == nomeFiltro.value.toLowerCase()

    let newFilter = persons.filter(filtro)
    console.log(newFilter)

    let table = document.querySelector('table')

    if (!table) {
        table = document.createElement('table')
        document.body.append(table)
    }

    let lines = ''

    for (const person of newFilter) {

        lines += `
        <tr>
            <td>${person.name}</td>
        </tr>
        `
    }
table.innerHTML = `
<thead>
    <tr>
        <th>Nome</th>
    </tr>
</thead>
<tbody>
    ${lines}
</tbody>
`
})
