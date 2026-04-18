document.getElementById('botao').addEventListener('click', cadastrar)

const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0]

function cadastrar(evento){
    evento.preventDefault()
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const linha = tabela.insertRow() // <tr></tr>
    // const celula = linha.insertCell()
    linha.innerHTML = `
        <td> ${nome} </td>
        <td> ${email} </td>
        <td> ${senha} </td>
        <button id='excluir' onclick=excluir(this)> Excluir </button>
        <button id='editar' onclick=editar(this)> Editar </button>  
    `
}

function excluir(elemento){
    elemento.parentElement.remove()
}

function editar(elemento){
    const linha = elemento.parentElement
    const celulas = linha.querySelectorAll('td')
    // celulas.forEach(cel => {
    //     cel.innerText
    // })
    document.getElementById('nome').value = celulas[0].innerText
}

document.getElementById('tel').addEventListener('keydown', (evento) => {
    if(evento.key === 'enter'){
        cadastrar()
    }
})