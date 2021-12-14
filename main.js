'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')
const openModal2 = () => document.getElementById('modal2')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const closeModal2 = () => document.getElementById('modal2')
    .classList.remove('active')

    // --------------------------------------
const tempClient ={
    nome: "Evandro",
    email:"evandro@gmail.com",
    celular:"94998986666",
    cidadde:"Redenção"
}
// CRUD CREAT

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem('db_client',JSON.stringify(dbClient))


const deleteClient = (index) =>{
    const dbClient = readClient()
    dbClient.splice(index,1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const creatClient = (client) =>{
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}


// Interação com o layout
const nomeClient = document.getElementById('nome')
const emailClient = document.getElementById('email')
const telefoneClient = document.getElementById('telefone')
const cidadeClient = document.getElementById('cidade')

const nomeClient2 = document.getElementById('nome2')
const emailClient2 = document.getElementById('email2')
const telefoneClient2 = document.getElementById('telefone2')
const cidadeClient2 = document.getElementById('cidade2')



const isValidFilds = () => {
    

    if(nomeClient.value !='' || emailClient.value !='' || telefoneClient.value !='' || cidadeClient.value !='' ){
        return true
    }
}

const saveClient = () => {
    if(isValidFilds()){
        const novoClient ={
            nome: nomeClient.value,
            email:emailClient.value,
            celular:telefoneClient.value,
            cidade:cidadeClient.value
        }
        
        creatClient(novoClient)
        emailClient.value = ''
        nomeClient.value = ''
        telefoneClient.value = ''
        cidadeClient.value = ''
        closeModal()
        location.reload()
    }else {
        alert('Você deixou algum campo Vazio!')
    }
}


const carregarClient = () =>{
    //buscando dados do banco
    const banco = readClient()
    for (var i=0;i<banco.length;i++) {
        
        // Criando elementos da tela
        const tr = document.createElement('tr')
        const id = document.createAttribute('id')
        const newTr = document.querySelector('#tbody').appendChild(tr)
        tr.id = 'tr'+i

        const tdNome = document.createElement('td')
        const newTdNome = document.querySelector('#tr'+i).appendChild(tdNome)
        tdNome.textContent = banco[i].nome

        const tdEmail = document.createElement('td')
        const newTdemail = document.querySelector('#tr'+i).appendChild(tdEmail)
        tdEmail.textContent = banco[i].email

        const tdTelefone = document.createElement('td')
        const newTdTelefone = document.querySelector('#tr'+i).appendChild(tdTelefone)
        tdTelefone.textContent = banco[i].celular

        const tdCidade = document.createElement('td')
        const newTdCidade = document.querySelector('#tr'+i).appendChild(tdCidade)
        tdCidade.textContent = banco[i].cidade

        
        



        // ------- botões --------
        
        const tdButton = document.createElement('td')
        const newBtn = document.querySelector('#tr'+i).appendChild(tdButton)
        
        tdButton.id = 'tdButtom'+i

        const btnEditar = document.createElement('button')
        const newBtnButtomEditar = document.querySelector('#tdButtom'+i).appendChild(btnEditar)
  
        btnEditar.id= 'editar'+i
        btnEditar.textContent = 'editar'
        btnEditar.classList.add('button') 
        btnEditar.classList.add('green')
        const dataEditar = document.querySelector('#editar'+i)
        dataEditar.setAttribute('data-id',i)
        dataEditar.setAttribute('onclick','editar('+i+')')
        
        const btnExcluir = document.createElement('button')
        const newBtnButtomExcluir = document.querySelector('#tdButtom'+i).appendChild(btnExcluir)
        btnExcluir.id = 'excluir'+i
        btnExcluir.textContent = 'excluir'
        btnExcluir.classList.add('button')
        btnExcluir.classList.add('red')
        const dataExcluir = document.querySelector('#excluir'+i)
        dataExcluir.setAttribute('data-id',i)
        dataExcluir.setAttribute('onclick','ApagarCliente('+i+')')

    }
    
}

const editar = (index) =>{
    openModal2()
    const banco = readClient()
    const btnSelect = document.querySelector('#editar'+index)
    const id = btnSelect.dataset.id
    nomeClient2.value = banco[id].nome
    emailClient2.value = banco[id].email
    telefoneClient2.value = banco[id].celular
    cidadeClient2.value = banco[id].cidade

    const client ={
        nome: nomeClient2.value,
        email:emailClient2.value,
        celular:telefoneClient2.value,
        cidade:cidadeClient2.value
    }

    const id_oculto = document.querySelector('#id_oculto')
    id_oculto.setAttribute('data-id',index)
    //document.getElementById('#editar').addEventListener('click',updateClient(id,client))
}

const atualizar =() =>{
    const id_oculto = document.querySelector('#id_oculto')
    const index = id_oculto.dataset.id
    
    const client ={
        nome: nomeClient2.value,
        email:emailClient2.value,
        celular:telefoneClient2.value,
        cidade:cidadeClient2.value
    }
    updateClient(index,client)
    closeModal2()
    location.reload()
}

const ApagarCliente = (index) =>{
    
    const ind = index
    if(confirm('Deseja Realmente Apagar esse Cliente?')){
        deleteClient(ind)
        location.reload()
    }
}

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('modalClose2')
    .addEventListener('click', closeModal2)

document.getElementById('salvar')
    .addEventListener('click',saveClient)

document.getElementById('cancelar')
    .addEventListener('click',closeModal)

document.getElementById('cancelar2')
    .addEventListener('click',closeModal2)

document.getElementById('editar')
    .addEventListener('click',atualizar)

window.addEventListener('load',carregarClient)