//importando as classes.
import Gender from "./Gender.js"
import Person from "./Person.js"

//Obtendo valores dos campos
const nome = document.querySelector<HTMLInputElement>('#name')!
const nascimento = document.querySelector<HTMLInputElement>('#birth')!
const sexo = document.querySelector<HTMLSelectElement>('#sexo')!
const resposta = document.querySelector<HTMLDivElement>('#resposta')!
const formulario = document.querySelector<HTMLFormElement>('form')!

const persons : Person[] = []

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

    resposta.innerText = 'Cadastro Realizado com sucesso!!'
    resposta.className = 'positive'

    try {
        let person = new Person(nome.value, dataNascimento, sexo.value === "f" ? Gender.Female :Gender.Male)

        persons.push(person)

        //Necessidade de serealização
        localStorage.setItem('Persons', JSON.stringify(persons))

    } catch (error: any) {
        console.error(error)
        resposta.innerText = "Opa, tivemos um problema. :("       
    }
})
